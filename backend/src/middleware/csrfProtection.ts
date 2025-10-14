import csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';

// Create CSRF protection middleware
// Note: csurf is deprecated but still functional. Consider migrating to alternative solutions in the future.
export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// CSRF error handler
export const csrfErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      success: false,
      message: 'Invalid CSRF token',
      errors: ['Form submission validation failed. Please refresh and try again.']
    });
  }
  next(err);
};
