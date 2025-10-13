import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import SectionTitle from '@/components/SectionTitle';
import FeaturedBlogBanner from '@/components/FeaturedBlogBanner';
import BlogApiClient, { BlogPost } from '@/utils/blogApiClient';

export const metadata: Metadata = {
  title: 'Blog - Forever Engineering',
  description: 'Stay updated with the latest insights, projects, and engineering innovations from our expert team.',
  keywords: 'engineering blog, construction insights, project updates, technical articles',
  openGraph: {
    title: 'Blog - Forever Engineering',
    description: 'Stay updated with the latest insights, projects, and engineering innovations from our expert team.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Forever Engineering',
    description: 'Stay updated with the latest insights, projects, and engineering innovations from our expert team.',
  }
};

async function getBlogPosts(): Promise<{ featured: BlogPost | null; regular: BlogPost[] }> {
  try {
    const blogApi = new BlogApiClient();
    const response = await blogApi.getPublishedPosts({ limit: 20 });
    
    if (response.success) {
      const posts = response.data;
      const featuredPost = posts.find(post => post.featured) || null;
      const regularPosts = posts.filter(post => !post.featured);
      
      return { featured: featuredPost, regular: regularPosts };
    }
    
    console.error('Failed to fetch blog posts:', response.message);
    return { featured: null, regular: [] };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { featured: null, regular: [] };
  }
}

export default async function BlogPage() {
  const { featured, regular } = await getBlogPosts();

  return (
    <div className="pt-20 min-h-screen">
      {/* Featured Post Banner */}
      {featured && (
        <FeaturedBlogBanner post={featured} />
      )}

      {/* Hero Section - Only show if no featured post */}
      {!featured && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center py-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-dark mb-6">
              Our <span className="text-brand-blue">Engineering</span> Blog
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover insights, innovations, and engineering excellence from our team of experts. 
              Stay updated with the latest trends in construction and infrastructure development.
            </p>
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      <section className={`py-12 bg-gray-50 ${featured ? 'pt-8' : 'py-16'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-3">
              {featured ? 'More Articles' : 'Latest Articles'}
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              {featured 
                ? 'Explore more insights and updates from our engineering team'
                : 'Stay informed with our latest insights and project updates'
              }
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="h-1 w-16 bg-brand-blue rounded"></div>
            </div>
          </div>

          {regular.length === 0 && !featured ? (
            <div className="text-center py-16">
              <div className="relative mb-6">
                <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="h-12 w-12 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4">No blog posts yet</h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Check back soon for our latest insights and updates on engineering innovation.
              </p>
            </div>
          ) : regular.length === 0 && featured ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                More articles coming soon! Follow our featured post above for now.
              </p>
            </div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regular.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt || BlogApiClient.getExcerpt(post.content)}
                    image={post.imageUrl || ''}
                    date={post.publishedAt || post.createdAt}
                    author={post.author.email}
                    slug={post.slug}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {regular.length >= 12 && (
                <div className="text-center mt-12">
                  <button className="bg-brand-blue hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}