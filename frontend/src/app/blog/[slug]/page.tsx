import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] mt-16 animate-fade-in">
        <div className="absolute inset-0">
          <Image 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
            width={1000}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-200">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12 animate-slide-up">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-700 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-line leading-relaxed text-gray-700">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
}