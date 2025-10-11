import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleServices = [
  {
    title: 'Municipality Drawing & Design',
    description: 'Professional architectural drawings and designs that comply with local municipality regulations and standards.',
    features: [
      'Building permit drawings',
      'Construction documentation',
      'Regulatory compliance',
      'Architectural plans',
      'Structural designs',
      'MEP drawings'
    ],
    icon: 'ruler',
    status: 'ACTIVE' as const
  },
  {
    title: '3D Interior Design',
    description: 'Stunning 3D visualizations of interior spaces to help you envision your dream home or office before construction.',
    features: [
      'Photorealistic 3D renderings',
      'Space planning',
      'Material selection',
      'Furniture layout',
      'Lighting design',
      'Color schemes'
    ],
    icon: 'building',
    status: 'ACTIVE' as const
  },
  {
    title: 'Estimation & Costing',
    description: 'Accurate cost estimations for construction projects to help you plan your budget effectively.',
    features: [
      'Detailed cost breakdowns',
      'Material quantity takeoffs',
      'Labor cost estimation',
      'Equipment cost analysis',
      'Budget planning',
      'Value engineering'
    ],
    icon: 'calculator',
    status: 'ACTIVE' as const
  },
  {
    title: 'Civil Surveying',
    description: 'Comprehensive land surveying services to determine property boundaries and topographic features.',
    features: [
      'Boundary surveys',
      'Topographic surveys',
      'Construction staking',
      'ALTA/NSPS surveys',
      'GPS surveying',
      'As-built surveys'
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
      'Quality control and compliance assessment',
      'Material usage verification',
      'Safety protocol adherence monitoring',
      'Post-delivery technical inspections'
    ],
    icon: 'hardhat',
    status: 'ACTIVE' as const
  }
];

const sampleProjects = [
  {
    title: 'Modern Residential Complex - Lagankhel',
    category: 'Residential Building',
    description: 'A state-of-the-art residential complex featuring 24 modern apartments with contemporary design and eco-friendly construction. The project includes basement parking, rooftop garden, and advanced security systems.',
    clientName: 'Himalayan Developers Pvt. Ltd.',
    completionDate: new Date('2023-12-15'),
    imageUrl: '/images/projects/residential-complex-lagankhel.jpg',
    status: 'ACTIVE' as const,
    featured: true
  },
  {
    title: 'Commercial Plaza - New Baneshwor',
    category: 'Commercial Building',
    description: 'Multi-story commercial plaza with retail spaces, office floors, and underground parking. Features modern glass facade, energy-efficient systems, and premium interior finishes.',
    clientName: 'New Baneshwor Traders Association',
    completionDate: new Date('2023-09-30'),
    imageUrl: '/images/projects/commercial-plaza-baneshwor.jpg',
    status: 'ACTIVE' as const,
    featured: true
  },
  {
    title: 'Industrial Warehouse - Bhaktapur',
    category: 'Industrial Project',
    description: 'Large-scale industrial warehouse with advanced logistics facilities, temperature-controlled storage, and modern loading systems. Built with high-quality steel structure and concrete flooring.',
    clientName: 'Bhaktapur Industrial Group',
    completionDate: new Date('2024-01-20'),
    imageUrl: '/images/projects/industrial-warehouse-bhaktapur.jpg',
    status: 'ACTIVE' as const,
    featured: false
  },
  {
    title: 'Highway Bridge Construction',
    category: 'Infrastructure',
    description: 'Construction of a modern concrete bridge over Bagmati River, connecting two major districts. Features earthquake-resistant design and sustainable construction practices.',
    clientName: 'Department of Roads, Government of Nepal',
    completionDate: new Date('2023-11-10'),
    imageUrl: '/images/projects/highway-bridge-bagmati.jpg',
    status: 'ACTIVE' as const,
    featured: true
  },
  {
    title: 'Heritage Building Restoration',
    category: 'Property Valuation',
    description: 'Complete restoration and valuation of a 19th-century heritage building in Patan Durbar Square area. Includes structural assessment, historical preservation, and modern safety upgrades.',
    clientName: 'Patan Heritage Conservation Trust',
    completionDate: new Date('2023-08-25'),
    imageUrl: '/images/projects/heritage-building-patan.jpg',
    status: 'ACTIVE' as const,
    featured: false
  },
  {
    title: 'High-Rise Apartment Complex',
    category: 'Structural Design',
    description: 'Innovative 15-story apartment building with earthquake-resistant design, solar panels, and rainwater harvesting system. Features premium amenities and panoramic city views.',
    clientName: 'Sky View Developers',
    completionDate: new Date('2024-03-15'),
    imageUrl: '/images/projects/high-rise-apartment.jpg',
    status: 'ACTIVE' as const,
    featured: true
  },
  {
    title: 'Community School Building',
    category: 'Other',
    description: 'Modern school building with 20 classrooms, library, computer lab, and playground. Built with child-friendly design principles and sustainable materials.',
    clientName: 'Shree Janata Secondary School',
    completionDate: new Date('2023-07-01'),
    imageUrl: '/images/projects/community-school.jpg',
    status: 'ACTIVE' as const,
    featured: false
  },
  {
    title: 'Medical College Infrastructure',
    category: 'Commercial Building',
    description: 'Complete infrastructure development for medical college including academic buildings, hostels, hospital wing, and research facilities. Features advanced medical equipment installation.',
    clientName: 'Nepal Medical College',
    completionDate: new Date('2024-02-28'),
    imageUrl: '/images/projects/medical-college.jpg',
    status: 'ACTIVE' as const,
    featured: true
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
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
