'use client';

import { useState, useEffect } from 'react';
import HeroSlider from '@/components/HeroSlider';
import SectionTitle from '@/components/SectionTitle';
import ServicesCarousel from '@/components/ServicesCarousel';
import ProjectCard from '@/components/ProjectCard';
import UniqueProjectsCarousel from '@/components/UniqueProjectsCarousel';
import SimpleTestimonialsCarousel from '@/components/SimpleTestimonialsCarousel';
import Button from '@/components/Button';
import { useSetting } from '@/hooks/useSiteSettings';
import { apiClient } from '@/utils/admin/apiClient';
import {
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  // Dynamic content from settings
  const companyName = useSetting('company_name', 'Forever Shine Engineering');
  const companyTagline = useSetting('company_tagline', 'Building Tomorrow Today');
  const companyDescription = useSetting('company_description', 'Professional engineering consultancy and construction services');

  // Dynamic statistics from settings
  const propertiesValued = useSetting('stats_properties_valued', '100');
  const bankingPartners = useSetting('stats_banking_partners', '3');

  // State for testimonials
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiClient.getPublicTestimonials({ 
          limit: 10  // Fetch ALL testimonials, not just featured
        });
        
        if (response.success) {
          setTestimonials(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setTestimonialsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Fallback testimonials if none are found
  const fallbackTestimonials = [
    {
      id: 'fallback-1',
      clientName: 'John Smith',
      position: 'CEO',
      company: 'Smith Enterprises',
      content: 'Forever Shine Engineering delivered our office complex project on time and within budget. Their attention to detail and professional approach exceeded our expectations.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      status: 'ACTIVE' as const,
      featured: true,
      createdAt: '',
      updatedAt: '',
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <>
      <HeroSlider />

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-red/10 text-brand-red font-semibold text-xs sm:text-sm rounded-full">
                  ABOUT {companyName.toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {companyTagline}{' '}
                  <span className="text-brand-blue">Property Valuation</span>{' '}
                  & Engineering Consultancy
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {companyDescription || `${companyName} specializes in professional property valuation services 
                  for banking institutions across Nepal. We provide comprehensive engineering consultancy, 
                  site supervision, and running bill verification services to major banks and financial institutions.`}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-brand-blue rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      Banking Sector Expertise
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Nepal's leading property valuation firm trusted by major banks and financial institutions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-brand-red rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      Professional Certification
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Professional engineers delivering accurate assessments for critical lending decisions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button href="/about" variant="primary" className="w-full sm:w-auto">
                  Learn More About Us
                </Button>
                <Button href="/services" variant="outline" className="w-full sm:w-auto">
                  Our Services
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Construction Site Supervision - Forever Shine Engineering"
                  className="w-full h-auto object-cover"
                  width={800}
                  height={600}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 border">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-brand-red">{propertiesValued}+</div>
                    <div className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">Properties Valued</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-brand-blue">{bankingPartners}+</div>
                    <div className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">Banking Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Our Services"
            subtitle="We offer a comprehensive range of engineering and construction services."
            center={true}
          />

          <ServicesCarousel 
            showNavigation={true}
            showPagination={true}
            autoplay={true}
            limit={6}
            className="mt-8 sm:mt-12"
          />
        </div>
      </section>

      {/* Banking Partners Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Banking Partners"
            subtitle="Trusted by leading financial institutions"
            center={true}
          />
          
          <div className="mt-8 sm:mt-12">
            {/* Logo Carousel */}
            <div className="relative max-w-6xl mx-auto">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50 shadow-xl p-6 sm:p-8 md:p-12">
                <div className="flex items-center justify-center space-x-8 sm:space-x-12 md:space-x-16 animate-carousel">
                  {/* First set of logos */}
                  <div className="flex items-center justify-center space-x-8 sm:space-x-12 md:space-x-16 min-w-full">
                    <a 
                      href="https://everestbankltd.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src="/images/banks/everest-bank.svg"
                        alt="Everest Bank Limited"
                        width={220}
                        height={220}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md"
                      />
                    </a>
                    
                    <a 
                      href="https://jbbl.com.np/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src="/images/banks/jyoti-bikas-bank.png"
                        alt="Jyoti Bikas Bank Limited"
                        width={220}
                        height={220}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md"
                      />
                    </a>
                    
                    <a 
                      href="https://www.nefscun.org.np/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src="/images/banks/nefscun.jpg"
                        alt="Nepal Federation of Savings and Credit Cooperative Unions Ltd."
                        width={220}
                        height={220}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md"
                      />
                    </a>
                  </div>
                  
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center justify-center space-x-8 sm:space-x-12 md:space-x-16 min-w-full">
                    <a 
                      href="https://everestbankltd.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src="/images/banks/everest-bank.svg"
                        alt="Everest Bank Limited"
                        width={220}
                        height={220}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md"
                      />
                    </a>
                    
                    <a 
                      href="https://jbbl.com.np/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src="/images/banks/jyoti-bikas-bank.png"
                        alt="Jyoti Bikas Bank Limited"
                        width={220}
                        height={220}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md"
                      />
                    </a>
                    
                    <a 
                      href="https://www.nefscun.org.np/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src="/images/banks/nefscun.jpg"
                        alt="Nepal Federation of Savings and Credit Cooperative Unions Ltd."
                        width={220}
                        height={220}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md"
                      />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Subtle gradient overlays for fade effect */}
              <div className="absolute top-0 left-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Our Projects"
            subtitle="Explore our portfolio of successful projects."
            center={true}
          />

          <UniqueProjectsCarousel
            limit={8}
            showFilters={true}
            className="mt-6 sm:mt-8"
          />
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionTitle
            title="Client Testimonials"
            subtitle="What our clients say about our services."
            center={true}
          />

          <div className="max-w-7xl mx-auto mt-8 sm:mt-12">
            {testimonialsLoading ? (
              <div className="flex justify-center items-center py-12 sm:py-16">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : displayTestimonials.length > 0 ? (
              <SimpleTestimonialsCarousel
                testimonials={displayTestimonials}
              />
            ) : (
              <div className="text-center py-12 sm:py-16">
                <p className="text-gray-500 text-base sm:text-lg">No testimonials available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}