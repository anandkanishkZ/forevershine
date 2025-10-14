import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import serviceRoutes from './routes/services';
import projectRoutes from './routes/projects';
import blogRoutes from './routes/blog';
import teamRoutes from './routes/team';
import testimonialRoutes from './routes/testimonials';
import settingsRoutes from './routes/settings';
import publicSettingsRoutes from './routes/public-settings';
import contactRoutes from './routes/contact';
import uploadRoutes from './routes/upload';
import mediaRoutes from './routes/media';
import profileRoutes from './routes/profile';
import notificationRoutes from './routes/notifications';
import heroSlidesRoutes from './routes/hero-slides';
import systemRoutes from './routes/system';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { apiLimiter } from './middleware/rateLimiter';
import { csrfProtection, csrfErrorHandler } from './middleware/csrfProtection';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'CSRF-Token']
}));

// Cookie parser middleware
app.use(cookieParser());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CSRF Protection - applied to all API routes except GET requests and specific endpoints
app.use('/api/', csrfProtection);

// Apply general API rate limiting to all routes
app.use('/api/', apiLimiter);

// Static files - serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// CSRF token endpoint - must be before other routes
app.get('/api/csrf-token', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      csrfToken: req.csrfToken()
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/public/settings', publicSettingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/hero-slides', heroSlidesRoutes);
app.use('/api/system', systemRoutes);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'Forever Shine Engineering API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(csrfErrorHandler); // Handle CSRF errors first
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`📁 Upload path: ${process.env.UPLOAD_PATH}`);
});