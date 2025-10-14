import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you contact us for services or subscribe to our newsletter.</p>
            
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>
            
            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at info@forevershine.com.np</p>
          </div>
        </div>
      </div>
    </div>
  );
}