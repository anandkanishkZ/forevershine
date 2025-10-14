'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Building2, Award, Users, TrendingUp } from 'lucide-react';
import { useSetting } from '@/hooks/useSiteSettings';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Dynamic content from settings
  const companyName = useSetting('company_name', 'Forever Shine Engineering');
  const companyAddress = useSetting('company_address', 'Birta Chowk, Rautahat, Madhesh Province');
  const companyPhone = useSetting('company_phone', '+977 9805996059 / +977 9861053405');
  const companyEmail = useSetting('company_email', 'info@forevershine.com.np');
  const companyTagline = useSetting('company_tagline', 'Building Tomorrow Today');
  
  // Dynamic social media links
  const facebookUrl = useSetting('social_facebook', '');
  const twitterUrl = useSetting('social_twitter', '');
  const linkedinUrl = useSetting('social_linkedin', '');
  const instagramUrl = useSetting('social_instagram', '');

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Company Info with Title */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-5">
            {/* Company Title */}
            <Link href="/" className="inline-block">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight hover:text-blue-400 transition-colors">
                Forever Shine Engineering Consultancy
              </h3>
            </Link>
            
            
            
            {/* About Us Content */}
            <div className="space-y-3">
           
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Forever Shine Engineering Consultancy is a trusted engineering firm in Nepal, specializing in property valuation, consultancy, and construction services.

              </p>
             
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {facebookUrl && (
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 p-2.5 rounded-full hover:bg-gray-800 border border-transparent hover:border-blue-500"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {twitterUrl && (
                <a 
                  href={twitterUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 p-2.5 rounded-full hover:bg-gray-800 border border-transparent hover:border-blue-500"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {instagramUrl && (
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-pink-400 transition-all duration-300 p-2.5 rounded-full hover:bg-gray-800 border border-transparent hover:border-pink-500"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {linkedinUrl && (
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 p-2.5 rounded-full hover:bg-gray-800 border border-transparent hover:border-blue-500"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-base sm:text-lg font-bold text-white mb-1 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block py-1 group">
                  <span className="group-hover:text-blue-400">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block py-1 group">
                  <span className="group-hover:text-blue-400">›</span> Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block py-1 group">
                  <span className="group-hover:text-blue-400">›</span> Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block py-1 group">
                  <span className="group-hover:text-blue-400">›</span> Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block py-1 group">
                  <span className="group-hover:text-blue-400">›</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-base sm:text-lg font-bold text-white mb-1 relative inline-block">
              Our Services
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start text-gray-400 hover:text-white transition-colors">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>Property Valuation</span>
              </li>
              <li className="flex items-start text-gray-400 hover:text-white transition-colors">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>Engineering Consultancy</span>
              </li>
              <li className="flex items-start text-gray-400 hover:text-white transition-colors">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>Site Supervision</span>
              </li>
              <li className="flex items-start text-gray-400 hover:text-white transition-colors">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>Bill Verification</span>
              </li>
              <li className="flex items-start text-gray-400 hover:text-white transition-colors">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>Construction Services</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-base sm:text-lg font-bold text-white mb-1 relative inline-block">
              Contact Info
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h4>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div className="flex items-start text-gray-400 hover:text-white transition-colors group">
                <div className="bg-gray-800 group-hover:bg-blue-600 transition-colors p-2 rounded-lg mr-3 flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Call Us</p>
                  <p className="break-words leading-relaxed">{companyPhone}</p>
                </div>
              </div>
              
              <div className="flex items-start text-gray-400 hover:text-white transition-colors group">
                <div className="bg-gray-800 group-hover:bg-blue-600 transition-colors p-2 rounded-lg mr-3 flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Email Us</p>
                  <p className="break-all leading-relaxed">{companyEmail}</p>
                </div>
              </div>
              
              <div className="flex items-start text-gray-400 hover:text-white transition-colors group">
                <div className="bg-gray-800 group-hover:bg-blue-600 transition-colors p-2 rounded-lg mr-3 flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Location</p>
                  <p className="leading-relaxed">{companyAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-3 sm:gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <p className="text-center sm:text-left">
                &copy; {currentYear} <span className="text-white font-medium">{companyName}</span>. All rights reserved.
              </p>
              <span className="hidden sm:inline text-gray-700">|</span>
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
            
            <div className="text-center sm:text-right">
              <p className="text-[10px] sm:text-xs">
                Developed By: <a href="https://zwickytechnology.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Zwicky Technology</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}