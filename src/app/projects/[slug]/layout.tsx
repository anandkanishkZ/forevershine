import { Metadata } from 'next';
import publicApiClient from '@/utils/publicApiClient';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

// Generate metadata for SEO optimization
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Fetch project data
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
        const projectDescription = project.description || `Explore ${project.title}, a ${project.category.toLowerCase()} project by Forever Shine Engineering. Professional engineering services and construction solutions.`;
        
        return {
          title: `${project.title} | Forever Shine Engineering Projects`,
          description: projectDescription,
          keywords: [
            project.category.toLowerCase(),
            'engineering project',
            'construction',
            'forever shine engineering',
            project.clientName || '',
            'building construction',
            'infrastructure development'
          ].filter(Boolean).join(', '),
          authors: [{ name: 'Forever Shine Engineering' }],
          openGraph: {
            title: project.title,
            description: projectDescription,
            url: `/projects/${params.slug}`,
            siteName: 'Forever Shine Engineering',
            images: project.imageUrl ? [
              {
                url: project.imageUrl,
                width: 1200,
                height: 630,
                alt: `${project.title} - ${project.category} project by Forever Shine Engineering`,
              }
            ] : [],
            locale: 'en_US',
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: projectDescription,
            images: project.imageUrl ? [project.imageUrl] : [],
            creator: '@ForeverShineEng'
          },
          alternates: {
            canonical: `/projects/${params.slug}`,
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
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata
  return {
    title: 'Project Not Found | Forever Shine Engineering',
    description: 'The requested project could not be found. Explore our other engineering projects and construction services.',
    openGraph: {
      title: 'Project Not Found | Forever Shine Engineering',
      description: 'The requested project could not be found. Explore our other engineering projects and construction services.',
      url: `/projects/${params.slug}`,
      siteName: 'Forever Shine Engineering',
    },
  };
}

export default function ProjectLayout({ children, params }: ProjectLayoutProps) {
  return children;
}