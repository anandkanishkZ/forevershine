'use client';'use client';



import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

import Button from '@/components/Button';import SectionTitle from '@/components/SectionTitle';

import publicApiClient, { Project } from '@/utils/publicApiClient';import Button from '@/components/Button';

import { Search, Star, Calendar, Building, User, Loader2 } from 'lucide-react';import publicApiClient, { Project } from '@/utils/publicApiClient';

import { Search, Filter, Star, Calendar, Building, User, Loader2 } from 'lucide-react';

const Projects = () => {

  const [projects, setProjects] = useState<Project[]>([]);const Projects = () => {

  const [loading, setLoading] = useState(true);  const [projects, setProjects] = useState<Project[]>([]);

  const [error, setError] = useState<string | null>(null);  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('all');  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');  const [selectedCategory, setSelectedCategory] = useState('all');

  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);  const [searchTerm, setSearchTerm] = useState('');

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Available categories

  const categories = [  // Available categories

    'all',  const categories = [

    'Residential Building',    'all',

    'Commercial Building',    'Residential Building',

    'Industrial Project',    'Commercial Building',

    'Infrastructure',    'Industrial Project',

    'Property Valuation',    'Infrastructure',

    'Structural Design',    'Property Valuation',

    'Other'    'Structural Design',

  ];    'Other'

  ];

  useEffect(() => {

    fetchProjects();  useEffect(() => {

  }, [selectedCategory, searchTerm, showFeaturedOnly]);    fetchProjects();

  }, [selectedCategory, searchTerm, showFeaturedOnly]);

  const fetchProjects = async () => {

    try {  const fetchProjects = async () => {

      setLoading(true);    try {

      setError(null);      setLoading(true);

            setError(null);

      const params: any = {      

        limit: 50,      const params: any = {

      };        limit: 50,

            };

      if (selectedCategory !== 'all') {      

        params.category = selectedCategory;      if (selectedCategory !== 'all') {

      }        params.category = selectedCategory;

            }

      if (searchTerm) {      

        params.search = searchTerm;      if (searchTerm) {

      }        params.search = searchTerm;

            }

      if (showFeaturedOnly) {      

        params.featured = true;      if (showFeaturedOnly) {

      }        params.featured = true;

      }

      const response = await publicApiClient.getProjects(params);

            const response = await publicApiClient.getProjects(params);

      if (response.success) {      

        setProjects(response.data || []);      if (response.success) {

      } else {        setProjects(response.data || []);

        setError(response.message || 'Failed to fetch projects');      } else {

      }        setError(response.message || 'Failed to fetch projects');

    } catch (err) {      }

      console.error('Error fetching projects:', err);    } catch (err) {

      setError('Failed to load projects. Please try again later.');      console.error('Error fetching projects:', err);

      setProjects([]);      setError('Failed to load projects. Please try again later.');

    } finally {      setProjects([]);

      setLoading(false);    } finally {

    }      setLoading(false);

  };    }

  };

  const handleSearch = (e: React.FormEvent) => {

    e.preventDefault();  const handleSearch = (e: React.FormEvent) => {

    fetchProjects();    e.preventDefault();

  };    fetchProjects();

  };

  const formatDate = (dateString?: string) => {

    if (!dateString) return 'N/A';  const formatDate = (dateString?: string) => {

    return new Date(dateString).toLocaleDateString('en-US', {    if (!dateString) return 'N/A';

      year: 'numeric',    return new Date(dateString).toLocaleDateString('en-US', {

      month: 'long'      year: 'numeric',

    });      month: 'long'

  };    });

  };

  if (loading) {

    return (  if (loading) {

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">    return (

        <div className="container mx-auto px-4 py-16">      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

          <div className="flex items-center justify-center h-64">        <div className="container mx-auto px-4 py-16">

            <div className="text-center">          <div className="flex items-center justify-center h-64">

              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />            <div className="text-center">

              <p className="text-gray-600">Loading projects...</p>              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />

            </div>              <p className="text-gray-600">Loading projects...</p>

          </div>            </div>

        </div>          </div>

      </div>        </div>

    );      </div>

  }    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">  return (

      {/* Hero Section */}    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">      {/* Hero Section */}

        <div className="container mx-auto px-4">      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">

          <div className="text-center max-w-3xl mx-auto">        <div className="container mx-auto px-4">

            <h1 className="text-5xl md:text-6xl font-bold mb-6">          <div className="text-center max-w-3xl mx-auto">

              Our <span className="text-yellow-400">Projects</span>            <h1 className="text-5xl md:text-6xl font-bold mb-6">

            </h1>              Our <span className="text-yellow-400">Projects</span>

            <p className="text-xl text-blue-100 mb-8">            </h1>

              Explore our portfolio of successful engineering projects that demonstrate             <p className="text-xl text-blue-100 mb-8">

              our commitment to excellence, innovation, and sustainable construction practices.              Explore our portfolio of successful engineering projects that demonstrate 

            </p>              our commitment to excellence, innovation, and sustainable construction practices.

          </div>            </p>

        </div>          </div>

      </section>        </div>

      </section>

      {/* Search and Filter Section */}

      <section className="py-12 bg-white border-b">      {/* Search and Filter Section */}

        <div className="container mx-auto px-4">      <section className="py-12 bg-white border-b">

          <div className="max-w-4xl mx-auto">        <div className="container mx-auto px-4">

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">          <div className="max-w-4xl mx-auto">

              {/* Search */}            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

              <form onSubmit={handleSearch} className="flex-1 max-w-md">              {/* Search */}

                <div className="relative">              <form onSubmit={handleSearch} className="flex-1 max-w-md">

                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />                <div className="relative">

                  <input                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                    type="text"                  <input

                    placeholder="Search projects..."                    type="text"

                    value={searchTerm}                    placeholder="Search projects..."

                    onChange={(e) => setSearchTerm(e.target.value)}                    value={searchTerm}

                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"                    onChange={(e) => setSearchTerm(e.target.value)}

                  />                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                </div>                  />

              </form>                </div>

              </form>

              {/* Category Filter */}

              <div className="flex flex-wrap gap-2">              {/* Category Filter */}

                {categories.map((category) => (              <div className="flex flex-wrap gap-2">

                  <button                {categories.map((category) => (

                    key={category}                  <button

                    onClick={() => setSelectedCategory(category)}                    key={category}

                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${                    onClick={() => setSelectedCategory(category)}

                      selectedCategory === category                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${

                        ? 'bg-blue-600 text-white'                      selectedCategory === category

                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'                        ? 'bg-blue-600 text-white'

                    }`}                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

                  >                    }`}

                    {category === 'all' ? 'All Projects' : category}                  >

                  </button>                    {category === 'all' ? 'All Projects' : category}

                ))}                  </button>

              </div>                ))}

              </div>

              {/* Featured Filter */}

              <button              {/* Featured Filter */}

                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}              <button

                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}

                  showFeaturedOnly                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${

                    ? 'bg-yellow-100 border-yellow-300 text-yellow-700'                  showFeaturedOnly

                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'                    ? 'bg-yellow-100 border-yellow-300 text-yellow-700'

                }`}                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'

              >                }`}

                <Star className={`w-4 h-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />              >

                Featured Only                <Star className={`w-4 h-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />

              </button>                Featured Only

            </div>              </button>

          </div>            </div>

        </div>          </div>

      </section>        </div>

      </section>

      {/* Results Section */}

      <section className="py-12">      {/* Results Section */}

        <div className="container mx-auto px-4">      <section className="py-12">

          <div className="text-center mb-8">        <div className="container mx-auto px-4">

            <p className="text-gray-600">          <div className="text-center mb-8">

              Showing {projects.length} project{projects.length !== 1 ? 's' : ''}            <p className="text-gray-600">

              {selectedCategory !== 'all' && ` in ${selectedCategory}`}              Showing {projects.length} project{projects.length !== 1 ? 's' : ''}

              {showFeaturedOnly && ' (Featured)'}              {selectedCategory !== 'all' && ` in ${selectedCategory}`}

            </p>              {showFeaturedOnly && ' (Featured)'}

          </div>            </p>

          </div>

          {error ? (

            <div className="text-center py-12">          {error ? (

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">            <div className="text-center py-12">

                <p className="text-red-600 mb-4">{error}</p>              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">

                <Button                 <p className="text-red-600 mb-4">{error}</p>

                  onClick={fetchProjects}                <Button 

                  className="bg-red-600 hover:bg-red-700"                  onClick={fetchProjects}

                >                  className="bg-red-600 hover:bg-red-700"

                  Try Again                >

                </Button>                  Try Again

              </div>                </Button>

            </div>              </div>

          ) : projects.length === 0 ? (            </div>

            <div className="text-center py-12">          ) : projects.length === 0 ? (

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">            <div className="text-center py-12">

                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">

                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                <p className="text-gray-600 mb-4">                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>

                  {searchTerm || selectedCategory !== 'all' || showFeaturedOnly                <p className="text-gray-600 mb-4">

                    ? 'Try adjusting your search criteria or filters.'                  {searchTerm || selectedCategory !== 'all' || showFeaturedOnly

                    : 'No projects are available at the moment.'}                    ? 'Try adjusting your search criteria or filters.'

                </p>                    : 'No projects are available at the moment.'}

                {(searchTerm || selectedCategory !== 'all' || showFeaturedOnly) && (                </p>

                  <Button                {(searchTerm || selectedCategory !== 'all' || showFeaturedOnly) && (

                    onClick={() => {                  <Button

                      setSearchTerm('');                    onClick={() => {

                      setSelectedCategory('all');                      setSearchTerm('');

                      setShowFeaturedOnly(false);                      setSelectedCategory('all');

                    }}                      setShowFeaturedOnly(false);

                  >                    }}

                    Clear Filters                  >

                  </Button>                    Clear Filters

                )}                  </Button>

              </div>                )}

            </div>              </div>

          ) : (            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">          ) : (

              {projects.map((project) => (            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div              {projects.map((project) => (

                  key={project.id}                <div

                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"                  key={project.id}

                  onClick={() => setSelectedProject(project)}                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"

                >                  onClick={() => setSelectedProject(project)}

                  <div className="relative h-48 bg-gray-200">                >

                    {project.imageUrl ? (                  <div className="relative h-48 bg-gray-200">

                      <img                    {project.imageUrl ? (

                        src={project.imageUrl}                      <img

                        alt={project.title}                        src={project.imageUrl}

                        className="w-full h-full object-cover"                        alt={project.title}

                        onError={(e) => {                        className="w-full h-full object-cover"

                          // Fallback to placeholder if image fails to load                        onError={(e) => {

                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';                          // Fallback to placeholder if image fails to load

                        }}                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

                      />                        }}

                    ) : (                      />

                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">                    ) : (

                        <Building className="w-16 h-16 text-blue-400" />                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

                      </div>                        <Building className="w-16 h-16 text-blue-400" />

                    )}                      </div>

                    {project.featured && (                    )}

                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">                    {project.featured && (

                        <Star className="w-3 h-3 fill-current" />                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">

                        Featured                        <Star className="w-3 h-3 fill-current" />

                      </div>                        Featured

                    )}                      </div>

                  </div>                    )}

                                    </div>

                  <div className="p-6">                  

                    <div className="flex items-center gap-2 mb-3">                  <div className="p-6">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">                    <div className="flex items-center gap-2 mb-3">

                        {project.category}                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">

                      </span>                        {project.category}

                    </div>                      </span>

                                        </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">                    

                      {project.title}                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">

                    </h3>                      {project.title}

                                        </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">                    

                      {project.description}                    <p className="text-gray-600 mb-4 line-clamp-3">

                    </p>                      {project.description}

                                        </p>

                    <div className="space-y-2 text-sm text-gray-500">                    

                      {project.clientName && (                    <div className="space-y-2 text-sm text-gray-500">

                        <div className="flex items-center gap-2">                      {project.clientName && (

                          <User className="w-4 h-4" />                        <div className="flex items-center gap-2">

                          <span>{project.clientName}</span>                          <User className="w-4 h-4" />

                        </div>                          <span>{project.clientName}</span>

                      )}                        </div>

                      {project.completionDate && (                      )}

                        <div className="flex items-center gap-2">                      {project.completionDate && (

                          <Calendar className="w-4 h-4" />                        <div className="flex items-center gap-2">

                          <span>Completed {formatDate(project.completionDate)}</span>                          <Calendar className="w-4 h-4" />

                        </div>                          <span>Completed {formatDate(project.completionDate)}</span>

                      )}                        </div>

                    </div>                      )}

                  </div>                    </div>

                </div>                  </div>

              ))}                </div>

            </div>              ))}

          )}            </div>

        </div>          )}

      </section>        </div>

      </section>

      {/* Project Detail Modal */}

      {selectedProject && (      {/* Project Detail Modal */}

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">      {selectedProject && (

          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

            <div className="relative">          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

              {selectedProject.imageUrl ? (            <div className="relative">

                <img              {selectedProject.imageUrl ? (

                  src={selectedProject.imageUrl}                <img

                  alt={selectedProject.title}                  src={selectedProject.imageUrl}

                  className="w-full h-64 object-cover"                  alt={selectedProject.title}

                  onError={(e) => {                  className="w-full h-64 object-cover"

                    e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';                  onError={(e) => {

                  }}                    e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

                />                  }}

              ) : (                />

                <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">              ) : (

                  <Building className="w-24 h-24 text-blue-400" />                <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

                </div>                  <Building className="w-24 h-24 text-blue-400" />

              )}                </div>

              <button              )}

                onClick={() => setSelectedProject(null)}              <button

                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors"                onClick={() => setSelectedProject(null)}

              >                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors"

                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">              >

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                </svg>                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />

              </button>                </svg>

            </div>              </button>

                        </div>

            <div className="p-8">            

              <div className="flex items-center gap-2 mb-4">            <div className="p-8">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">              <div className="flex items-center gap-2 mb-4">

                  {selectedProject.category}                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">

                </span>                  {selectedProject.category}

                {selectedProject.featured && (                </span>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">                {selectedProject.featured && (

                    <Star className="w-3 h-3 fill-current" />                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">

                    Featured                    <Star className="w-3 h-3 fill-current" />

                  </span>                    Featured

                )}                  </span>

              </div>                )}

                            </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">              

                {selectedProject.title}              <h2 className="text-3xl font-bold text-gray-900 mb-6">

              </h2>                {selectedProject.title}

                            </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">              

                {selectedProject.clientName && (              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                  <div className="flex items-center gap-3">                {selectedProject.clientName && (

                    <User className="w-5 h-5 text-gray-400" />                  <div className="flex items-center gap-3">

                    <div>                    <User className="w-5 h-5 text-gray-400" />

                      <p className="text-sm text-gray-500">Client</p>                    <div>

                      <p className="font-medium">{selectedProject.clientName}</p>                      <p className="text-sm text-gray-500">Client</p>

                    </div>                      <p className="font-medium">{selectedProject.clientName}</p>

                  </div>                    </div>

                )}                  </div>

                {selectedProject.completionDate && (                )}

                  <div className="flex items-center gap-3">                {selectedProject.completionDate && (

                    <Calendar className="w-5 h-5 text-gray-400" />                  <div className="flex items-center gap-3">

                    <div>                    <Calendar className="w-5 h-5 text-gray-400" />

                      <p className="text-sm text-gray-500">Completion Date</p>                    <div>

                      <p className="font-medium">{formatDate(selectedProject.completionDate)}</p>                      <p className="text-sm text-gray-500">Completion Date</p>

                    </div>                      <p className="font-medium">{formatDate(selectedProject.completionDate)}</p>

                  </div>                    </div>

                )}                  </div>

              </div>                )}

                            </div>

              <div className="prose max-w-none">              

                <h3 className="text-xl font-semibold mb-3">Project Description</h3>              <div className="prose max-w-none">

                <p className="text-gray-600 leading-relaxed mb-6">                <h3 className="text-xl font-semibold mb-3">Project Description</h3>

                  {selectedProject.description}                <p className="text-gray-600 leading-relaxed mb-6">

                </p>                  {selectedProject.description}

              </div>                </p>

                            </div>

              <div className="flex justify-end">              

                <Button              <div className="flex justify-end">

                  onClick={() => setSelectedProject(null)}                <Button

                  variant="outline"                  onClick={() => setSelectedProject(null)}

                >                  variant="outline"

                  Close                >

                </Button>                  Close

              </div>                </Button>

            </div>              </div>

          </div>            </div>

        </div>          </div>

      )}        </div>

    </div>      )}

  );    </div>

};  );

};

export default Projects;
export default Projects;