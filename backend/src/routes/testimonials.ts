import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types';

const router = Router();

router.get('/', async (req: Request, res: Response<ApiResponse>) => {
  res.json({ success: true, message: 'Testimonials routes - To be implemented', data: [] });
});

export default router;