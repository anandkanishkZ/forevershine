import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/ProjectDetailClient';
import publicApiClient, { Project } from '@/utils/publicApiClient';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  // During build time, return default metadata to prevent errors
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_RUNTIME) {
    return {
      title: `${params.slug.replace(/-/g, ' ')} | Forever Shine Engineering`,
      description: 'Engineering project details and specifications.',
    };
  }

  try {
    // Fetch project data for metadata
    const response = await publicApiClient.getProjects({ limit: 100 });
    
    if (response.success && response.data) {
      const project = response.data.find(p => 
        p.title.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim() === params.slug
      );

      if (project) {
        const title = project.metaTitle || `${project.title} | Forever Shine Engineering`;
        const description = project.metaDescription || project.shortDescription || project.description.substring(0, 160);
        const images = project.imageUrl ? [project.imageUrl] : [];
        const keywords = project.metaKeywords ? project.metaKeywords.split(',').map(k => k.trim()) : [
          project.category,
          'engineering',
          'construction',
          'forever shine engineering',
          ...(project.technologies || [])
        ];

        return {
          title,
          description,
          keywords: keywords.join(', '),
          openGraph: {
            title,
            description,
            images,
            type: 'website',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${params.slug}`,
            siteName: 'Forever Shine Engineering',
          },
          twitter: {
            card: 'summary_large_image',
            title,
            description,
            images,
          },
          robots: {
            index: project.status === 'ACTIVE',
            follow: project.status === 'ACTIVE',
          },
          alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${params.slug}`,
          },
        };
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata
  return {
    title: 'Project | Forever Shine Engineering',
    description: 'View our engineering and construction project details.',
  };
}

const ProjectDetailPage = ({ params }: ProjectDetailPageProps) => {
  return <ProjectDetailClient slug={params.slug} />;
};

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default ProjectDetailPage;