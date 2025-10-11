import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@forevershine.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@forevershine.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created:', admin.email);

  // Create services
  const services = [
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
      icon: 'Ruler',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Property Valuation',
      description: 'Expert property valuation services for banking institutions, including hotel, residential, and commercial property assessments.',
      features: [
        'Bank-grade property valuations',
        'Luxury hotel and apartment assessments',
        'Commercial property appraisals',
        'Construction progress valuations',
        'Investment grade property analysis',
        'Comprehensive valuation reports for institutional lending'
      ],
      icon: 'Home',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Site Supervision & Running Bill Verification',
      description: 'Professional construction monitoring and running bill verification services for institutional lenders.',
      features: [
        'Running bill verification for institutional lenders',
        'Construction progress monitoring',
        'Quality control and compliance assessment',
        'Material usage verification',
        'Safety protocol adherence monitoring',
        'Post-delivery technical inspections'
      ],
      icon: 'HardHat',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { title: service.title }
    });
    
    if (!existing) {
      await prisma.service.create({
        data: service
      });
    }
  }

  console.log('✅ Services created');

  // Create projects
  const projects = [
    {
      title: 'Modern Office Complex',
      category: 'Commercial',
      description: 'A state-of-the-art office complex featuring sustainable design elements and modern amenities.',
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      clientName: 'Tech Corp Ltd.',
      featured: true,
      completionDate: new Date('2024-01-15')
    },
    {
      title: 'Luxury Residential Tower',
      category: 'Residential',
      description: 'High-end residential tower with premium finishes and panoramic city views.',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      clientName: 'Prime Developers',
      featured: true,
      completionDate: new Date('2024-03-20')
    }
  ];

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title }
    });
    
    if (!existing) {
      await prisma.project.create({
        data: project
      });
    }
  }

  console.log('✅ Projects created');

  // Create testimonials
  const testimonials = [
    {
      clientName: 'John Smith',
      position: 'CEO',
      company: 'Smith Enterprises',
      content: 'Forever Shine Engineering delivered our office complex project on time and within budget. Their attention to detail and professional approach exceeded our expectations.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      featured: true
    }
  ];

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { clientName: testimonial.clientName }
    });
    
    if (!existing) {
      await prisma.testimonial.create({
        data: testimonial
      });
    }
  }

  console.log('✅ Testimonials created');

  // Create company settings
  const settings = [
    { key: 'company_name', value: 'Forever Shine Engineering', type: 'TEXT' as const, description: 'Company name' },
    { key: 'company_email', value: 'info@forevershine.com', type: 'TEXT' as const, description: 'Main company email' },
    { key: 'company_phone', value: '+977-1-4567890', type: 'TEXT' as const, description: 'Main company phone' },
    { key: 'company_address', value: 'Kathmandu, Nepal', type: 'TEXT' as const, description: 'Company address' },
    { key: 'company_description', value: 'Professional property valuation & engineering consultancy services', type: 'TEXT' as const, description: 'Company description' }
  ];

  for (const setting of settings) {
    await prisma.companySetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting
    });
  }

  console.log('✅ Company settings created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });