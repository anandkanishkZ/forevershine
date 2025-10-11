import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types';

const router = Router();

// Placeholder routes - will be implemented
router.get('/', async (req: Request, res: Response<ApiResponse>) => {
  res.json({ success: true, message: 'Blog routes - To be implemented', data: [] });
});

export default router;