'use client';

import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/api';
import {
  CheckCircle,
  Award,
  Users,
  Briefcase,
  Target,
  Lightbulb,
  Heart,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import Image from 'next/image';
import publicApiClient, { TeamMember } from '@/utils/publicApiClient';
import { useSetting } from '@/hooks/useSiteSettings';

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic statistics from settings
  const yearsExperience = useSetting('stats_years_experience', '15');
  const projectsCompleted = useSetting('stats_projects_completed', '100');
  const teamMembersCount = useSetting('stats_team_members', '50');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await publicApiClient.getTeamMembers();
      if (response.success && response.data) {
        setTeamMembers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description:
        'Forever Shine Engineering was established with a vision to provide exceptional engineering and construction services.',
    },
    {
      year: '2012',
      title: 'Expansion of Services',
      description:
        'Added interior design and property valuation to our service offerings to provide more comprehensive solutions.',
    },
    {
      year: '2015',
      title: 'First Major Project',
      description:
        'Completed our first major commercial project, a 20-story office building in the heart of the city.',
    },
    {
      year: '2018',
      title: 'Industry Recognition',
      description:
        'Received the prestigious Engineering Excellence Award for our innovative approach to sustainable construction.',
    },
    {
      year: '2020',
      title: 'International Expansion',
      description:
        'Expanded operations to international markets, taking on projects in neighboring countries.',
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description:
        'Implemented cutting-edge digital technologies to enhance our design and project management capabilities.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-blue-700">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Engineering Blueprint"
            className="w-full h-full object-cover"
            width={2000}
            height={1333}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              About Forever Shine Engineering
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
              We are a team of dedicated professionals committed to excellence in engineering and construction services.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <SectionTitle
                title="Our Story"
                subtitle="From humble beginnings to industry leadership"
              />
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Founded in 2079 BS, Forever Shine Engineering Consultancy and Construction Pvt. Ltd. began as a small team of passionate engineers with a vision to transform the construction industry through innovation, quality, and client-focused service.
              </p>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Over the years, we have grown into a full-service engineering and construction company, expanding our expertise and service offerings to meet the evolving needs of our clients. Our journey has been marked by a steadfast commitment to excellence, integrity, and sustainable practices.
              </p>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Today, we are proud to be recognized as a leader in the industry, known for our technical expertise, innovative solutions, and exceptional project delivery. Our portfolio includes a diverse range of successful projects, from residential developments to commercial complexes and industrial facilities.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="flex items-center">
                  <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    {yearsExperience}+ Years Experience
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    {projectsCompleted}+ Projects Completed
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    {teamMembersCount}+ Expert Team Members
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <Image
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                className="rounded-lg shadow-xl w-full h-auto"
                width={800}
                height={533}
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-yellow-500 text-white p-4 sm:p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-3xl sm:text-4xl font-bold mb-2">{projectsCompleted}+</div>
                <div className="text-sm sm:text-base">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Mission, Vision & Values"
            subtitle="The principles that guide our work and define our company culture"
            center={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-4 sm:mb-6">
                <Target size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                To deliver exceptional engineering and construction services that exceed client expectations, while maintaining the highest standards of quality, safety, and sustainability.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-4 sm:mb-6">
                <Lightbulb size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                To be the leading engineering and construction company known for innovation, excellence, and transformative projects that positively impact communities and the built environment.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-4 sm:mb-6">
                <Heart size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Our Values</h3>
              <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Excellence in everything we do</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Integrity and ethical conduct</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Innovation and continuous improvement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Client satisfaction and partnership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Banking Partners Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Banking Partners"
            subtitle="Trusted by leading financial institutions"
            center={true}
          />
          
          <div className="mt-8 sm:mt-12">
            {/* Logo Carousel */}
            <div className="relative max-w-6xl mx-auto">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-xl p-6 sm:p-8 md:p-12">
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

      {/* Meet Our Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Meet Our Team"
            subtitle="The passionate professionals behind our success"
            center={true}
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="relative h-48 sm:h-64 bg-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  
                  {/* Content Skeleton */}
                  <div className="p-4 sm:p-6">
                    {/* Name Skeleton */}
                    <div className="h-5 sm:h-6 bg-gray-200 rounded-md mb-2 animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                    
                    {/* Position Skeleton */}
                    <div className="h-4 bg-gray-200 rounded-md mb-3 sm:mb-4 w-3/4 animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                    
                    {/* Bio Skeleton */}
                    <div className="space-y-2 mb-3 sm:mb-4">
                      <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    </div>
                    
                    {/* Icons Skeleton */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
                  {member.imageUrl && (
                    <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-lg">
                      <Image
                        src={API_CONFIG.getImageUrl(member.imageUrl)}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{member.position}</p>
                    
                    {member.bio && (
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Send Email"
                          >
                            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                        )}
                        
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Call Phone"
                          >
                            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                        )}
                      </div>
                      
                      {/* Social Media Links */}
                      <SocialMediaLinks
                        linkedin={member.linkedin}
                        facebook={member.facebook}
                        twitter={member.twitter}
                        instagram={member.instagram}
                        tiktok={member.tiktok}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">No team members found. Add team members from the admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
//       