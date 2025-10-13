import { ApiResponse } from '@/types/admin';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    
    // Initialize token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('admin_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('admin_token', token);
      } else {
        localStorage.removeItem('admin_token');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  // Services
  async getServices(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<any[]>(`/services${query ? `?${query}` : ''}`);
  }

  async getService(id: string) {
    return this.request<any>(`/services/${id}`);
  }

  async createService(data: any) {
    return this.request<any>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request<any>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request<any>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects
  async getProjects(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<any[]>(`/projects${query ? `?${query}` : ''}`);
  }

  async getProject(id: string) {
    return this.request<any>(`/projects/${id}`);
  }

  async createProject(data: any) {
    return this.request<any>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: any) {
    return this.request<any>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request<any>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // File Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/upload/image`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }

  // Contact Submissions
  async getContactSubmissions() {
    return this.request<any[]>('/contact/submissions');
  }

  async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return this.request<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async updateContactSubmissionStatus(id: string, status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED') {
    return this.request<any>(`/contact/submissions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteContactSubmission(id: string) {
    return this.request<any>(`/contact/submissions/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog Posts
  async getBlogPosts(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<any[]>(`/blog${query ? `?${query}` : ''}`);
  }

  async getBlogPost(id: string) {
    return this.request<any>(`/blog/${id}`);
  }

  async createBlogPost(data: any) {
    return this.request<any>('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(id: string, data: any) {
    return this.request<any>(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlogPost(id: string) {
    return this.request<any>(`/blog/${id}`, {
      method: 'DELETE',
    });
  }

  // Team Members (placeholder)
  async getTeamMembers() {
    return this.request<any[]>('/team');
  }

  // Testimonials (placeholder)
  async getTestimonials() {
    return this.request<any[]>('/testimonials');
  }

  // Media Management
  async getMediaFiles(params?: { 
    category?: string; 
    type?: 'image' | 'document'; 
    page?: number; 
    limit?: number; 
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.type) searchParams.append('type', params.type);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request<any[]>(`/media${query ? `?${query}` : ''}`);
  }

  async uploadMedia(files: FileList, category: string = 'general') {
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('category', category);

    return this.request<any[]>('/media/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async deleteMedia(category: string, filename: string) {
    return this.request<any>(`/media/${category}/${filename}`, {
      method: 'DELETE',
    });
  }

  async getMediaCategories() {
    return this.request<string[]>('/media/categories');
  }

  // Settings
  async getSettings() {
    return this.request<any>('/settings');
  }

  async updateSettings(settings: any) {
    return this.request<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings }),
    });
  }

  async getSetting(key: string) {
    return this.request<any>(`/settings/${key}`);
  }

  async deleteSetting(key: string) {
    return this.request<any>(`/settings/${key}`, {
      method: 'DELETE',
    });
  }

  async initializeDefaultSettings() {
    return this.request<any>('/settings/initialize', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;