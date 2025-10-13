# Settings Management Guide

## Overview
The Admin Settings page provides comprehensive configuration management for the Forever Shine website. It includes multiple categories of settings that control various aspects of the site's behavior and appearance.

## Categories

### 1. Company Information
- **Company Name**: Main business name displayed across the website
- **Tagline**: Company slogan or tagline  
- **Description**: Brief company description for SEO and marketing
- **Address**: Physical business address for contact information
- **Phone**: Primary contact phone number
- **Email**: Primary business email address
- **Website**: Company website URL

### 2. Social Media
Configure social media profile links that appear throughout the website:
- Facebook
- Twitter/X
- LinkedIn
- Instagram 
- YouTube

### 3. SEO Settings
Default search engine optimization settings:
- **Meta Title**: Default page title template
- **Meta Description**: Default page description
- **Keywords**: Default SEO keywords
- **Open Graph Image**: Default social sharing image

### 4. Site Features  
Control website functionality:
- **Maintenance Mode**: Put site in maintenance mode
- **Allow Registrations**: Enable/disable new user registrations
- **Blog Comments**: Enable/disable blog post comments
- **Contact Form Email**: Email address for contact form submissions

### 5. Business Hours
Configure operating hours for each day of the week. Supports:
- Opening and closing times
- Closed days
- Different hours per day

### 6. Email Notifications
Control automated email notifications:
- **Email Notifications**: Master toggle for all email notifications
- **Contact Form Notifications**: Notifications for contact form submissions

### 7. Analytics & Tracking
Integration with analytics platforms:
- **Google Analytics ID**: GA tracking ID
- **Google Tag Manager**: GTM container ID  
- **Facebook Pixel**: Facebook Pixel ID for conversion tracking

## Usage

### Initial Setup
1. Click "Initialize Defaults" to create all default settings
2. Navigate through each category and configure as needed
3. Click "Save Settings" to apply changes

### Managing Settings
- Settings are organized by category in the left sidebar
- Each setting includes a description explaining its purpose
- Boolean settings use checkboxes for easy toggling
- Password/secret fields are masked for security
- URL fields include external link buttons for testing

### Business Hours Editor
The business hours editor provides a visual interface for:
- Setting different hours for each day
- Marking days as closed
- Configuring opening and closing times

### Data Types
Settings support multiple data types:
- **TEXT**: String values like names, URLs, descriptions
- **NUMBER**: Numeric values  
- **BOOLEAN**: True/false toggles
- **JSON**: Complex structured data (like business hours)

## API Integration
Settings are stored in the database and accessible via REST API:
- `GET /api/settings` - Retrieve all settings
- `PUT /api/settings` - Update multiple settings
- `GET /api/settings/:key` - Get specific setting
- `DELETE /api/settings/:key` - Delete setting (Super Admin only)
- `POST /api/settings/initialize` - Initialize default settings

## Security
- Settings management requires Admin or Super Admin privileges
- Sensitive settings are masked in the UI
- Only Super Admins can delete settings
- All changes are logged and tracked

## Best Practices
1. **Backup**: Always backup settings before major changes
2. **Testing**: Test settings on staging before production
3. **Documentation**: Document custom settings and their purposes
4. **Validation**: Validate URLs and email addresses before saving
5. **Security**: Use secure values for API keys and secrets

## Troubleshooting

### Settings Not Saving
- Check network connection
- Verify admin permissions
- Check browser console for errors

### Missing Settings
- Click "Initialize Defaults" to create missing settings
- Check database connectivity
- Verify settings route is properly configured

### Business Hours Not Displaying
- Ensure business_hours setting is properly formatted JSON
- Check for timezone consistency
- Validate opening/closing time formats

## Development

### Adding New Settings
1. Add setting definition to initialization in backend
2. Add to appropriate category in frontend
3. Update TypeScript interfaces if needed
4. Test data validation and saving

### Custom Setting Types
Settings support custom validation and formatting:
- Extend the SettingType enum in Prisma schema
- Add handling in backend routes
- Implement UI components in frontend

## Support
For technical support or questions about settings management, contact the development team or refer to the project documentation.