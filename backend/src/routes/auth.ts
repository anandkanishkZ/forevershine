import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { generateToken } from '../utils/jwt';
import { ApiResponse } from '../types';
import { body, validationResult } from 'express-validator';

const router = Router();

// Login endpoint
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req: Request, res: Response<ApiResponse>) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg)
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        errors: ['Email or password is incorrect']
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        errors: ['Email or password is incorrect']
      });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errors: ['Login failed']
    });
  }
});

// Get current user profile
router.get('/me', async (req: Request, res: Response<ApiResponse>) => {
  try {
    // This would typically use the auth middleware
    // For now, just return a placeholder
    res.json({
      success: true,
      message: 'User profile retrieved',
      data: { message: 'Auth middleware needed' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errors: ['Failed to get user profile']
    });
  }
});

export default router;