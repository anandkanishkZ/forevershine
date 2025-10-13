import React from 'react';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { getValidImageUrl } from '@/utils/media';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  image,
  date,
  author,
  slug,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="group bg-white rounded-2xl shadow-soft hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative overflow-hidden h-48">
          {image ? (
            <Image 
              src={getValidImageUrl(image)} 
              alt={title} 
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-sm">Engineering Article</p>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-brand-blue" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-brand-blue" />
            <span>{author}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`} className="block mb-4">
          <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200 line-clamp-2 leading-tight">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Read More Link */}
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-brand-blue hover:text-blue-600 font-semibold transition-colors duration-200 group/link"
        >
          <span className="mr-2">Read More</span>
          <div className="flex items-center justify-center w-6 h-6 transition-transform duration-200 group-hover/link:translate-x-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Bottom Border Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </article>
  );
};

export default BlogCard;