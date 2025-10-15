import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import BlogApiClient, { BlogPost } from '@/utils/blogApiClient';
import SocialShareButtons from '@/components/SocialShareButtons';
import RichTextContent from '@/components/RichTextContent';
import { getValidImageUrl } from '@/utils/media';

interface BlogPostPageProps {
  params: { slug: string };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // During build time, return null to prevent errors
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_RUNTIME) {
    return null;
  }

  try {
    const blogApi = new BlogApiClient();
    const response = await blogApi.getPostBySlug(slug);
    
    if (response.success) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Forever Engineering',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.seoTitle || `${post.title} - Forever Engineering`,
    description: post.seoDescription || post.excerpt || BlogApiClient.getExcerpt(post.content),
    keywords: 'engineering, construction, blog, insights, projects',
    openGraph: {
      title: post.title,
      description: post.excerpt || BlogApiClient.getExcerpt(post.content),
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.imageUrl ? [getValidImageUrl(post.imageUrl)] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || BlogApiClient.getExcerpt(post.content),
      images: post.imageUrl ? [getValidImageUrl(post.imageUrl)] : undefined,
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  
  const getAuthorInitials = (name?: string, email?: string) => {
    if (name) {
      const names = name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    return email ? email.substring(0, 2).toUpperCase() : 'FS';
  };

  const getAuthorName = () => {
    return post.author.name || post.author.email.split('@')[0];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Breadcrumb */}
          <div className="py-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Link>
          </div>

          {/* Article Header */}
          <article className="pb-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta Information and Share */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-4 sm:mb-0">
                {/* Author with Avatar */}
                <div className="flex items-center gap-2">
                  {post.author.profilePhoto ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm">
                      <Image 
                        src={getValidImageUrl(post.author.profilePhoto)} 
                        alt={getAuthorName()}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold border-2 border-blue-100 shadow-sm">
                      {getAuthorInitials(post.author.name, post.author.email)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{getAuthorName()}</span>
                    <span className="text-xs text-gray-500">Author</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">{BlogApiClient.formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">{readingTime} min read</span>
                </div>
              </div>
              
              {/* Share Buttons */}
              <SocialShareButtons title={post.title} />
            </div>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="mb-12">
                <Image 
                  src={getValidImageUrl(post.imageUrl)} 
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  width={1200}
                  height={600}
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <RichTextContent content={post.content} />
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                {/* Author Info with Avatar */}
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center gap-3">
                    {post.author.profilePhoto ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm">
                        <Image 
                          src={getValidImageUrl(post.author.profilePhoto)} 
                          alt={getAuthorName()}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold border-2 border-blue-100 shadow-sm">
                        {getAuthorInitials(post.author.name, post.author.email)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600">Written by</p>
                      <p className="font-semibold text-gray-900">{getAuthorName()}</p>
                    </div>
                  </div>
                </div>
                
                {/* Share Buttons */}
                <div className="flex items-center">
                  <SocialShareButtons title={post.title} />
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles CTA */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Explore More Engineering Insights
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover more articles about engineering excellence, project innovations, and industry insights from our team.
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              View All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';