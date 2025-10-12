import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const sampleServices = [
  {
    title: 'Municipality Drawing & Design',
    description: 'Professional architectural and engineering drawings for municipality approvals, including residential, commercial, and industrial projects.',
    features: [
      'Municipality-approved architectural drawings',
      'Structural engineering designs',
      'MEP (Mechanical, Electrical, Plumbing) layouts',
      'Site development plans',
      'Building permit documentation',
      'Code compliance verification'
    ],
    icon: 'drafting-compass',
    status: 'ACTIVE' as const
  },
  {
    title: '3D Interior Design',
    description: 'Advanced 3D modeling and interior design services for residential and commercial spaces with photorealistic visualizations.',
    features: [
      '3D architectural visualization',
      'Interior space planning and design',
      'Material selection and specification',
      'Lighting design solutions',
      'Furniture layout and selection',
      'Virtual reality walkthroughs'
    ],
    icon: 'cube',
    status: 'ACTIVE' as const
  },
  {
    title: 'Estimation & Costing',
    description: 'Accurate project cost estimation and quantity surveying services for construction projects of all scales.',
    features: [
      'Detailed quantity take-offs',
      'Material cost analysis',
      'Labor cost estimation',
      'Bill of quantities (BOQ) preparation',
      'Value engineering services',
      'Cost control and monitoring'
    ],
    icon: 'calculator',
    status: 'ACTIVE' as const
  },
  {
    title: 'Civil Surveying',
    description: 'Comprehensive land surveying and mapping services using advanced GPS and total station technology.',
    features: [
      'Topographic surveying',
      'Boundary demarcation',
      'Construction layout surveying',
      'GPS coordinate mapping',
      'Digital elevation modeling',
      'Survey data processing and CAD mapping'
    ],
    icon: 'map',
    status: 'ACTIVE' as const
  },
  {
    title: 'Property Valuation',
    description: 'Professional property valuation services for banking institutions, including residential, commercial, and hospitality sector assessments.',
    features: [
      'Bank-grade property valuations',
      'Luxury hotel and apartment assessments',
      'Commercial property appraisals',
      'Construction progress valuations',
      'Investment grade property analysis',
      'Comprehensive valuation reports for institutional lending'
    ],
    icon: 'home',
    status: 'ACTIVE' as const
  },
  {
    title: 'Site Supervision & Running Bill Verification',
    description: 'Comprehensive construction monitoring, quality control, and running bill verification services for banking institutions.',
    features: [
      'Running bill verification for institutional lenders',
      'Construction progress monitoring',
      'Quality assurance and control',
      'Material testing and verification',
      'Safety compliance monitoring',
      'Project milestone reporting for financial institutions'
    ],
    icon: 'clipboard-check',
    status: 'ACTIVE' as const
  }
];

const sampleProjects = [
  {
    title: 'Modern Residential Complex - Lagankhel',
    slug: generateSlug('Modern Residential Complex - Lagankhel'),
    category: 'Residential Building',
    description: 'A state-of-the-art residential complex featuring 24 modern apartments with contemporary design and eco-friendly construction.',
    shortDescription: 'Modern 24-unit residential complex with eco-friendly features.',
    clientName: 'Himalayan Developers Pvt. Ltd.',
    location: 'Lagankhel, Lalitpur',
    completionDate: new Date('2023-12-15'),
    startDate: new Date('2022-03-01'),
    budget: 18500000.00,
    projectArea: 12000.75,
    projectType: 'New Construction',
    imageUrl: '/images/projects/residential-complex-lagankhel.jpg',
    galleryImages: ['/images/projects/residential-lagankhel-1.jpg'],
    technologies: ['Reinforced Concrete', 'Smart Security Systems'],
    teamMembers: ['Eng. Amit Shrestha', 'Arch. Sita Maharjan'],
    challenges: ['Urban space constraints', 'Noise control'],
    achievements: ['Green Building Certification', 'Zero safety incidents'],
    metaTitle: 'Modern Residential Complex Lagankhel',
    metaDescription: 'Modern residential complex in Lagankhel with 24 apartments',
    metaKeywords: 'residential, Lagankhel, apartments',
    status: 'ACTIVE' as const,
    featured: true,
    priority: 1
  },
  {
    title: 'Commercial Plaza - New Baneshwor',
    slug: generateSlug('Commercial Plaza - New Baneshwor'),
    category: 'Commercial Building',
    description: '5-story commercial building with modern office spaces, retail outlets, and underground parking facility.',
    clientName: 'Metro Business Center',
    completionDate: new Date('2023-09-30'),
    imageUrl: '/images/projects/commercial-plaza-baneshwor.jpg',
    status: 'ACTIVE' as const,
    featured: false
  },
  {
    title: 'Industrial Warehouse - Bhaktapur',
    slug: generateSlug('Industrial Warehouse - Bhaktapur'),
    category: 'Industrial Project',
    description: 'Large-scale industrial warehouse with advanced loading facilities and climate control systems.',
    clientName: 'Nepal Industrial Corporation',
    completionDate: new Date('2023-06-20'),
    imageUrl: '/images/projects/industrial-warehouse-bhaktapur.jpg',
    status: 'ACTIVE' as const,
    featured: false
  },
  {
    title: 'Highway Bridge Construction',
    slug: generateSlug('Highway Bridge Construction'),
    category: 'Infrastructure',
    description: 'Construction of a modern concrete bridge over Bagmati River with earthquake-resistant design.',
    clientName: 'Department of Roads, Government of Nepal',
    completionDate: new Date('2023-11-10'),
    imageUrl: '/images/projects/highway-bridge-bagmati.jpg',
    status: 'ACTIVE' as const,
    featured: true
  },
  {
    title: 'Heritage Building Restoration',
    slug: generateSlug('Heritage Building Restoration'),
    category: 'Property Valuation',
    description: 'Complete restoration of a 19th-century heritage building with structural assessment.',
    clientName: 'Patan Heritage Conservation Trust',
    completionDate: new Date('2023-08-25'),
    imageUrl: '/images/projects/heritage-building-patan.jpg',
    status: 'ACTIVE' as const,
    featured: false
  }
];

async function main() {
  console.log('🌱 Seeding database with sample data...');

  try {
    // Clear existing data
    await prisma.service.deleteMany();
    await prisma.project.deleteMany();
    console.log('✅ Cleared existing data');

    // Create new services
    for (const service of sampleServices) {
      await prisma.service.create({
        data: service
      });
      console.log(`✅ Created service: ${service.title}`);
    }

    // Create new projects
    for (const project of sampleProjects) {
      await prisma.project.create({
        data: project
      });
      console.log(`✅ Created project: ${project.title}`);
    }

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });