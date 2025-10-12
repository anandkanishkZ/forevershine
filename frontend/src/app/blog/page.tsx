import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import SectionTitle from '@/components/SectionTitle';
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

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogApi = new BlogApiClient();
    const response = await blogApi.getPublishedPosts({ limit: 12 });
    
    if (response.success) {
      return response.data;
    }
    
    console.error('Failed to fetch blog posts:', response.message);
    return [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Engineering Insights & Updates
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover the latest in engineering innovation, project insights, and industry expertise from our team.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Latest Articles"
            subtitle="Stay informed with our latest insights and project updates"
          />

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No blog posts yet</h3>
              <p className="text-gray-500">Check back soon for our latest insights and updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
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
          )}

          {/* Load More Button - Future Enhancement */}
          {posts.length >= 12 && (
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}