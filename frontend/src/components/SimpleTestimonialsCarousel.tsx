'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, User } from 'lucide-react';
import { Testimonial } from '@/types/admin';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Component for individual testimonial card
  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
    };

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 mx-2 h-full testimonial-card">
        {/* Rating */}
        <div className="flex items-center mb-4">
          {renderStars(testimonial.rating)}
        </div>

        {/* Content */}
        <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-4">
          "{testimonial.content}"
        </p>

        {/* Client Info */}
        <div className="flex items-center">
          {testimonial.imageUrl ? (
            <img
              src={testimonial.imageUrl}
              alt={testimonial.clientName}
              className="w-12 h-12 rounded-full object-cover mr-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          {/* Fallback avatar */}
          <div className={`w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 ${testimonial.imageUrl ? 'hidden' : ''}`}>
            <User className="w-6 h-6 text-blue-600" />
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              {testimonial.clientName}
            </h4>
            <p className="text-gray-600 text-xs">
              {testimonial.position}
              {testimonial.company && (
                <span className="block text-blue-600">{testimonial.company}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Handle single testimonial case
  if (testimonials.length === 1) {
    return (
      <div className="max-w-2xl mx-auto">
        <TestimonialCard testimonial={testimonials[0]} />
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={testimonials.length > 2}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: '.testimonial-next',
          prevEl: '.testimonial-prev',
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: testimonials.length >= 2 ? 2 : 1,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: testimonials.length >= 3 ? 3 : testimonials.length,
            spaceBetween: 30,
          },
        }}
        className="!pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Simple Navigation Arrows */}
      {testimonials.length > 1 && (
        <>
          <button className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 -ml-5">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 -mr-5">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}