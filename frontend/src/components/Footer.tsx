'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
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
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              {companyName}
            </h3>
            <p className="text-gray-400 mb-4 text-xs sm:text-sm leading-relaxed">
              Professional engineering consultancy and construction services delivering excellence across Nepal.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {facebookUrl && (
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
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
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
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
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
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
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors inline-block py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors inline-block py-1">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors inline-block py-1">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors inline-block py-1">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors inline-block py-1">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <p className="break-words">{companyPhone}</p>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <p className="break-all">{companyEmail}</p>
              </div>
              <div className="flex items-start text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">{companyAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-2 sm:gap-0">
            <p className="text-center sm:text-left">&copy; {currentYear} Forever Shine Engineering. All rights reserved.</p>
            <div className="text-center sm:text-right">
              <p className="text-[10px] sm:text-xs">
                Developed By: <a href="https://zwickytechnology.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Zwicky Technology</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}