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
  X
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
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700/50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">FS</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Forever Shine</h1>
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
          <div className="px-6 py-6 border-b border-slate-700/50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-white">
                  {user?.email || 'Administrator'}
                </p>
                <p className="text-xs text-slate-400">System Administrator</p>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md hover:translate-x-1'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white group-hover:scale-110'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-slate-700/50">
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-3 py-3 text-sm font-medium text-slate-300 rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-all duration-300 hover:shadow-md hover:translate-x-1"
            >
              <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}