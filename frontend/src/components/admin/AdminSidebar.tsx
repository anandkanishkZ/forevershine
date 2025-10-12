'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/admin/useAuth';
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  Users,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Mail,
  Image
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Services',
      href: '/admin/services',
      icon: Wrench,
    },
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: FolderOpen,
    },
    {
      name: 'Blog Posts',
      href: '/admin/blog',
      icon: MessageSquare,
    },
    {
      name: 'Contact Messages',
      href: '/admin/contact',
      icon: Mail,
    },
    {
      name: 'Media Gallery',
      href: '/admin/media',
      icon: Image,
    },
    {
      name: 'Team Members',
      href: '/admin/team',
      icon: Users,
    },
    {
      name: 'Testimonials',
      href: '/admin/testimonials',
      icon: Star,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/admin';
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700/50 flex-shrink-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">FS</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">Forever Shine</h1>
                    <p className="text-xs text-slate-400">Engineering Admin</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b border-slate-700/50 flex-shrink-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.email || 'Administrator'}
                </p>
                <p className="text-xs text-slate-400">System Administrator</p>
                <div className="mt-0.5">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-3 overflow-hidden">
            <div className="space-y-1 h-full overflow-y-auto scrollbar-hide">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md hover:translate-x-1'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-4 w-4 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white group-hover:scale-110'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Visit Site Link */}
              <div className="pt-3 mt-3 border-t border-slate-700/30">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center px-3 py-2.5 text-sm font-medium text-slate-300 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-teal-600/20 hover:text-emerald-400 transition-all duration-300 hover:shadow-md hover:translate-x-1"
                >
                  <ExternalLink className="mr-3 h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  Visit Site
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 py-3 border-t border-slate-700/50 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-slate-300 rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-all duration-300 hover:shadow-md hover:translate-x-1"
            >
              <LogOut className="mr-3 h-4 w-4 text-slate-400 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}