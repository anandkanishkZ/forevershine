'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Ruler, Building2, Calculator, MapPin, Home, HardHat, CheckCircle, Loader2 } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

// Icon mapping for backward compatibility with existing hardcoded services
const getIconComponent = (iconName: string | undefined) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    ruler: Ruler,
    building: Building2,
    calculator: Calculator,
    map: MapPin,
    home: Home,
    hardhat: HardHat,
  };
  
  const IconComponent = iconName ? iconMap[iconName.toLowerCase()] || Building2 : Building2;
  return <IconComponent className="w-12 h-12" />;
};

// Skeleton loading component for service cards
const SkeletonServiceCard = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
    {/* Icon Skeleton */}
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mb-4 sm:mb-6 animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
    </div>
    
    {/* Title Skeleton */}
    <div className="mb-3 sm:mb-4 space-y-2">
      <div className="h-6 sm:h-7 bg-gray-200 rounded animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
      <div className="h-6 sm:h-7 w-2/3 bg-gray-200 rounded animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
    </div>
    
    {/* Description Skeleton */}
    <div className="mb-4 sm:mb-6 space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
      <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
    </div>
    
    {/* Features List Skeleton */}
    <div className="space-y-2 sm:space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start">
          <div className="h-4 w-4 sm:h-5 sm:w-5 bg-gray-200 rounded-full mt-0.5 sm:mt-1 mr-2 flex-shrink-0 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
          </div>
          <div className="flex-1">
            <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse relative overflow-hidden" style={{ width: `${70 + (i * 5)}%` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback services data in case backend fails
  const fallbackServices = [
    {
      id: 'fallback-1',
      title: 'Municipality Drawing & Design',
      description: 'Professional architectural drawings and designs that comply with local municipality regulations and standards.',
      icon: 'ruler',
      features: [
        'Building permit drawings',
        'Construction documentation',
        'Regulatory compliance',
        'Architectural plans',
        'Structural designs',
        'MEP drawings'
      ],
      status: 'ACTIVE' as const
    },
    {
      id: 'fallback-2',
      title: '3D Interior Design',
      description: 'Stunning 3D visualizations of interior spaces to help you envision your dream home or office before construction.',
      icon: 'building',
      features: [
        'Space planning',
        'Material selection',
        'Furniture layout',
        'Lighting design',
        'Color schemes'
      ],
      status: 'ACTIVE' as const
    },
    {
      id: 'fallback-3',
      title: 'Estimation & Costing',
      description: 'Accurate cost estimations for construction projects to help you plan your budget effectively.',
      icon: 'calculator',
      features: [
        'Detailed cost breakdowns',
        'Material quantity takeoffs',
        'Labor cost estimation',
        'Equipment cost analysis',
        'Budget planning',
        'Value engineering'
      ],
      status: 'ACTIVE' as const
    },
    {
      id: 'fallback-4',
      title: 'Civil Surveying',
      description: 'Comprehensive land surveying services to determine property boundaries and topographic features.',
      icon: 'map',
      features: [
        'Boundary surveys',
        'Topographic surveys',
        'Construction staking',
        'ALTA/NSPS surveys',
        'GPS surveying',
        'As-built surveys'
      ],
      status: 'ACTIVE' as const
    },
    {
      id: 'fallback-5',
      title: 'Property Valuation',
      description: 'Professional property valuation services for banking institutions, including residential, commercial, and hospitality sector assessments.',
      icon: 'home',
      features: [
        'Bank-grade property valuations',
        'Luxury hotel and apartment assessments',
        'Commercial property appraisals',
        'Construction progress valuations',
        'Investment grade property analysis',
        'Comprehensive valuation reports for institutional lending'
      ],
      status: 'ACTIVE' as const
    },
    {
      id: 'fallback-6',
      title: 'Site Supervision & Running Bill Verification',
      description: 'Comprehensive construction monitoring, quality control, and running bill verification services for banking institutions.',
      icon: 'hardhat',
      features: [
        'Running bill verification for institutional lenders',
        'Construction progress monitoring',
        'Quality control and compliance assessment',
        'Material usage verification',
        'Safety protocol adherence monitoring',
        'Post-delivery technical inspections'
      ],
      status: 'ACTIVE' as const
    }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from backend API
      const response = await fetch('http://localhost:5000/api/services?status=ACTIVE');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setServices(data.data);
          return;
        }
      }
      
      // Fallback to hardcoded services if backend fails or returns no data
      console.warn('Backend API unavailable, using fallback services');
      setServices(fallbackServices);
      
    } catch (error) {
      console.error('Failed to fetch services from backend:', error);
      setError('Failed to load services');
      setServices(fallbackServices);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-blue-700">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=80" 
            alt="Engineering Services" 
            className="w-full h-full object-cover"
            width={2000}
            height={1200}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Our Services</h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
              Comprehensive engineering and construction services tailored to meet your project needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle 
            title="What We Offer" 
            subtitle="Explore our comprehensive range of engineering and construction services"
            center={true}
          />
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonServiceCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
              <button 
                onClick={fetchServices}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-4 sm:mb-6">
                    {getIconComponent(service.icon)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{service.description}</p>
                  <div className="space-y-2 sm:space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-14 md:py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Your Project?</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Contact us today to discuss your project requirements and discover how our services can bring your vision to life.
          </p>
          <Button href="/contact" variant="secondary" className="mx-auto">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}