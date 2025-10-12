// Public API Client for frontend (no authentication required)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  shortDescription?: string;
  clientName?: string;
  location?: string;
  completionDate?: string;
  startDate?: string;
  budget?: number;
  projectArea?: number;
  projectType?: string;
  imageUrl?: string;
  galleryImages?: string[];
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  featured: boolean;
  priority?: number;
  metaTitle?: string;
  metaDescription?: string;
  technologies?: string[];
  teamMembers?: string[];
  challenges?: string[];
  achievements?: string[];
  testimonial?: string;
  socialImages?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class PublicApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Projects
  async getProjects(params?: { 
    page?: number; 
    limit?: number; 
    search?: string;
    category?: string;
    featured?: boolean;
  }): Promise<ApiResponse<Project[]>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    
    const url = `${this.baseURL}/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }

  // Services
  async getServices(params?: { 
    page?: number; 
    limit?: number; 
    search?: string;
  }): Promise<ApiResponse<Service[]>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const url = `${this.baseURL}/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw error;
    }
  }
}

const publicApiClient = new PublicApiClient();
export default publicApiClient;