import { Router, Response } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import { authenticate, authorize } from '../middleware/authMiddleware';
import os from 'os';
import { prisma } from '../utils/prisma';

const router = Router();

/**
 * Get system information
 * Available to any authenticated user
 */
router.get('/info', authenticate, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    // Get system stats
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(2);

    const cpus = os.cpus();
    const uptime = os.uptime();
    
    // Calculate uptime in days, hours, minutes
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    // Get database stats
    const [
      totalProjects,
      totalServices,
      totalBlogPosts,
      totalTestimonials,
      totalTeamMembers,
      totalContacts,
      totalUsers,
      latestProject,
      latestBlog,
      latestContact,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
      prisma.testimonial.count(),
      prisma.teamMember.count(),
      prisma.contactSubmission.count(),
      prisma.user.count(),
      prisma.project.findFirst({ orderBy: { createdAt: 'desc' } }),
      prisma.blogPost.findFirst({ orderBy: { createdAt: 'desc' } }),
      prisma.contactSubmission.findFirst({ orderBy: { createdAt: 'desc' } }),
    ]);

    const systemInfo = {
      // Server Information
      server: {
        platform: os.platform(),
        type: os.type(),
        release: os.release(),
        hostname: os.hostname(),
        architecture: os.arch(),
        nodeVersion: process.version,
        uptime: {
          total: uptime,
          formatted: `${days}d ${hours}h ${minutes}m`,
          days,
          hours,
          minutes,
        },
      },

      // CPU Information
      cpu: {
        model: cpus[0]?.model || 'Unknown',
        cores: cpus.length,
        speed: cpus[0]?.speed || 0,
      },

      // Memory Information
      memory: {
        total: totalMemory,
        free: freeMemory,
        used: usedMemory,
        totalGB: (totalMemory / 1024 / 1024 / 1024).toFixed(2),
        freeGB: (freeMemory / 1024 / 1024 / 1024).toFixed(2),
        usedGB: (usedMemory / 1024 / 1024 / 1024).toFixed(2),
        usagePercent: parseFloat(memoryUsage),
      },

      // Application Information
      application: {
        version: '2.1.0',
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        databaseType: 'PostgreSQL',
        databaseVersion: '14+',
      },

      // Database Statistics
      database: {
        totalProjects,
        totalServices,
        totalBlogPosts,
        totalTestimonials,
        totalTeamMembers,
        totalContacts,
        totalUsers,
        latestActivity: {
          project: latestProject?.createdAt || null,
          blog: latestBlog?.createdAt || null,
          contact: latestContact?.createdAt || null,
        },
      },

      // Developer Information
      developer: {
        company: 'Zwicky Technology',
        phone: '+977 9825733821',
        email: 'info@zwickytechnology.com',
        website: 'www.zwickytechnology.com',
        supportEmail: 'support@zwickytechnology.com',
      },

      // Timestamps
      serverTime: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    res.json({
      success: true,
      message: 'System information retrieved successfully',
      data: systemInfo,
    });
  } catch (error) {
    console.error('Get system info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve system information',
      errors: ['Internal server error'],
    });
  }
});

/**
 * Get system health status
 */
router.get('/health', async (req, res: Response<ApiResponse>) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: uptime,
      uptimeFormatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      memory: {
        heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
        heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
        rss: (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB',
      },
      database: {
        connected: true,
        type: 'PostgreSQL',
      },
    };

    res.json({
      success: true,
      message: 'System is healthy',
      data: health,
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      success: false,
      message: 'System health check failed',
      data: {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          connected: false,
        },
      },
    });
  }
});

export default router;
