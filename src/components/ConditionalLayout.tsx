'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current route is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // For admin routes, render only children without header/footer
  if (isAdminRoute) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }
  
  // For regular routes, render with header and footer
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}