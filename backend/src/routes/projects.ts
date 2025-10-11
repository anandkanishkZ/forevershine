import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ApiResponse, ProjectData, PaginationQuery } from '../types';
import { body, validationResult } from 'express-validator';

const router = Router();

// Get all projects (public endpoint)
router.get('/', async (req: Request<{}, ApiResponse, {}, PaginationQuery>, res: Response<ApiResponse>) => {
  try {
    const { page = '1', limit = '10', search, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.project.count({ where })
    ]);

    res.json({
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects',
      errors: ['Internal server error']
    });
  }
});

// Get single project by ID
router.get('/:id', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        errors: ['Project with this ID does not exist']
      });
    }

    res.json({
      success: true,
      message: 'Project retrieved successfully',
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project',
      errors: ['Internal server error']
    });
  }
});

// Create new project (admin only)
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req: Request<{}, ApiResponse, ProjectData>, res: Response<ApiResponse>) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg)
      });
    }

    const projectData = req.body;
    
    const project = await prisma.project.create({
      data: {
        ...projectData,
        completionDate: projectData.completionDate ? new Date(projectData.completionDate) : null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      errors: ['Internal server error']
    });
  }
});

export default router;