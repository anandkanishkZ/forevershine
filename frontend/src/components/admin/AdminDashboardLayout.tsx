'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/admin/useAuth';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminDashboardLayout({ children, title }: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      {/* Sidebar - Fixed Left Column */}
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content Area - Right Column */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header - Fixed at top of content area */}
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title={title} />
        
        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}