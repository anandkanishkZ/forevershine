// Test Settings API Endpoints
// Run this after starting the backend server to test the settings functionality

const API_BASE = 'http://localhost:5000/api';

// You'll need to get an admin token first by logging in
const ADMIN_TOKEN = 'your_admin_token_here';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${ADMIN_TOKEN}`
};

// Test functions
async function initializeSettings() {
  try {
    const response = await fetch(`${API_BASE}/settings/initialize`, {
      method: 'POST',
      headers
    });
    const data = await response.json();
    console.log('Initialize settings:', data);
  } catch (error) {
    console.error('Error initializing settings:', error);
  }
}

async function getSettings() {
  try {
    const response = await fetch(`${API_BASE}/settings`, {
      headers
    });
    const data = await response.json();
    console.log('Get settings:', data);
    return data;
  } catch (error) {
    console.error('Error getting settings:', error);
  }
}

async function updateSettings() {
  const settings = {
    company_name: { value: 'Forever Shine Engineering', type: 'TEXT' },
    company_email: { value: 'info@forevershine.com', type: 'TEXT' },
    site_maintenance_mode: { value: false, type: 'BOOLEAN' }
  };

  try {
    const response = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ settings })
    });
    const data = await response.json();
    console.log('Update settings:', data);
  } catch (error) {
    console.error('Error updating settings:', error);
  }
}

async function getSingleSetting(key) {
  try {
    const response = await fetch(`${API_BASE}/settings/${key}`, {
      headers
    });
    const data = await response.json();
    console.log(`Get setting ${key}:`, data);
  } catch (error) {
    console.error(`Error getting setting ${key}:`, error);
  }
}

// Usage:
// 1. Start your backend server
// 2. Get an admin token by logging in via POST /api/auth/login
// 3. Replace ADMIN_TOKEN above with the actual token
// 4. Run these functions in browser console or Node.js

console.log('Settings API Test Functions Loaded');
console.log('Available functions:');
console.log('- initializeSettings()');
console.log('- getSettings()');
console.log('- updateSettings()');
console.log('- getSingleSetting(key)');
console.log('');
console.log('Remember to set ADMIN_TOKEN first!');