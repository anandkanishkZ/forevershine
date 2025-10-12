import React from 'react';

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2>Use License</h2>
            <p>Permission is granted to temporarily use our services for personal, non-commercial transitory viewing only.</p>
            
            <h2>Service Modifications</h2>
            <p>Forever Shine Engineering reserves the right to modify or discontinue services at any time without prior notice.</p>
            
            <h2>Limitation of Liability</h2>
            <p>In no event shall Forever Shine Engineering be liable for any damages arising out of the use or inability to use our services.</p>
            
            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at info@forevershine.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}