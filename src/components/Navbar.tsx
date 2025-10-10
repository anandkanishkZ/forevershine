"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white shadow-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/logo-transparent.png" 
              alt="Forever Shine Engineering" 
              width={220} 
              height={60} 
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
            <span className="text-2xl font-bold transition-colors duration-300">
              <span className="text-brand-blue">Forever</span><span className="text-brand-red">Shine</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative py-2 text-gray-700 hover:text-brand-dark font-medium transition-colors duration-300 ${
                  isActivePath(link.path) ? 'text-brand-dark' : ''
                }`}
              >
                {link.name}
                {isActivePath(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-red transform origin-left transition-transform duration-300"></span>
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`bg-brand-red text-white px-5 py-2 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 ${
                isActivePath('/contact') ? 'ring-2 ring-brand-blue' : ''
              }`}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 hover:text-blue-700 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`block py-2 px-4 rounded-md transition-all duration-300 ${
                  isActivePath(link.path)
                    ? 'bg-red-50 text-brand-dark font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`block w-full bg-brand-red text-white text-center px-5 py-2 rounded-md hover:bg-red-700 transition-all duration-300 ${
                isActivePath('/contact') ? 'ring-2 ring-brand-blue' : ''
              }`}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;