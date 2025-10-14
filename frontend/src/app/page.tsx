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
  MapPin,
  CheckCircle,
  Phone,
  Mail,
} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  // Dynamic content from settings
  const companyName = useSetting('company_name', 'Forever Shine Engineering');
  const companyAddress = useSetting('company_address', 'Birta Chowk, Rautahat, Madhesh Province');
  const companyPhone = useSetting('company_phone', '+977 9805996059 / +977 9861053405');
  const companyEmail = useSetting('company_email', 'info@forevershine.com');
  const companyTagline = useSetting('company_tagline', 'Building Tomorrow Today');
  const companyDescription = useSetting('company_description', 'Professional engineering consultancy and construction services');

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
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red font-semibold text-sm rounded-full">
                  ABOUT {companyName.toUpperCase()}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {companyTagline}{' '}
                  <span className="text-brand-blue">Property Valuation</span>{' '}
                  & Engineering Consultancy
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {companyDescription || `${companyName} specializes in professional property valuation services 
                  for banking institutions across Nepal. We provide comprehensive engineering consultancy, 
                  site supervision, and running bill verification services to major banks and financial institutions.`}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Banking Sector Expertise
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Specialized valuation services for Nepal Investment Mega Bank, Nabil Bank, and other leading institutions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-red rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Professional Certification
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Certified engineers providing accurate property assessments and construction monitoring
                    </p>
                  </div>
                </div>


              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button href="/about" variant="primary" className="flex-shrink-0">
                  Learn More About Us
                </Button>
                <Button href="/services" variant="outline" className="flex-shrink-0">
                  Our Services
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
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
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-brand-red">50+</div>
                    <div className="text-xs text-gray-600">Properties Valued</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-blue">15+</div>
                    <div className="text-xs text-gray-600">Banking Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
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
            className="mt-12"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Projects"
            subtitle="Explore our portfolio of successful projects."
            center={true}
          />

          <UniqueProjectsCarousel
            limit={8}
            showFilters={true}
            className="mt-8"
          />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title="Client Testimonials"
            subtitle="What our clients say about our services."
            center={true}
          />

          <div className="max-w-7xl mx-auto mt-12">
            {testimonialsLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : displayTestimonials.length > 0 ? (
              <SimpleTestimonialsCarousel
                testimonials={displayTestimonials}
              />
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No testimonials available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <span className="text-blue-700 font-semibold mb-2 block">
                CONTACT US
              </span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Get In Touch With Our Team
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services or want to discuss your
                project? Contact us today.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Our Location
                    </h4>
                    <p className="text-gray-600">
                      {companyAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Call Us
                    </h4>
                    <p className="text-gray-600">{companyPhone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Email Us
                    </h4>
                    <p className="text-gray-600">{companyEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-gray-50 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}