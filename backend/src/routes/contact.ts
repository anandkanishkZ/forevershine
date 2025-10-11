import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ApiResponse, ContactSubmissionData } from '../types';
import { body, validationResult } from 'express-validator';

const router = Router();

// Submit contact form (public endpoint)
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req: Request<{}, ApiResponse, ContactSubmissionData>, res: Response<ApiResponse>) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg)
      });
    }

    const submissionData = req.body;
    
    const submission = await prisma.contactSubmission.create({
      data: submissionData
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: submission
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      errors: ['Internal server error']
    });
  }
});

// Get contact submissions (admin only)
router.get('/submissions', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      message: 'Contact submissions retrieved successfully',
      data: submissions
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve submissions',
      errors: ['Internal server error']
    });
  }
});

export default router;