import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  position,
  company,
  testimonial,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover-lift">
      <div className="flex items-center mb-6">
        <Image 
          src={image} 
          alt={name} 
          width={64} 
          height={64} 
          className="rounded-full object-cover mr-4 transition-transform duration-500 hover:scale-105"
        />
        <div>
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
          <p className="text-gray-600">{position}, {company}</p>
        </div>
      </div>
      <div className="relative">
        <svg className="absolute top-0 left-0 w-10 h-10 text-blue-100 -mt-6 -ml-4 transition-all duration-300 opacity-70" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 11.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zM22 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 11.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"></path>
        </svg>
        <p className="text-gray-600 italic pl-6">{testimonial}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;