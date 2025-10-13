import { Router, Response } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Mock notification data (in a real app, this would come from a database)
let notifications = [
  {
    id: '1',
    title: 'Welcome to Dashboard',
    message: 'Your admin dashboard is ready to use. Start managing your website content.',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    actionUrl: '/admin/dashboard',
    actionLabel: 'Go to Dashboard'
  },
  {
    id: '2',
    title: 'New Contact Message',
    message: 'You have received a new message from the contact form.',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    actionUrl: '/admin/contact-messages',
    actionLabel: 'View Messages'
  },
  {
    id: '3',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated.',
    type: 'success',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'System Backup',
    message: 'Daily system backup completed successfully.',
    type: 'success',
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Get all notifications
router.get('/', authenticate, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { page = '1', limit = '20', unread } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    
    let filteredNotifications = [...notifications];
    
    // Filter by unread if specified
    if (unread === 'true') {
      filteredNotifications = notifications.filter(n => !n.isRead);
    }
    
    // Sort by creation date (newest first)
    filteredNotifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      message: 'Notifications retrieved successfully',
      data: paginatedNotifications,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredNotifications.length,
        totalPages: Math.ceil(filteredNotifications.length / limitNum)
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get notifications',
      errors: ['Internal server error']
    });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticate, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    
    const notificationIndex = notifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
        errors: ['Notification does not exist']
      });
    }
    
    notifications[notificationIndex].isRead = true;
    
    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notifications[notificationIndex]
    });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      errors: ['Internal server error']
    });
  }
});

// Mark all notifications as read
router.patch('/mark-all-read', authenticate, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    notifications = notifications.map(n => ({ ...n, isRead: true }));
    
    res.json({
      success: true,
      message: 'All notifications marked as read',
      data: { updatedCount: notifications.length }
    });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read',
      errors: ['Internal server error']
    });
  }
});

// Delete notification
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    
    const notificationIndex = notifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
        errors: ['Notification does not exist']
      });
    }
    
    const deletedNotification = notifications.splice(notificationIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Notification deleted successfully',
      data: deletedNotification
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      errors: ['Internal server error']
    });
  }
});

// Create new notification (admin only)
router.post('/', authenticate, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { title, message, type = 'info', actionUrl, actionLabel } = req.body;
    
    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Title and message are required',
        errors: ['Missing required fields']
      });
    }
    
    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl,
      actionLabel
    };
    
    notifications.unshift(newNotification);
    
    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: newNotification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      errors: ['Internal server error']
    });
  }
});

// Get unread count
router.get('/count/unread', authenticate, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    
    res.json({
      success: true,
      message: 'Unread count retrieved successfully',
      data: { count: unreadCount }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get unread count',
      errors: ['Internal server error']
    });
  }
});

export default router;