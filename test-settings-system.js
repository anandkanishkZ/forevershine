// Test Script for Dynamic Settings System
// Run this after starting both backend and frontend servers

const API_BASE = 'http://localhost:5000/api';

async function testSettingsSystem() {
  console.log('🚀 Testing Dynamic Settings System...\n');
  
  try {
    // Test 1: Check if public settings API is working
    console.log('1️⃣ Testing Public Settings API...');
    const publicResponse = await fetch(`${API_BASE}/public/settings`);
    
    if (publicResponse.ok) {
      const publicData = await publicResponse.json();
      console.log('✅ Public API Working!');
      console.log('📊 Available Public Settings:', Object.keys(publicData.data || {}).length);
      
      // Show current company name and tagline
      const settings = publicData.data || {};
      console.log('🏢 Current Company Name:', settings.company_name || 'Not set');
      console.log('💫 Current Tagline:', settings.company_tagline || 'Not set');
    } else {
      console.log('❌ Public API Failed:', publicResponse.status);
    }

    console.log('\n2️⃣ Testing Specific Setting Fetch...');
    const nameResponse = await fetch(`${API_BASE}/public/settings/company_name`);
    
    if (nameResponse.ok) {
      const nameData = await nameResponse.json();
      console.log('✅ Specific Setting API Working!');
      console.log('🏢 Company Name via API:', nameData.data?.value || 'Not set');
    } else {
      console.log('❌ Specific Setting API Failed:', nameResponse.status);
    }

    console.log('\n3️⃣ Testing SEO Settings...');
    const seoSettings = ['seo_meta_title', 'seo_meta_description', 'site_favicon'];
    
    for (const setting of seoSettings) {
      const response = await fetch(`${API_BASE}/public/settings/${setting}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${setting}:`, data.data?.value || 'Not set');
      } else {
        console.log(`❌ ${setting}: Failed to fetch`);
      }
    }

    console.log('\n4️⃣ Testing New SEO Fields...');
    const newSeoFields = ['seo_google_image', 'seo_twitter_card_image', 'site_logo', 'site_logo_dark'];
    
    for (const field of newSeoFields) {
      const response = await fetch(`${API_BASE}/public/settings/${field}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${field}:`, data.data?.value || 'Not set');
      } else {
        console.log(`❌ ${field}: Not available`);
      }
    }

    console.log('\n🎯 TESTING COMPLETE!');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Go to http://localhost:3000/admin/settings');
    console.log('2. Click "Initialize Default Settings" if settings are empty');
    console.log('3. Update Company Name and Tagline in Company Info tab');
    console.log('4. Check homepage at http://localhost:3000 for instant changes!');
    console.log('5. Update SEO settings in SEO & Branding tab');
    console.log('6. View page source to see dynamic metadata');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    console.log('\n🔧 TROUBLESHOOTING:');
    console.log('1. Make sure backend is running on port 5000');
    console.log('2. Make sure database is connected and migrations are run');
    console.log('3. Check if settings table exists in database');
  }
}

// Run the test
testSettingsSystem();