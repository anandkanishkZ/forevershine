'use client';

import React, { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import Button from '@/components/Button';
import Image from 'next/image';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  interface Project {
    id: number;
    title: string;
    category: string;
    location: string;
    year: string;
    client: string;
    description: string;
    challenge: string;
    solution: string;
    result: string;
    image: string;
    gallery: string[];
  }

  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern Office Complex',
      category: 'Commercial',
      location: 'Downtown Business District',
      year: '2023',
      client: 'TechCorp International',
      description:
        'A state-of-the-art office complex featuring sustainable design elements and modern amenities.',
      challenge:
        'The client needed a modern office space that would accommodate their growing team while reflecting their innovative company culture. The site had limited space and required careful planning to maximize usable area.',
      solution:
        'We designed a multi-story complex with flexible workspaces, collaborative areas, and cutting-edge technology integration. Sustainable features included solar panels, rainwater harvesting, and energy-efficient systems.',
      result:
        'The completed project provided 30% more usable space than conventional designs, reduced energy consumption by 40%, and created an inspiring work environment that has improved employee satisfaction and productivity.',
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 2,
      title: 'Luxury Residential Tower',
      category: 'Residential',
      location: 'Waterfront District',
      year: '2022',
      client: 'Elite Properties',
      description:
        'High-end residential tower with premium finishes and panoramic city views.',
      challenge:
        'The client wanted to create a luxury residential tower that would stand out in the competitive real estate market while maximizing the value of a prime waterfront location.',
      solution:
        'We designed a 30-story tower with a distinctive architectural profile, featuring floor-to-ceiling windows, private balconies, and premium amenities including a rooftop pool, fitness center, and concierge services.',
      result:
        'The project sold out 80% of units before construction completion, commanding premium prices 15% above market average. The building has become an iconic addition to the city skyline.',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 3,
      title: 'Shopping Mall Renovation',
      category: 'Commercial',
      location: 'Suburban Retail District',
      year: '2022',
      client: 'Metro Retail Group',
      description:
        'Complete renovation and modernization of an existing shopping mall.',
      challenge:
        'The client needed to revitalize an aging shopping mall that was losing tenants and customers to newer retail developments in the area.',
      solution:
        'We redesigned the mall with a modern aesthetic, improved circulation, enhanced natural lighting, and created new public spaces. The renovation included updated storefronts, a food court redesign, and integration of digital technology.',
      result:
        'Following renovation, the mall saw a 60% increase in foot traffic, attracted premium retail tenants, and achieved 95% occupancy within six months of reopening.',
      image:
        'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1567449303078-57ad995bd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 4,
      title: 'Sustainable Community Housing',
      category: 'Residential',
      location: 'Green Valley',
      year: '2021',
      client: 'EcoLiving Developments',
      description:
        'Eco-friendly residential community with energy-efficient homes and shared green spaces.',
      challenge:
        'The client wanted to create an affordable yet sustainable housing community that would minimize environmental impact while fostering a sense of community among residents.',
      solution:
        'We designed a master-planned community with energy-efficient homes, shared green spaces, community gardens, and renewable energy systems. The design incorporated passive solar principles, rainwater harvesting, and sustainable building materials.',
      result:
        'The community has reduced energy consumption by 50% compared to conventional developments, won multiple sustainability awards, and created a thriving neighborhood with strong community engagement.',
      image:
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 5,
      title: 'Medical Research Facility',
      category: 'Institutional',
      location: 'University District',
      year: '2021',
      client: 'National Health Institute',
      description:
        'State-of-the-art medical research facility with specialized laboratories and collaborative spaces.',
      challenge:
        'The client required a cutting-edge research facility that would accommodate specialized equipment, ensure biosafety protocols, and foster collaboration among researchers.',
      solution:
        'We designed a purpose-built facility with modular laboratories, controlled environments, and integrated technology systems. The design included collaborative spaces, conference facilities, and flexible research areas that could adapt to changing requirements.',
      result:
        'The facility has enabled breakthrough research in multiple medical fields, attracted top scientific talent, and secured additional research funding due to its advanced capabilities.',
      image:
        'https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1581093458791-9d09c85a31ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581093804721-9722fb3b1610?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 6,
      title: 'Industrial Manufacturing Plant',
      category: 'Industrial',
      location: 'Industrial Park',
      year: '2020',
      client: 'Global Manufacturing Inc.',
      description:
        'Modern manufacturing facility designed for efficiency, safety, and future expansion.',
      challenge:
        'The client needed a manufacturing facility that would optimize production workflows, ensure worker safety, and allow for future expansion as the business grew.',
      solution:
        'We designed a facility with efficient production lines, automated systems, and careful consideration of material flow. The design incorporated safety features, ergonomic workstations, and flexible spaces that could be reconfigured as needed.',
      result:
        'The new facility increased production capacity by 35%, reduced workplace incidents by 60%, and provided a platform for business growth that has already accommodated two major expansions.',
      image:
        'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 7,
      title: 'Hyatt Place Kathmandu - Professional Property Valuation',
      category: 'Valuation',
      location: 'Red Cross Marg, Soltimod, Kathmandu',
      year: '2025',
      client: 'Nepal Investment Mega Bank Limited',
      description:
        'Comprehensive valuation assessment of Hyatt Place Kathmandu, a prestigious five-star hotel and apartment complex, providing institutional-grade property evaluation for banking purposes.',
      challenge:
        'The client required a specialized valuation of a high-end hospitality and residential complex in Kathmandu\'s prime location. The property\'s dual-use nature (hotel and apartments) demanded expertise in both hospitality sector valuations and residential market analysis, with consideration of international hotel brand standards and local market conditions.',
      solution:
        'Our certified valuation team conducted extensive on-site assessment including detailed evaluation of hotel operational areas, guest facilities, apartment units, revenue generation potential, and comprehensive market analysis. We employed multiple valuation approaches including income capitalization, sales comparison, and replacement cost methods to ensure accuracy.',
      result:
        'Successfully delivered a comprehensive valuation report that enabled Nepal Investment Mega Bank to make informed lending decisions. The report met international banking standards and provided detailed market insights, supporting the bank\'s risk assessment for this significant hospitality sector investment.',
      image:
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 8,
      title: 'Good Karma Residences - Multi-Phase Construction Supervision',
      category: 'Supervision',
      location: 'Chakrapath, Maharajgunj, behind Qatar Visa Center (QVC)',
      year: '2025',
      client: 'Nepal Investment Mega Bank Limited / Good Karma Group of Companies',
      description:
        'Ongoing comprehensive construction supervision and running bill verification for Good Karma Residences, a premium residential development project requiring systematic monitoring through multiple construction phases.',
      challenge:
        'This high-value residential project required continuous monitoring through multiple construction phases with rigorous quality control standards. The bank needed assurance that each payment release corresponded to actual progress meeting approved specifications, while the developer required efficient verification processes to maintain construction timeline.',
      solution:
        'Established systematic verification protocol covering multiple running bill phases (10th, 14th, and 17th bills completed). Our team conducted detailed on-site inspections, quality assessments, material usage verification, safety compliance checks, and progress evaluation against approved architectural and structural plans. Each phase included photographic documentation and detailed reporting.',
      result:
        'Successfully completed multiple verification phases ensuring construction quality, timeline adherence, and investment protection. Our systematic approach enabled smooth payment releases while maintaining strict quality standards, resulting in continued confidence from the lending institution and efficient project progression for the developer.',
      image:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581092335878-40cb95fb1145?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 9,
      title: 'Hotel Forest Inn - Five-Star Hotel Construction Verification',
      category: 'Supervision',
      location: 'Budhanilkantha Height, Kathmandu',
      year: '2025',
      client: 'Nabil Bank Limited / Hotel Forest Inn Pvt Ltd',
      description:
        'Specialized running bill verification for Hotel Forest Inn, a luxury five-star hotel under construction, focusing on civil and interior work compliance with international hospitality standards.',
      challenge:
        'This prestigious five-star hotel project required expertise in luxury hospitality construction standards, including specialized knowledge of hotel operational requirements, guest experience infrastructure, and international safety protocols. The verification needed to ensure that all civil and interior work met five-star hotel specifications while protecting the bank\'s significant investment.',
      solution:
        'Conducted comprehensive 17th running bill verification covering structural integrity, luxury interior finishing standards, MEP (Mechanical, Electrical, Plumbing) systems installation, fire safety compliance, guest room specifications, public area standards, and hospitality-specific infrastructure. Our team evaluated work quality against international five-star hotel benchmarks and local building codes.',
      result:
        'Successfully verified construction progress meeting five-star hotel standards, ensuring Nabil Bank\'s investment protection while maintaining project quality and timeline. The detailed verification enabled continued financing confidence and supported the developer in achieving luxury hospitality specifications throughout the construction process.',
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 10,
      title: 'Federal Parliament Secretariat - Post-Delivery Technical Inspection',
      category: 'Inspection',
      location: 'Singha Durbar, Kathmandu, Nepal',
      year: '2025',
      client: 'Federal Parliament Secretariat (संघीय संसद सचिवालय)',
      description:
        'Prestigious post-delivery technical inspection assignment for furniture and furnishings supplied to Nepal\'s Federal Parliament Secretariat, Department of Internal Service and Plan Management Administration.',
      challenge:
        'This high-profile government project required meticulous attention to detail and strict adherence to government procurement standards. The inspection needed to verify that all delivered furniture and furnishings met the exacting standards expected for Nepal\'s Federal Parliament, while ensuring compliance with government specifications and quality requirements for this national institution.',
      solution:
        'Conducted comprehensive post-delivery technical inspection covering detailed quality verification of all furniture items, installation standards assessment, finish quality evaluation, functional testing of all components, compliance verification with government procurement specifications, and preparation of detailed documentation including defect identification and corrective action recommendations.',
      result:
        'Successfully completed thorough technical inspection and delivered comprehensive report ensuring all furniture and furnishings meet Federal Parliament standards. This prestigious assignment demonstrates our trusted position with Nepal\'s most important government institutions and our capability in handling high-profile national projects requiring the highest levels of professionalism and quality assurance.',
      image:
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 11,
      title: 'Cityscape Housing Lalitpur - Apartment Valuation Project',
      category: 'Valuation',
      location: 'Hattiwan, Lalitpur',
      year: '2025',
      client: 'Nepal Investment Mega Bank Ltd.',
      description:
        'Comprehensive apartment valuation assessment for Cityscape Housing development in Lalitpur, providing detailed property evaluation for institutional lending purposes.',
      challenge:
        'The client required accurate market valuation of residential apartments in a developing area of Lalitpur. The challenge involved assessing current market conditions, construction quality, location advantages, and future development potential while ensuring the valuation met banking standards for loan processing and risk assessment.',
      solution:
        'Our experienced valuation team conducted thorough on-site assessment including structural integrity evaluation, construction quality analysis, location and accessibility factors review, comparative market analysis with similar properties in Lalitpur, and assessment of future development potential. We employed multiple valuation methodologies to ensure accuracy and reliability.',
      result:
        'Delivered comprehensive valuation report enabling Nepal Investment Mega Bank to make informed lending decisions. The report provided detailed market insights, risk assessment, and accurate property values that supported the bank\'s loan processing while ensuring fair value determination for all stakeholders in the transaction.',
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      id: 12,
      title: 'Everest Bank - Hotel & Land Development Valuation',
      category: 'Valuation',
      location: 'A.P. Durbar Banquet, Janakpur',
      year: '2025',
      client: 'Everest Bank Limited',
      description:
        'Professional valuation assessment of under-construction hotel building with associated land for Everest Bank Limited, providing comprehensive property evaluation for development financing.',
      challenge:
        'This project involved valuing a complex development including both under-construction hotel infrastructure and valuable land assets. The challenge required expertise in hospitality sector valuations, construction-in-progress assessment, land valuation in developing areas, and consideration of completion risks and market potential for hotel operations.',
      solution:
        'Conducted detailed valuation covering land assessment, construction progress evaluation, hotel development potential analysis, market comparison for similar hospitality projects, and risk assessment for completion and operational viability. Our approach included both current value assessment and projected completion value analysis.',
      result:
        'Provided Everest Bank with comprehensive valuation report supporting their development financing decisions. The detailed assessment enabled informed lending decisions while properly evaluating both current asset value and future potential, ensuring appropriate risk management for this significant hospitality sector investment.',
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      position: 'CEO',
      company: 'TechCorp International',
      testimonial:
        'Forever Shine Engineering delivered our office complex project on time and within budget. Their attention to detail and professional approach exceeded our expectations. The innovative design has transformed our work environment and impressed both employees and clients.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Sarah Johnson',
      position: 'Development Director',
      company: 'Elite Properties',
      testimonial:
        "Working with Forever Shine on our luxury residential tower was a seamless experience. Their team's expertise in municipality drawings saved us valuable time in the approval process, and their innovative design approach resulted in a building that stands out in the market.",
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Michael Chen',
      position: 'Operations Manager',
      company: 'Global Manufacturing Inc.',
      testimonial:
        'The industrial facility designed by Forever Shine has transformed our manufacturing operations. Their understanding of our workflow requirements and attention to safety details has created a more efficient and productive environment for our team.',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
  ];

  const categories = [
    'all',
    'Commercial',
    'Residential',
    'Industrial',
    'Institutional',
    'Valuation',
    'Supervision',
    'Inspection',
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-blue-700">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Construction Projects"
            className="w-full h-full object-cover"
            width={2000}
            height={1200}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore our portfolio of successful projects that showcase our
              expertise and commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Project Portfolio"
            subtitle="Browse our diverse range of projects across various sectors"
            center={true}
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                category={project.category}
                image={project.image}
                description={project.description}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="h-80 overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  width={1200}
                  height={800}
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <span className="text-blue-700 font-medium">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl font-bold mt-1 mb-4 text-gray-900">
                {selectedProject.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">
                    Location
                  </h4>
                  <p className="text-gray-900">{selectedProject.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Year</h4>
                  <p className="text-gray-900">{selectedProject.year}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">
                    Client
                  </h4>
                  <p className="text-gray-900">{selectedProject.client}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Project Overview
                </h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Challenge
                </h3>
                <p className="text-gray-600">{selectedProject.challenge}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Solution
                </h3>
                <p className="text-gray-600">{selectedProject.solution}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Result</h3>
                <p className="text-gray-600">{selectedProject.result}</p>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Project Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedProject.gallery.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${selectedProject.title} - Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                    width={1200}
                    height={800}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Client Testimonials"
            subtitle="What our clients say about our projects"
            center={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                position={testimonial.position}
                company={testimonial.company}
                testimonial={testimonial.testimonial}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how we can bring your vision to life
            with our expertise in engineering and construction.
          </p>
          <Button href="/contact" variant="secondary" className="mx-auto">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;