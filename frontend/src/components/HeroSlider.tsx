'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  textAlign: string;
  textColor: string;
  overlayOpacity: number;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to construct proper image URLs
  const getImageUrl = (imageUrl: string): string => {
    // If it's already a full URL (external or absolute), return as-is
    if (imageUrl.startsWith('http') || imageUrl.startsWith('//')) {
      return imageUrl;
    }
    
    // If it's a relative path from backend uploads
    if (imageUrl.startsWith('/uploads/') || imageUrl.startsWith('uploads/')) {
      const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
      return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${cleanPath}`;
    }
    
    // If it's just a filename, assume it's in uploads
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${imageUrl}`;
  };

  // Fetch dynamic slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        console.log('Fetching hero slides...');
        
        const response = await fetch('/api/hero-slides/', {
          cache: 'no-store' // Ensure fresh data
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Hero slides response:', data);
          
          const activeSlides = data.data || [];
          console.log('Active slides count:', activeSlides.length);
          
          if (activeSlides.length > 0) {
            console.log('Setting dynamic slides:', activeSlides);
            setSlides(activeSlides);
          } else {
            console.log('No active slides found, using default slides');
            // Fallback to default slides if no active slides found
            setSlides(getDefaultSlides());
          }
        } else {
          console.error('Failed to fetch hero slides, using default slides');
          setSlides(getDefaultSlides());
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error);
        setSlides(getDefaultSlides());
        setError('Failed to load hero slides');
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Track slide view
  useEffect(() => {
    if (slides.length > 0 && slides[currentSlide]?.id) {
      // Track view for analytics
      fetch(`/api/hero-slides/${slides[currentSlide].id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(err => console.error('Error tracking view:', err));
    }
  }, [currentSlide, slides]);

  // Default fallback slides
  const getDefaultSlides = (): Slide[] => [
    {
      id: 'default-1',
      title: 'Forever Shine',
      subtitle: 'Engineering',
      description: 'Professional engineering consultancy and construction services for residential and commercial projects across Nepal',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      imageAlt: 'Forever Shine Engineering',
      primaryButtonText: 'Our Services',
      primaryButtonUrl: '/services',
      secondaryButtonText: 'Get a Quote',
      secondaryButtonUrl: '/contact',
      textAlign: 'left',
      textColor: '#ffffff',
      overlayOpacity: 0.4
    },
    {
      id: 'default-2',
      title: 'Property Valuation',
      subtitle: 'Services',
      description: 'Expert valuation services for institutional lenders including running bill verification and comprehensive site supervision',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      imageAlt: 'Property Valuation Services',
      primaryButtonText: 'Our Services',
      primaryButtonUrl: '/services',
      secondaryButtonText: 'Get a Quote',
      secondaryButtonUrl: '/contact',
      textAlign: 'left',
      textColor: '#ffffff',
      overlayOpacity: 0.4
    },
    {
      id: 'default-3',
      title: 'Construction',
      subtitle: 'Excellence',
      description: 'From municipality drawings to 3D interior design, we deliver comprehensive engineering solutions with precision',
      imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150ad6fbbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      imageAlt: 'Construction Excellence',
      primaryButtonText: 'Our Services',
      primaryButtonUrl: '/services',
      secondaryButtonText: 'Get a Quote',
      secondaryButtonUrl: '/contact',
      textAlign: 'left',
      textColor: '#ffffff',
      overlayOpacity: 0.4
    }
  ];

  // Handle button click tracking
  const handleButtonClick = async (slideId: string, url: string) => {
    try {
      // Track click for analytics
      if (slideId && slideId !== 'default-1' && slideId !== 'default-2' && slideId !== 'default-3') {
        await fetch(`/api/hero-slides/${slideId}/track-click`, {
          method: 'POST'
        });
      }
    } catch (error) {
      console.error('Error tracking click:', error);
    }
    
    // Navigate to URL
    if (url.startsWith('/')) {
      window.location.href = url;
    } else if (url.startsWith('http')) {
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Forever Shine Engineering</h1>
          <p className="text-xl mb-8">Professional engineering consultancy and construction services</p>
          <div className="flex space-x-4 justify-center">
            <Button href="/services" variant="primary">Our Services</Button>
            <Button href="/contact" variant="outline">Get a Quote</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(slide.imageUrl)}
              alt={slide.imageAlt || slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized={true}
              onError={(e) => {
                console.error('Failed to load slide image:', slide.imageUrl, 'processed:', getImageUrl(slide.imageUrl));
              }}
              onLoad={() => {
                console.log('Successfully loaded slide image:', slide.imageUrl);
              }}
            />
            <div 
              className="absolute inset-0 bg-black"
              style={{ opacity: slide.overlayOpacity }}
            ></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
            <div className="flex items-center h-full pt-16 sm:pt-20">
              <div 
                className={`max-w-4xl w-full ${
                  slide.textAlign === 'center' ? 'mx-auto text-center' :
                  slide.textAlign === 'right' ? 'ml-auto text-right' :
                  'text-left'
                }`}
                style={{ color: slide.textColor }}
              >
                <h1 className="pt-4 sm:pt-6 pb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in">
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <h2 className="inline-block mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl text-brand-blue animate-fade-in delay-200">
                    {slide.subtitle}
                  </h2>
                )}
                <p className="hidden sm:block max-w-full sm:max-w-2xl pb-8 sm:pb-12 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed animate-fade-in delay-300">
                  {slide.description}
                </p>
                <div className="hidden sm:flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in delay-500">
                  {slide.primaryButtonText && slide.primaryButtonUrl && (
                    <Button 
                      href={slide.primaryButtonUrl}
                      variant="primary"
                      className="w-full sm:w-auto"
                      onClick={() => handleButtonClick(slide.id, slide.primaryButtonUrl!)}
                    >
                      {slide.primaryButtonText}
                    </Button>
                  )}
                  {slide.secondaryButtonText && slide.secondaryButtonUrl && (
                    <Button 
                      href={slide.secondaryButtonUrl}
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => handleButtonClick(slide.id, slide.secondaryButtonUrl!)}
                    >
                      {slide.secondaryButtonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-brand-blue w-6 sm:w-8'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      {/* Error Message (if any) */}
      {error && (
        <div className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm z-20">
          {error}
        </div>
      )}
    </div>
  );
}