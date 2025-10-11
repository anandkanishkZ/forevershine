import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Forever Shine Engineering - Professional Engineering & Construction Services',
  description: 'Forever Shine Engineering provides professional engineering consultancy and construction services for residential and commercial projects. Expert solutions in municipality drawing, interior design, and more.',
  keywords: 'engineering consultancy, construction services, municipality drawing, interior design, civil engineering, property valuation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}