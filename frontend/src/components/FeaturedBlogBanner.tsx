import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Star, ArrowRight } from 'lucide-react';
import { getValidImageUrl } from '@/utils/media';
import { BlogPost } from '@/utils/blogApiClient';

interface FeaturedBlogBannerProps {
  post: BlogPost;
}

const FeaturedBlogBanner: React.FC<FeaturedBlogBannerProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const excerpt = post.excerpt || post.content.substring(0, 200) + '...';

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 mb-12">
      {/* Featured Badge */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-brand-red text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-semibold">Featured Post</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-80 lg:h-96">
          {post.imageUrl ? (
            <Image
              src={getValidImageUrl(post.imageUrl)}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">📰</div>
                <p>No image available</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-brand-blue" />
                <span>{post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-brand-blue" />
                <span>Admin</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <div className="text-gray-700 text-lg leading-relaxed">
              {excerpt}
            </div>

            {/* Read More Button */}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center space-x-2 bg-brand-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <span>Read Full Article</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogBanner;