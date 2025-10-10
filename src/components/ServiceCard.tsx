'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
}) => {
  const cardRef = useScrollReveal();

  return (
    <div 
      ref={cardRef}
      className="scale-up card p-8 hover-lift group"
    >
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-8 group-hover:bg-blue-700 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className={`text-xl md:text-2xl font-bold mb-4 text-gray-900 transition-all duration-300 group-hover:text-blue-700`}>
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <Link
        href={link}
        className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-all duration-300 group"
      >
        Learn More
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
      </Link>
    </div>
  );
};

export default ServiceCard;