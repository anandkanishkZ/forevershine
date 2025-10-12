'use client';

import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import apiClient from '@/utils/admin/apiClient';
import {
  Wrench,
  FolderOpen,
  Users,
  Star,
  MessageSquare,
  TrendingUp,
  Eye,
  Calendar,
  Plus
} from 'lucide-react';

interface DashboardStats {
  services: number;
  projects: number;
  teamMembers: number;
  testimonials: number;
  contactMessages: number;
  newMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    projects: 0,
    teamMembers: 0,
    testimonials: 0,
    contactMessages: 0,
    newMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, projectsRes, contactRes, teamRes, testimonialsRes] = await Promise.all([
          apiClient.getServices(),
          apiClient.getProjects(),
          apiClient.getContactSubmissions(),
          apiClient.getTeamMembers(),
          apiClient.getTestimonials()
        ]);

        console.log('Dashboard API responses:', {
          services: servicesRes,
          projects: projectsRes,
          contacts: contactRes,
          team: teamRes,
          testimonials: testimonialsRes
        });

        // Count new/unread contact messages
        const contacts = contactRes.data || [];
        const newMessages = contacts.filter(contact => contact.status === 'UNREAD').length;

        setStats({
          services: servicesRes.data?.length || 0,
          projects: projectsRes.data?.length || 0,
          teamMembers: teamRes.data?.length || 0,
          testimonials: testimonialsRes.data?.length || 0,
          contactMessages: contacts.length,
          newMessages: newMessages
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Set default values to prevent UI from breaking
        setStats({
          services: 0,
          projects: 0,
          teamMembers: 0,
          testimonials: 0,
          contactMessages: 0,
          newMessages: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      name: 'Total Services',
      value: stats.services,
      icon: Wrench,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Active Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      name: 'Team Members',
      value: stats.teamMembers,
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      name: 'Contact Messages',
      value: stats.contactMessages,
      icon: MessageSquare,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New service added',
      details: 'Property Valuation service was created',
      time: '2 hours ago',
      icon: Wrench,
      color: 'text-blue-600',
    },
    {
      id: 2,
      action: 'Project updated',
      details: 'Modern Office Complex project status changed',
      time: '4 hours ago',
      icon: FolderOpen,
      color: 'text-green-600',
    },
    {
      id: 3,
      action: 'New testimonial',
      details: 'Client review from John Smith added',
      time: '1 day ago',
      icon: Star,
      color: 'text-yellow-600',
    },
  ];

  return (
    <AdminDashboardLayout title="Dashboard">
      <div className="space-y-4">
        {/* Welcome Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl p-5 lg:p-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold mb-1">Welcome Back, Admin!</h1>
                <p className="text-blue-100 text-sm lg:text-base">Forever Shine Engineering Dashboard</p>
              </div>
            </div>
            <p className="text-blue-50 text-sm lg:text-base leading-relaxed">
              Manage your website content, track performance, and oversee all business operations.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => (
            <div key={card.name} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r shadow-md group-hover:shadow-lg transition-shadow ${
                    index === 0 ? 'from-blue-500 to-blue-600' :
                    index === 1 ? 'from-green-500 to-green-600' :
                    index === 2 ? 'from-purple-500 to-purple-600' :
                    'from-indigo-500 to-indigo-600'
                  }`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{card.name.split(' ')[0]}</p>
                    <div className="text-3xl font-bold text-gray-900 mt-1">
                      {loading ? (
                        <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                      ) : (
                        card.value
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{card.name.split(' ').slice(1).join(' ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    index === 0 ? 'bg-blue-100 text-blue-800' :
                    index === 1 ? 'bg-green-100 text-green-800' :
                    index === 2 ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {index === 0 ? 'Active' : index === 1 ? 'Live' : index === 2 ? 'Team' : 'Reviews'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 font-medium">Live Updates</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivities.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivities.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gradient-to-b from-blue-200 to-transparent"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-4">
                          <div>
                            <span className={`h-10 w-10 rounded-xl bg-gradient-to-r flex items-center justify-center shadow-md ${
                              activityIdx === 0 ? 'from-blue-500 to-blue-600' :
                              activityIdx === 1 ? 'from-green-500 to-green-600' :
                              'from-purple-500 to-purple-600'
                            }`}>
                              <activity.icon className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm text-gray-900 font-semibold">{activity.action}</p>
                                <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                              </div>
                              <div className="text-right ml-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                  {activity.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                    <Wrench className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Add Service</span>
                  <span className="text-xs text-gray-500 mt-1">Create new service</span>
                </button>
                <button className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-green-300 hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                    <FolderOpen className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700">New Project</span>
                  <span className="text-xs text-gray-500 mt-1">Add portfolio item</span>
                </button>
                <button className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-700">Write Blog</span>
                  <span className="text-xs text-gray-500 mt-1">Create article</span>
                </button>
                <button className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-700">Add Member</span>
                  <span className="text-xs text-gray-500 mt-1">Invite team member</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Website Analytics */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Website Analytics</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-500 font-medium">Last 30 days</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">12,459</p>
                <p className="text-sm font-semibold text-blue-700">Total Page Views</p>
                <div className="mt-2 flex items-center justify-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ↗ +15.3%
                  </span>
                </div>
              </div>
              <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">2,847</p>
                <p className="text-sm font-semibold text-green-700">Unique Visitors</p>
                <div className="mt-2 flex items-center justify-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ↗ +8.7%
                  </span>
                </div>
              </div>
              <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">3:24</p>
                <p className="text-sm font-semibold text-purple-700">Avg. Session</p>
                <div className="mt-2 flex items-center justify-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ↗ +2.1%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}