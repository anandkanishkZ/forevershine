'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import publicApiClient, { Project } from '@/utils/publicApiClient';
import { generateProjectStructuredData, generateBreadcrumbStructuredData } from '@/utils/structuredData';
import { 
  Calendar, 
  Building, 
  User, 
  MapPin, 
  Clock, 
  Star, 
  ArrowLeft,
  Share2,
  ExternalLink,
  CheckCircle,
  Award,
  Ruler,
  Camera
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}



const ProjectDetailPage = ({ params }: ProjectDetailPageProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectBySlug(params.slug);
  }, [params.slug]);

  const fetchProjectBySlug = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      // For now, we'll fetch all projects and find by matching title as slug
      // In a real implementation, you'd want a dedicated API endpoint for slug-based fetching
      const response = await publicApiClient.getProjects({ limit: 100 });

      if (response.success && response.data) {
        // Convert title to slug format for matching
        const targetProject = response.data.find(p => 
          p.title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim() === slug
        );

        if (targetProject) {
          setProject(targetProject);
          
          // Fetch related projects from the same category
          const related = response.data
            .filter(p => p.id !== targetProject.id && p.category === targetProject.category)
            .slice(0, 3);
          setRelatedProjects(related);
        } else {
          setError('Project not found');
        }
      } else {
        setError('Failed to fetch project');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Ongoing';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const shareProject = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Project link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading project details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/projects">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateProjectStructuredData(project),
            generateBreadcrumbStructuredData([
              { name: 'Home', url: '/' },
              { name: 'Projects', url: '/projects' },
              { name: project.title, url: `/projects/${params.slug}` }
            ])
          ])
        }}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Building className="w-24 h-24 text-blue-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Navigation & Share */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
          <Link href="/projects">
            <Button variant="outline" className="bg-white/90 hover:bg-white text-gray-900 border-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="bg-white/90 hover:bg-white text-gray-900 border-white/20"
            onClick={shareProject}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-yellow-500 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  Featured Project
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Project Features/Details */}
                  <div className="bg-gray-50 rounded-xl p-8 mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Project Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Quality Assurance</h4>
                          <p className="text-gray-600">Rigorous quality control throughout the project lifecycle</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Professional Standards</h4>
                          <p className="text-gray-600">Adheres to international engineering standards</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Ruler className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Precise Engineering</h4>
                          <p className="text-gray-600">Detailed technical specifications and documentation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Timely Delivery</h4>
                          <p className="text-gray-600">Completed within scheduled timeline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-8 sticky top-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Project Information</h3>
                  
                  <div className="space-y-6">
                    {project.clientName && (
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Client</p>
                          <p className="font-semibold text-gray-900">{project.clientName}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Completion Date</p>
                        <p className="font-semibold text-gray-900">{formatDate(project.completionDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Building className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Category</p>
                        <p className="font-semibold text-gray-900">{project.category}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Status</p>
                        <p className="font-semibold text-green-600">Completed</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <Button className="w-full mb-4">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Start Similar Project
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      View Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Related Projects"
              subtitle={`More ${project.category.toLowerCase()} projects you might be interested in`}
              center={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${generateSlug(relatedProject.title)}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-48 overflow-hidden">
                      {relatedProject.imageUrl ? (
                        <Image
                          src={relatedProject.imageUrl}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                          <Building className="w-12 h-12 text-blue-400" />
                        </div>
                      )}
                      {relatedProject.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {relatedProject.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Inspired by This Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can bring your vision to life with our expertise and dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3">
                Get Free Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3">
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;