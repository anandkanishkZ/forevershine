"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Info, Briefcase, FolderKanban, BookOpen, Mail } from 'lucide-react';

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white shadow-md py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 z-50">
              <Image 
                src="/logo-transparent.png" 
                alt="Forever Shine Engineering" 
                width={220} 
                height={60} 
                className="h-10 sm:h-12 w-auto transition-transform duration-300 hover:scale-105"
              />
              <div>
                <div className="text-lg sm:text-2xl font-bold transition-colors duration-300">
                  <span className="text-brand-blue">Forever</span> <span className="text-brand-red">Shine</span>
                </div>
                <p className="text-xs text-gray-600 hidden sm:block">Engineering Consultancy</p>
              </div>
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
              className="md:hidden text-gray-800 hover:text-brand-blue transition-colors duration-300 z-50 relative p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-3' : ''
                  }`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-3' : ''
                  }`}
                ></span>
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50 md:hidden transform transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="bg-gradient-to-r from-brand-blue to-blue-600 px-6 py-6 shadow-md">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo-transparent.png" 
                alt="Forever Shine" 
                width={50} 
                height={50} 
                className="h-12 w-12 bg-white rounded-lg p-1"
              />
              <div>
                <h2 className="text-white font-bold text-xl">
                  <span className="text-blue-100">Forever</span> <span className="text-white">Shine</span>
                </h2>
                <p className="text-blue-100 text-xs">Engineering Consultancy</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      isActivePath(link.path)
                        ? 'bg-gradient-to-r from-brand-red to-red-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-brand-blue'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? 'slideInLeft 0.4s ease-out forwards' : 'none'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                    {isActivePath(link.path) && (
                      <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-6 px-2">
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="block w-full bg-gradient-to-r from-brand-red to-red-600 text-white text-center px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;