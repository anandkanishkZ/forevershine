'use client';

import React from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { HelpCircle, Book, MessageSquare, Phone, Mail, ExternalLink, FileText, Video, Users } from 'lucide-react';

export default function AdminHelpPage() {
  const helpSections = [
    {
      title: 'Getting Started',
      icon: Book,
      items: [
        { title: 'Dashboard Overview', description: 'Learn about the main dashboard features' },
        { title: 'Managing Content', description: 'How to add and edit website content' },
        { title: 'User Management', description: 'Managing user accounts and permissions' },
        { title: 'Settings Configuration', description: 'Configuring website settings' }
      ]
    },
    {
      title: 'Content Management',
      icon: FileText,
      items: [
        { title: 'Creating Blog Posts', description: 'How to create and publish blog posts' },
        { title: 'Managing Projects', description: 'Adding and organizing project portfolios' },
        { title: 'Service Management', description: 'Managing service offerings' },
        { title: 'Media Library', description: 'Uploading and organizing images and files' }
      ]
    },
    {
      title: 'Video Tutorials',
      icon: Video,
      items: [
        { title: 'Quick Start Guide', description: '5-minute overview of the admin panel' },
        { title: 'Content Creation', description: 'Step-by-step content creation guide' },
        { title: 'Settings Management', description: 'Comprehensive settings walkthrough' },
        { title: 'Troubleshooting', description: 'Common issues and solutions' }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email for detailed assistance',
      action: 'Send Email',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for urgent technical support',
      action: 'Call Now',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <AdminDashboardLayout title="Help & Support">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support Center</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions, browse our documentation, or get in touch with our support team.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((option) => (
            <div key={option.title} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mx-auto mb-4`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <button className={`w-full py-2 px-4 ${option.color} text-white rounded-lg font-medium transition-colors`}>
                {option.action}
              </button>
            </div>
          ))}
        </div>

        {/* Help Sections */}
        <div className="space-y-8">
          {helpSections.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <section.icon className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <div key={item.title} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'How do I reset my password?',
                answer: 'You can reset your password from the profile settings page or contact the administrator.'
              },
              {
                question: 'How do I upload images to the media library?',
                answer: 'Go to the Media Gallery section and use the upload feature to add new images and files.'
              },
              {
                question: 'Can I customize the website theme?',
                answer: 'Yes, you can customize colors, fonts, and layout options from the Settings > Site Features section.'
              },
              {
                question: 'How do I backup my data?',
                answer: 'Data backups are performed automatically daily. You can also export content from each section.'
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">System Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Current Version</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Admin Panel:</span>
                  <span className="font-medium">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Database:</span>
                  <span className="font-medium">PostgreSQL 14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Server:</span>
                  <span className="font-medium">Node.js 18.x</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Last Updated</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Content:</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Settings:</span>
                  <span className="font-medium">1 day ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Backup:</span>
                  <span className="font-medium">Today at 3:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}