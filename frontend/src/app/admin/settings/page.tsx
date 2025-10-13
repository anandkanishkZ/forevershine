'use client';

import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import apiClient from '@/utils/admin/apiClient';

import LoadingSpinner from '@/components/admin/LoadingSpinner';
import {
  Settings,
  Building2,
  Globe,
  Search,
  Mail,
  Phone,
  Clock,
  Share2,
  Shield,
  BarChart3,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingValue {
  id: string;
  value: any;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  description?: string;
}

interface Settings {
  [key: string]: SettingValue;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  const settingCategories = {
    company: {
      label: 'Company Info',
      icon: Building2,
      description: 'Basic company information and branding',
      settings: [
        'company_name',
        'company_tagline', 
        'company_description',
        'company_address',
        'company_phone',
        'company_email',
        'company_website'
      ]
    },
    social: {
      label: 'Social Media',
      icon: Share2,
      description: 'Social media profiles and links',
      settings: [
        'social_facebook',
        'social_twitter',
        'social_linkedin',
        'social_instagram',
        'social_youtube'
      ]
    },
    seo: {
      label: 'SEO Settings',
      icon: Search,
      description: 'Search engine optimization configuration',
      settings: [
        'seo_meta_title',
        'seo_meta_description',
        'seo_keywords',
        'seo_og_image'
      ]
    },
    features: {
      label: 'Site Features',
      icon: Settings,
      description: 'Website functionality and features',
      settings: [
        'site_maintenance_mode',
        'site_allow_registrations',
        'blog_enable_comments',
        'contact_form_email'
      ]
    },
    business: {
      label: 'Business Hours',
      icon: Clock,
      description: 'Operating hours and availability',
      settings: [
        'business_hours'
      ]
    },
    notifications: {
      label: 'Notifications',
      icon: Mail,
      description: 'Email and notification settings',
      settings: [
        'email_notifications',
        'email_contact_notifications'
      ]
    },
    analytics: {
      label: 'Analytics & Tracking',
      icon: BarChart3,
      description: 'Analytics and tracking configuration',
      settings: [
        'google_analytics_id',
        'google_tag_manager_id',
        'facebook_pixel_id'
      ]
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getSettings();
      if (response.success) {
        setSettings(response.data);
      } else {
        setToast({ message: 'Failed to load settings', type: 'error' });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setToast({ message: 'Failed to load settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const response = await apiClient.updateSettings(settings);
      if (response.success) {
        setToast({ message: 'Settings saved successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to save settings', type: 'error' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setToast({ message: 'Failed to save settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleInitializeDefaults = async () => {
    try {
      setInitializing(true);
      const response = await apiClient.initializeDefaultSettings();
      if (response.success) {
        await fetchSettings();
        setToast({ message: 'Default settings initialized successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to initialize settings', type: 'error' });
      }
    } catch (error) {
      console.error('Error initializing settings:', error);
      setToast({ message: 'Failed to initialize settings', type: 'error' });
    } finally {
      setInitializing(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value
      }
    }));
  };

  const getSettingValue = (key: string) => {
    return settings[key]?.value || '';
  };

  const getSettingDescription = (key: string) => {
    return settings[key]?.description || '';
  };

  const getSettingType = (key: string) => {
    return settings[key]?.type || 'TEXT';
  };

  const formatSettingLabel = (key: string) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const togglePasswordVisibility = (key: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderSettingInput = (key: string) => {
    const type = getSettingType(key);
    const value = getSettingValue(key);
    const description = getSettingDescription(key);

    switch (type) {
      case 'BOOLEAN':
        return (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={value || false}
                onChange={(e) => updateSetting(key, e.target.checked)}
                className="h-4 w-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
              />
              <label htmlFor={key} className="ml-3 text-sm font-medium text-gray-700">
                {formatSettingLabel(key)}
              </label>
            </div>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        );

      case 'NUMBER':
        return (
          <div className="space-y-2">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {formatSettingLabel(key)}
            </label>
            <input
              type="number"
              id={key}
              value={value || 0}
              onChange={(e) => updateSetting(key, parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
            />
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        );

      case 'JSON':
        if (key === 'business_hours') {
          return renderBusinessHoursEditor(value);
        }
        return (
          <div className="space-y-2">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {formatSettingLabel(key)}
            </label>
            <textarea
              id={key}
              value={JSON.stringify(value || {}, null, 2)}
              onChange={(e) => {
                try {
                  const parsedValue = JSON.parse(e.target.value);
                  updateSetting(key, parsedValue);
                } catch {
                  // Invalid JSON, don't update
                }
              }}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue font-mono text-sm"
            />
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        );

      default: // TEXT
        const isPassword = key.toLowerCase().includes('password') || key.toLowerCase().includes('secret') || key.toLowerCase().includes('key');
        const isUrl = key.toLowerCase().includes('url') || key.toLowerCase().includes('website');
        
        return (
          <div className="space-y-2">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {formatSettingLabel(key)}
            </label>
            <div className="relative">
              <input
                type={isPassword && !showPasswords[key] ? 'password' : 'text'}
                id={key}
                value={value || ''}
                onChange={(e) => updateSetting(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue pr-10"
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords[key] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
              {isUrl && value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        );
    }
  };

  const renderBusinessHoursEditor = (businessHours: any) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const hours = businessHours || {};

    const updateBusinessHours = (day: string, field: string, value: any) => {
      const updated = {
        ...hours,
        [day]: {
          ...hours[day],
          [field]: value
        }
      };
      updateSetting('business_hours', updated);
    };

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Business Hours</h4>
        <div className="space-y-3">
          {days.map(day => (
            <div key={day} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
              <div className="w-24">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {day}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!hours[day]?.closed}
                  onChange={(e) => updateBusinessHours(day, 'closed', !e.target.checked)}
                  className="h-4 w-4 text-brand-blue border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Open</span>
              </div>
              {!hours[day]?.closed && (
                <>
                  <input
                    type="time"
                    value={hours[day]?.open || '09:00'}
                    onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="time"
                    value={hours[day]?.close || '18:00'}
                    onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminDashboardLayout title="Settings">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout title="Settings">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="mr-3 h-8 w-8 text-brand-blue" />
                Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Configure your website settings and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleInitializeDefaults}
                disabled={initializing}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${initializing ? 'animate-spin' : ''}`} />
                <span>Initialize Defaults</span>
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-6 py-2 bg-brand-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Save className={`h-4 w-4 ${saving ? 'animate-pulse' : ''}`} />
                <span>{saving ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {Object.entries(settingCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-3 transition-colors ${
                        activeTab === key
                          ? 'bg-brand-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {Object.entries(settingCategories).map(([key, category]) => {
                if (activeTab !== key) return null;

                return (
                  <div key={key}>
                    <div className="border-b border-gray-200 pb-4 mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <category.icon className="mr-3 h-5 w-5 text-brand-blue" />
                        {category.label}
                      </h2>
                      <p className="text-gray-600 mt-1">{category.description}</p>
                    </div>

                    <div className="space-y-6">
                      {category.settings.map(settingKey => {
                        if (!settings[settingKey]) {
                          return (
                            <div key={settingKey} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <p className="text-sm text-yellow-800">
                                  Setting "{formatSettingLabel(settingKey)}" not found. 
                                  <button 
                                    onClick={handleInitializeDefaults}
                                    className="ml-1 underline hover:no-underline"
                                  >
                                    Initialize defaults
                                  </button> to create it.
                                </p>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={settingKey}>
                            {renderSettingInput(settingKey)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Settings Help</h3>
              <div className="mt-2 text-sm text-blue-800 space-y-1">
                <p>• <strong>Company Info:</strong> Basic information displayed across your website</p>
                <p>• <strong>Social Media:</strong> Links to your social media profiles</p>
                <p>• <strong>SEO Settings:</strong> Default meta tags for search engine optimization</p>
                <p>• <strong>Site Features:</strong> Control website functionality and features</p>
                <p>• <strong>Business Hours:</strong> Configure your operating schedule</p>
                <p>• <strong>Analytics:</strong> Add tracking codes for analytics platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 ${
            toast.type === 'success' ? 'bg-green-100 border border-green-300 text-green-800' :
            toast.type === 'error' ? 'bg-red-100 border border-red-300 text-red-800' :
            'bg-blue-100 border border-blue-300 text-blue-800'
          }`}>
            {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5" />}
            {toast.type === 'info' && <Info className="h-5 w-5" />}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-3 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
}