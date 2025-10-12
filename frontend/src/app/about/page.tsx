'use client';

import React from 'react';
import {
  CheckCircle,
  Award,
  Users,
  Briefcase,
  Target,
  Lightbulb,
  Heart,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import Image from 'next/image';

const About = () => {
  const teamMembers = [
    {
      name: 'Robert Johnson',
      position: 'CEO & Founder',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'With over 20 years of experience in engineering and construction, Robert leads our company with vision and expertise.',
    },
    {
      name: 'Emily Chen',
      position: 'Chief Architect',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Emily specializes in sustainable architectural design and has led numerous award-winning projects.',
    },
    {
      name: 'Michael Rodriguez',
      position: 'Civil Engineering Director',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Michael brings extensive expertise in civil engineering with a focus on structural integrity and safety.',
    },
    {
      name: 'Sarah Williams',
      position: 'Interior Design Lead',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Sarah&apos;s innovative approach to interior design has transformed countless spaces into functional works of art.',
    },
  ];

  const milestones = [
    {
      year: '2008',
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
      <section className="relative py-32 bg-blue-700">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Engineering Blueprint"
            className="w-full h-full object-cover"
            width={2000}
            height={1333}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Forever Shine Engineering
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              We are a team of dedicated professionals committed to excellence in engineering and construction services.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Our Story"
                subtitle="From humble beginnings to industry leadership"
              />
              <p className="text-gray-600 mb-6">
                Founded in 2008, Forever Shine Engineering Consultancy and Construction Pvt. Ltd. began as a small team of passionate engineers with a vision to transform the construction industry through innovation, quality, and client-focused service.
              </p>
              <p className="text-gray-600 mb-6">
                Over the years, we have grown into a full-service engineering and construction company, expanding our expertise and service offerings to meet the evolving needs of our clients. Our journey has been marked by a steadfast commitment to excellence, integrity, and sustainable practices.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we are proud to be recognized as a leader in the industry, known for our technical expertise, innovative solutions, and exceptional project delivery. Our portfolio includes a diverse range of successful projects, from residential developments to commercial complexes and industrial facilities.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center">
                  <CheckCircle className="text-blue-700 h-5 w-5 mr-2" />
                  <span className="text-gray-700 font-medium">
                    15+ Years Experience
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-blue-700 h-5 w-5 mr-2" />
                  <span className="text-gray-700 font-medium">
                    250+ Projects Completed
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-blue-700 h-5 w-5 mr-2" />
                  <span className="text-gray-700 font-medium">
                    30+ Expert Team Members
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                className="rounded-lg shadow-xl w-full h-auto"
                width={800}
                height={533}
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-4xl font-bold mb-2">250+</div>
                <div>Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Mission, Vision & Values"
            subtitle="The principles that guide our work and define our company culture"
            center={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600">
                To deliver exceptional engineering and construction services that exceed client expectations, while maintaining the highest standards of quality, safety, and sustainability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-6">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading engineering and construction company known for innovation, excellence, and transformative projects that positively impact communities and the built environment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Values</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Excellence in everything we do</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Integrity and ethical conduct</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Innovation and continuous improvement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-700 h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                  <span>Client satisfaction and partnership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
//       