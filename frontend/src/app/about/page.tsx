'use client';

import React, { useState, useEffect } from 'react';
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

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

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

      {/* Meet Our Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Meet Our Team"
            subtitle="The passionate professionals behind our success"
            center={true}
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg shadow animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
                  {member.imageUrl && (
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <Image
                        src={member.imageUrl.startsWith('http') ? member.imageUrl : `http://localhost:5000/api/media/serve/${member.imageUrl}`}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                    
                    {member.bio && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Send Email"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Call Phone"
                          >
                            <Phone className="h-4 w-4" />
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
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No team members found. Add team members from the admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
//       