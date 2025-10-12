'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';

export default function BlogListing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-blue-700 mt-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Blog"
            className="w-full h-full object-cover"
            width={2000}
            height={800}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-blue-100 mb-8">
              Insights, updates, and expert perspectives from our engineering team
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    width={500}
                    height={200}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-4">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}