'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Forever Shine',
    subtitle: 'Engineering',
    description: 'Professional engineering consultancy and construction services for residential and commercial projects across Nepal',
  },
  {
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Property Valuation',
    subtitle: 'Services',
    description: 'Expert valuation services for institutional lenders including running bill verification and comprehensive site supervision',
  },
  {
    image: 'https://images.unsplash.com/photo-1464822759844-d150ad6fbbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Construction',
    subtitle: 'Excellence',
    description: 'From municipality drawings to 3D interior design, we deliver comprehensive engineering solutions with precision',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="container mx-auto px-4 h-full relative z-10">
            <div className="flex items-center h-full pt-20">
              <div className="max-w-4xl text-white">
                <h1 className="pt-6 pb-2 text-3xl font-bold md:text-5xl leading-tight animate-fade-in">
                  {slide.title}
                </h1>
                <h2 className="inline-block mb-4 text-4xl md:text-5xl text-brand-blue animate-fade-in delay-200">
                  {slide.subtitle}
                </h2>
                <p className="max-w-2xl pb-12 text-md md:text-lg text-gray-200 leading-relaxed animate-fade-in delay-300">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in delay-500">
                  <Button href="/services" variant="primary">
                    Our Services
                  </Button>
                  <Button href="/contact" variant="outline">
                    Get a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-brand-blue w-6'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}