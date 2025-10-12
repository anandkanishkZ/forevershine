import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Projects Portfolio | Forever Shine Engineering',
  description: 'Explore our comprehensive portfolio of engineering and construction projects. From residential buildings to commercial complexes, discover our expertise in delivering quality infrastructure solutions.',
  keywords: 'engineering projects, construction portfolio, building projects, infrastructure development, commercial construction, residential projects, forever shine engineering',
  authors: [{ name: 'Forever Shine Engineering' }],
  openGraph: {
    title: 'Engineering Projects Portfolio | Forever Shine Engineering',
    description: 'Explore our comprehensive portfolio of engineering and construction projects. From residential buildings to commercial complexes, discover our expertise in delivering quality infrastructure solutions.',
    url: '/projects',
    siteName: 'Forever Shine Engineering',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Projects Portfolio | Forever Shine Engineering',
    description: 'Explore our comprehensive portfolio of engineering and construction projects.',
    creator: '@ForeverShineEng'
  },
  alternates: {
    canonical: '/projects',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}