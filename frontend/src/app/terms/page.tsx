'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Scale, Shield, AlertTriangle, Ban, RefreshCw, DollarSign, Briefcase, UserCheck, Bell, Info, Mail, Phone, MapPin, ChevronRight, CheckCircle, Lock } from 'lucide-react';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('introduction');

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'acceptance',
        'definitions',
        'services',
        'user-obligations',
        'fees-payment',
        'intellectual-property',
        'confidentiality',
        'limitation-liability',
        'termination',
        'modifications',
        'governing-law',
        'contact'
      ];

      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { id: 'introduction', label: 'Introduction', icon: FileText },
    { id: 'acceptance', label: 'Acceptance of Terms', icon: CheckCircle },
    { id: 'definitions', label: 'Definitions', icon: Info },
    { id: 'services', label: 'Our Services', icon: Briefcase },
    { id: 'user-obligations', label: 'User Obligations', icon: UserCheck },
    { id: 'fees-payment', label: 'Fees & Payment', icon: DollarSign },
    { id: 'intellectual-property', label: 'Intellectual Property', icon: Shield },
    { id: 'confidentiality', label: 'Confidentiality', icon: Lock },
    { id: 'limitation-liability', label: 'Limitation of Liability', icon: AlertTriangle },
    { id: 'termination', label: 'Termination', icon: Ban },
    { id: 'modifications', label: 'Modifications', icon: RefreshCw },
    { id: 'governing-law', label: 'Governing Law', icon: Scale },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
          <div className="bg-brand-blue rounded-2xl p-6 sm:p-8 md:p-12 text-white shadow-xl">
            <div className="flex items-center mb-4">
              <Scale className="w-10 h-10 sm:w-12 sm:h-12 mr-4" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-white/90 text-base sm:text-lg mb-4">
              Please read these terms and conditions carefully before using our services. By accessing or using our services, 
              you agree to be bound by these terms.
            </p>
            <p className="text-white/80 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Sticky Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-brand-blue" />
                    Table of Contents
                  </h2>
                  <nav className="space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center group ${
                            activeSection === item.id
                              ? 'bg-brand-blue text-white shadow-md'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-brand-blue'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mr-2.5 flex-shrink-0 ${
                            activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover:text-brand-blue'
                          }`} />
                          <span className="text-sm font-medium flex-1">{item.label}</span>
                          {activeSection === item.id && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200">
                
                {/* Introduction */}
                <section id="introduction" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Introduction</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Welcome to Forever Shine Engineering Consultancy. These Terms of Service ("Terms") govern your access to and use 
                    of our website, services, and products. These Terms constitute a legally binding agreement between you and 
                    Forever Shine Engineering Consultancy.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our services include but are not limited to property valuation, engineering consultancy, site supervision, 
                    construction services, and running bill verification for banking and financial institutions across Nepal.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-brand-blue p-5">
                    <p className="text-sm text-gray-800">
                      <strong>Important Notice:</strong> By accessing our website or engaging our services, you acknowledge that you 
                      have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, please do not 
                      use our services.
                    </p>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Acceptance of Terms */}
                <section id="acceptance" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing or using our services, you represent and warrant that:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">You are at least 18 years of age or have legal authority to enter into binding contracts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">You have the legal capacity to understand and comply with these Terms</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">You will use our services in compliance with all applicable laws and regulations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">All information you provide is accurate, current, and complete</span>
                    </li>
                  </ul>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Definitions */}
                <section id="definitions" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <Info className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Definitions</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    For the purposes of these Terms, the following definitions apply:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-brand-blue pl-4 py-2">
                      <h4 className="font-semibold text-gray-900 mb-1">"Company," "We," "Us," or "Our"</h4>
                      <p className="text-sm text-gray-700">Refers to Forever Shine Engineering Consultancy, located at Birta Chowk, Rautahat, Madhesh Province, Nepal.</p>
                    </div>
                    <div className="border-l-4 border-brand-red pl-4 py-2">
                      <h4 className="font-semibold text-gray-900 mb-1">"Services"</h4>
                      <p className="text-sm text-gray-700">Refers to all professional services provided by the Company, including property valuation, engineering consultancy, site supervision, construction services, and bill verification.</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900 mb-1">"User," "You," or "Your"</h4>
                      <p className="text-sm text-gray-700">Refers to any individual or entity accessing or using our services.</p>
                    </div>
                    <div className="border-l-4 border-gray-400 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900 mb-1">"Client"</h4>
                      <p className="text-sm text-gray-700">Refers to any party who has entered into a service agreement with the Company.</p>
                    </div>
                    <div className="border-l-4 border-gray-600 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900 mb-1">"Website"</h4>
                      <p className="text-sm text-gray-700">Refers to forevershine.com.np and all associated domains and subdomains.</p>
                    </div>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Our Services */}
                <section id="services" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Services</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Service Scope</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Forever Shine Engineering Consultancy provides the following professional services:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2" />
                        Property Valuation
                      </h4>
                      <p className="text-sm text-gray-700">Professional property assessment and valuation services for banking and financial institutions.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2" />
                        Engineering Consultancy
                      </h4>
                      <p className="text-sm text-gray-700">Expert engineering advice and consulting for construction and development projects.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2" />
                        Site Supervision
                      </h4>
                      <p className="text-sm text-gray-700">On-site project monitoring, quality control, and construction supervision services.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2" />
                        Bill Verification
                      </h4>
                      <p className="text-sm text-gray-700">Running bill verification and cost analysis for financial institutions.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Service Limitations</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                    <ul className="space-y-2 text-sm text-gray-800">
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Services are provided based on information supplied by clients and site conditions at the time of inspection</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>We reserve the right to refuse service to any party at our discretion</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Service delivery timelines are estimates and may vary based on project complexity</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* User Obligations */}
                <section id="user-obligations" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <UserCheck className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">User Obligations</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    As a user of our services, you agree to:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white border-l-4 border-brand-blue p-5 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">Provide Accurate Information</h4>
                      <p className="text-sm text-gray-700">Supply complete, accurate, and truthful information required for service delivery. Any misrepresentation may result in service termination.</p>
                    </div>
                    <div className="bg-white border-l-4 border-brand-red p-5 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">Timely Communication</h4>
                      <p className="text-sm text-gray-700">Respond promptly to our requests for information, site access, or documentation necessary for project completion.</p>
                    </div>
                    <div className="bg-white border-l-4 border-yellow-500 p-5 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">Compliance with Laws</h4>
                      <p className="text-sm text-gray-700">Ensure all projects comply with local building codes, regulations, and legal requirements.</p>
                    </div>
                    <div className="bg-white border-l-4 border-gray-400 p-5 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">Payment Obligations</h4>
                      <p className="text-sm text-gray-700">Make timely payments as per agreed terms and conditions for services rendered.</p>
                    </div>
                    <div className="bg-white border-l-4 border-gray-600 p-5 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">Respect Intellectual Property</h4>
                      <p className="text-sm text-gray-700">Not reproduce, distribute, or use our reports, designs, or intellectual property without written permission.</p>
                    </div>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Fees and Payment */}
                <section id="fees-payment" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <DollarSign className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Fees & Payment Terms</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Service Fees</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Service fees are determined based on project scope, complexity, location, and time requirements. All fees will be 
                    clearly outlined in our service agreement or quotation before work commences.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Payment Terms</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <ul className="space-y-3 text-gray-800">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Advance Payment:</strong> A percentage of the total fee may be required as an advance before project initiation</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Milestone Payments:</strong> For larger projects, payments may be structured based on project milestones</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Final Payment:</strong> Balance payment is due upon delivery of final reports or completion of services</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Late Payment:</strong> Overdue payments may incur interest charges as per Nepalese banking norms</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-gray-800">
                      <strong>Important:</strong> Failure to make timely payments may result in suspension of services and withholding of 
                      deliverables until all outstanding amounts are settled.
                    </p>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Intellectual Property */}
                <section id="intellectual-property" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Intellectual Property Rights</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Ownership</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    All intellectual property rights in our reports, designs, methodologies, software, and work products remain the 
                    exclusive property of Forever Shine Engineering Consultancy unless explicitly transferred through a written agreement.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">License to Use</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Upon full payment, clients receive a non-exclusive, non-transferable license to use our deliverables solely for the 
                    intended project purpose. This license does not permit:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                    <li>Reproduction or distribution without written consent</li>
                    <li>Modification or derivative works</li>
                    <li>Commercial exploitation beyond the original project</li>
                    <li>Transfer to third parties without our approval</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Website Content</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All content on our website, including text, graphics, logos, images, and software, is protected by copyright and 
                    trademark laws. Unauthorized use of any content may violate these laws and is strictly prohibited.
                  </p>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Confidentiality */}
                <section id="confidentiality" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <Lock className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Confidentiality</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We understand the sensitive nature of property valuations and engineering projects. Both parties agree to maintain 
                    confidentiality of all proprietary and confidential information exchanged during the course of our engagement.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Commitments</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Protect all client information with industry-standard security measures</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Not disclose project details to third parties without written consent</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Use client information solely for the purpose of providing services</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-brand-blue rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Maintain confidentiality obligations even after project completion</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Exceptions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Confidentiality obligations do not apply to information that: (a) is publicly available, (b) is required to be 
                    disclosed by law or court order, (c) is independently developed without use of confidential information, or (d) is 
                    rightfully obtained from third parties without confidentiality restrictions.
                  </p>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Limitation of Liability */}
                <section id="limitation-liability" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-brand-red mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Limitation of Liability</h2>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Disclaimer</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Our services are provided "as is" based on available information and site conditions at the time of inspection. 
                      While we exercise professional diligence and care, we make no warranties regarding:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Accuracy of third-party information provided to us</li>
                      <li>Future market conditions or property values</li>
                      <li>Hidden defects not visible during inspection</li>
                      <li>Changes in regulations or legal requirements</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Liability Limitations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To the maximum extent permitted by law:
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700"><strong>1.</strong> Our total liability shall not exceed the fees paid for the specific service in question</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700"><strong>2.</strong> We shall not be liable for indirect, consequential, or punitive damages</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700"><strong>3.</strong> We are not liable for losses arising from client's failure to follow our recommendations</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700"><strong>4.</strong> Force majeure events (natural disasters, civil unrest, etc.) exempt us from liability</p>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-gray-800">
                      <strong>Legal Notice:</strong> Some jurisdictions do not allow limitations on implied warranties or liability for 
                      incidental damages. These limitations may not apply to you.
                    </p>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Termination */}
                <section id="termination" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <Ban className="w-6 h-6 text-brand-red mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Termination</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Termination by Client</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Clients may terminate services by providing written notice. Upon termination:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                    <li>Payment for all work completed to date is required</li>
                    <li>Non-refundable advance payments will not be returned</li>
                    <li>Work-in-progress will be delivered in its current state</li>
                    <li>Cancellation fees may apply as per service agreement</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Termination by Company</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to terminate services immediately if:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">Client breaches payment terms</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">Client provides false information</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">Client violates these Terms</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">Project involves illegal activities</p>
                    </div>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Modifications */}
                <section id="modifications" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <RefreshCw className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Modifications to Terms</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our 
                    website. Your continued use of our services after changes constitutes acceptance of the modified Terms.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We will make reasonable efforts to notify users of significant changes through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                    <li>Email notification to registered users</li>
                    <li>Prominent notice on our website</li>
                    <li>Updated "Last modified" date at the top of this page</li>
                  </ul>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-800">
                      <strong>Recommendation:</strong> Please review these Terms periodically. If you do not agree with modified Terms, 
                      you should discontinue use of our services.
                    </p>
                  </div>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Governing Law */}
                <section id="governing-law" className="mb-12 scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <Scale className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Governing Law & Dispute Resolution</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Governing Law</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    These Terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from or 
                    relating to these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Rautahat, 
                    Madhesh Province, Nepal.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Dispute Resolution</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In the event of any dispute, controversy, or claim arising from these Terms:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                      <li><strong>Negotiation:</strong> Parties shall first attempt to resolve disputes through good faith negotiation</li>
                      <li><strong>Mediation:</strong> If negotiation fails, parties may agree to mediation by a neutral third party</li>
                      <li><strong>Arbitration:</strong> Unresolved disputes may be submitted to binding arbitration under Nepalese law</li>
                      <li><strong>Litigation:</strong> As a last resort, disputes may be brought before competent courts in Nepal</li>
                    </ol>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Language</h3>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms are written in English. In case of any conflict between English and Nepali versions, the English version 
                    shall prevail for interpretation purposes.
                  </p>
                </section>

                <hr className="my-10 border-gray-200" />

                {/* Contact Us */}
                <section id="contact" className="scroll-mt-24">
                  <div className="flex items-center mb-4">
                    <Mail className="w-6 h-6 text-brand-blue mr-3" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you have any questions, concerns, or require clarification regarding these Terms of Service, 
                    please contact us:
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Forever Shine Engineering Consultancy</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-brand-blue rounded-full p-2 mr-4">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Email</p>
                          <a href="mailto:info@forevershine.com.np" className="text-brand-blue hover:text-brand-red font-medium transition-colors">
                            info@forevershine.com.np
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-brand-blue rounded-full p-2 mr-4">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Phone</p>
                          <p className="text-gray-900 font-medium">+977 9805996059 / +977 9861053405</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-brand-blue rounded-full p-2 mr-4">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Address</p>
                          <p className="text-gray-900 font-medium">Birta Chowk, Rautahat, Madhesh Province, Nepal</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-blue-200">
                      <p className="text-sm text-gray-700 mb-4">
                        <strong>Business Hours:</strong> Sunday - Friday, 10:00 AM - 6:00 PM (Nepal Time)
                      </p>
                      <p className="text-sm text-gray-700">
                        We will respond to your inquiry within <strong>48 hours</strong> during business days.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Acknowledgment</h4>
                    <p className="text-sm text-gray-700">
                      By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                      These Terms constitute the entire agreement between you and Forever Shine Engineering Consultancy regarding the use of our services.
                    </p>
                  </div>
                </section>

              </div>
            </main>
          </div>
        </div>

        {/* Back to Privacy */}
        <div className="max-w-7xl mx-auto mt-8 text-center">
          <Link 
            href="/privacy" 
            className="inline-flex items-center text-brand-blue hover:text-brand-red font-medium transition-colors"
          >
            View Privacy Policy
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}