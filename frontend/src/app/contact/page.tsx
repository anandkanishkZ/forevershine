'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import ContactForm from '../../components/ContactForm';
import Image from 'next/image';
import { useSetting } from '@/hooks/useSiteSettings';

const Contact = () => {
  // Dynamic content from settings
  const companyAddress = useSetting('company_address', 'Birta Chowk, Rautahat, Madhesh Province');
  const companyPhone = useSetting('company_phone', '+977 9805996059 / +977 9861053405');
  const companyEmail = useSetting('company_email', 'info@forevershine.com.np');

  const officeLocations = [
    {
      name: 'Main Office',
      address: companyAddress,
      phone: companyPhone,
      email: companyEmail,
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.398367281529!2d85.27076231505767!3d26.76569598319099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec4b7e7e7e7e7f%3A0x7e7e7e7e7e7e7e7f!2sBirta%20Chowk%2C%20Rautahat%2C%20Nepal!5e0!3m2!1sen!2snp!4v1639321915921!5m2!1sen!2snp',
    },
    {
      name: 'Branch Office - Dhapakhel, Lalitpur',
      address: 'Dhapakhel, Lalitpur',
      phone: companyPhone,
      email: companyEmail,
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.5!2d85.3!3d27.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM5JzAwLjAiTiA4NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2snp!4v1639321915921!5m2!1sen!2snp',
    },
    {
      name: 'Branch Office - Janakpur',
      address: 'Bishnupur Chowk, Siraha',
      phone: companyPhone,
      email: companyEmail,
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.5!2d86.2!3d26.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQzJzEyLjAiTiA4NsKwMTInMDAuMCJF!5e0!3m2!1sen!2snp!4v1639321915921!5m2!1sen!2snp',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-blue-700">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover"
            width={2000}
            height={1333}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Contact Us</h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">
              Get in touch with our team to discuss your project requirements or inquire about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-4 sm:mb-6">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Our Location</h3>
              <p className="text-sm sm:text-base text-gray-600">{companyAddress}</p>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-4 sm:mb-6">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Phone & Email</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2 break-all">Phone: {companyPhone}</p>
              <p className="text-sm sm:text-base text-gray-600 break-all">Email: {companyEmail}</p>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-4 sm:mb-6">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Working Hours</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-sm sm:text-base text-gray-600 mb-2">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-sm sm:text-base text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <SectionTitle
                title="Get In Touch"
                subtitle="Send us a message and we&#39;ll get back to you as soon as possible"
              />
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Whether you have a question about our services, need a quote for your project, or want to discuss a potential collaboration, our team is here to help. Fill out the form and we&#39;ll respond promptly.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <MessageSquare className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">General Inquiries</h4>
                    <p className="text-xs sm:text-sm text-gray-600">For general questions about our company or services</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Project Quotes</h4>
                    <p className="text-xs sm:text-sm text-gray-600">For detailed information about pricing and timelines</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Technical Support</h4>
                    <p className="text-xs sm:text-sm text-gray-600">For assistance with ongoing projects or services</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Our Offices"
            subtitle="Visit us at one of our convenient locations"
            center={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10 md:mt-12">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 sm:h-56 md:h-64 w-full">
                  <iframe
                    src={office.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`Map of ${office.name}`}
                  ></iframe>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">{office.name}</h3>
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-start">
                      <MapPin className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{office.address}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600 break-all">{office.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600 break-all">{office.email}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="text-blue-700 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{office.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
