'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  File,
  Search,
  Grid,
  List,
  Trash2,
  Eye,
  Download,
  Filter,
  FolderOpen,
  Plus
} from 'lucide-react';
import apiClient from '@/utils/admin/apiClient';

interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  category: string;
  url: string;
  size: number;
  type: 'image' | 'document';
  mimeType: string;
  dimensions?: {
    width: number;
    height: number;
  };
  createdAt: string;
  thumbnailUrl?: string;
}

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (file: MediaFile | MediaFile[]) => void;
  multiple?: boolean;
  acceptedTypes?: ('image' | 'document')[];
  selectedFiles?: MediaFile[];
  title?: string;
}

const MediaPicker: React.FC<MediaPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  multiple = false,
  acceptedTypes = ['image', 'document'],
  selectedFiles = [],
  title = 'Select Media'
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>(
    selectedFiles.map(f => f.id)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'document'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [dragOver, setDragOver] = useState(false);

  // Fetch media files
  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = { limit: 50 };
      
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      
      if (selectedType !== 'all') {
        params.type = selectedType;
      }

      const response = await apiClient.getMediaFiles(params);
      if (response.success) {
        let filteredFiles = response.data || [];
        
        // Filter by accepted types
        filteredFiles = filteredFiles.filter(file => 
          acceptedTypes.includes(file.type)
        );
        
        // Filter by search term
        if (searchTerm) {
          filteredFiles = filteredFiles.filter(file =>
            file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            file.filename.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setFiles(filteredFiles);
      }
    } catch (error) {
      console.error('Failed to fetch media files:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedType, acceptedTypes, searchTerm]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await apiClient.getMediaCategories();
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
      fetchCategories();
    }
  }, [isOpen, fetchFiles, fetchCategories]);

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [searchTerm, selectedCategory, selectedType, fetchFiles]);

  // Handle file upload
  const handleFileUpload = async (uploadFiles: FileList) => {
    if (!uploadFiles || uploadFiles.length === 0) return;

    try {
      setUploading(true);
      const category = selectedCategory === 'all' ? 'general' : selectedCategory;
      const response = await apiClient.uploadMedia(uploadFiles, category);
      
      if (response.success) {
        await fetchFiles();
        setActiveTab('library');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      handleFileUpload(droppedFiles);
    }
  };

  // Handle file selection
  const toggleFileSelection = (file: MediaFile) => {
    if (multiple) {
      setSelectedFileIds(prev => {
        if (prev.includes(file.id)) {
          return prev.filter(id => id !== file.id);
        } else {
          return [...prev, file.id];
        }
      });
    } else {
      setSelectedFileIds([file.id]);
    }
  };

  // Handle selection confirm
  const handleConfirmSelection = () => {
    const selected = files.filter(file => selectedFileIds.includes(file.id));
    if (selected.length > 0) {
      onSelect(multiple ? selected : selected[0]);
      onClose();
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-4 bg-white rounded-lg shadow-2xl flex flex-col max-h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'library'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FolderOpen className="w-4 h-4 inline-block mr-2" />
            Media Library
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload Files
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'library' ? (
            <>
              {/* Filters and Search */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Search */}
                  <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search files..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>

                  {/* Type Filter */}
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="image">Images</option>
                    <option value="document">Documents</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${
                        viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${
                        viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Files Grid/List */}
              <div className="flex-1 overflow-auto p-4">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : files.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <FolderOpen className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">No files found</p>
                    <p>Upload some files to get started</p>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {files.map(file => (
                      <div
                        key={file.id}
                        onClick={() => toggleFileSelection(file)}
                        className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                          selectedFileIds.includes(file.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="aspect-square p-2">
                          {file.type === 'image' ? (
                            <img
                              src={file.thumbnailUrl || file.url}
                              alt={file.originalName}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                              <File className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-2 border-t">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {file.originalName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>

                        {selectedFileIds.includes(file.id) && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map(file => (
                      <div
                        key={file.id}
                        onClick={() => toggleFileSelection(file)}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedFileIds.includes(file.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-12 h-12 rounded overflow-hidden mr-3">
                          {file.type === 'image' ? (
                            <img
                              src={file.thumbnailUrl || file.url}
                              alt={file.originalName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <File className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{file.originalName}</p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)} • {file.category}
                            {file.dimensions && ` • ${file.dimensions.width}×${file.dimensions.height}`}
                          </p>
                        </div>

                        {selectedFileIds.includes(file.id) && (
                          <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center ml-3">
                            <span className="text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Upload Tab */
            <div className="flex-1 p-6">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragOver
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {uploading ? 'Uploading...' : 'Upload Files'}
                </h3>
                <p className="text-gray-600 mb-6">
                  Drag and drop files here, or click to select files
                </p>
                
                <input
                  type="file"
                  multiple
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                  accept={acceptedTypes.includes('image') ? 'image/*' : undefined}
                />
                
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Select Files
                </label>

                {uploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedFileIds.length > 0 && (
              <span>{selectedFileIds.length} file{selectedFileIds.length > 1 ? 's' : ''} selected</span>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSelection}
              disabled={selectedFileIds.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {multiple ? 'Select Files' : 'Select File'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPicker;