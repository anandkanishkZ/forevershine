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
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
      <Link href={`/blog/${slug}`}>
        <div className="overflow-hidden">
          {image ? (
            <Image 
              src={getValidImageUrl(image)} 
              alt={title} 
              width={560} 
              height={224} 
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
          ) : (
            <div className="w-full h-56 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-sm font-medium">Blog Post</p>
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors duration-300 group"
        >
          Read More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;