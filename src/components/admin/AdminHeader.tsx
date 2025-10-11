'use client';

import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title: string;
}

export default function AdminHeader({ onMenuToggle, title }: AdminHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="flex items-center justify-between h-14 px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:scale-105"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1"></div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-3 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:scale-105 group">
            <Bell className="h-5 w-5 group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="h-10 w-10 rounded-full ring-2 ring-gradient-to-r ring-offset-2 ring-offset-white ring-blue-500 hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute -bottom-1 -right-1 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-700">John Doe</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}