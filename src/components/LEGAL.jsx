import React, { useState } from 'react';

const LegalPages = () => {
  const [activePage, setActivePage] = useState('help-center');

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">ResumeAI Support & Legal</h1>
          <p className="text-stone-600">Find answers to your questions and learn about our policies</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation */}
          <div className="md:w-1/4">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActivePage('help-center')}
                    className={`text-sm w-full text-left py-2 px-3 rounded transition-colors ${
                      activePage === 'help-center'
                        ? 'bg-amber-100 text-amber-700 font-medium'
                        : 'text-stone-600 hover:text-amber-700 hover:bg-stone-100'
                    }`}
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('privacy')}
                    className={`text-sm w-full text-left py-2 px-3 rounded transition-colors ${
                      activePage === 'privacy'
                        ? 'bg-amber-100 text-amber-700 font-medium'
                        : 'text-stone-600 hover:text-amber-700 hover:bg-stone-100'
                    }`}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('terms')}
                    className={`text-sm w-full text-left py-2 px-3 rounded transition-colors ${
                      activePage === 'terms'
                        ? 'bg-amber-100 text-amber-700 font-medium'
                        : 'text-stone-600 hover:text-amber-700 hover:bg-stone-100'
                    }`}
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('cookie')}
                    className={`text-sm w-full text-left py-2 px-3 rounded transition-colors ${
                      activePage === 'cookie'
                        ? 'bg-amber-100 text-amber-700 font-medium'
                        : 'text-stone-600 hover:text-amber-700 hover:bg-stone-100'
                    }`}
                  >
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-sm border border-stone-200">
            {/* Help Center */}
            {activePage === 'help-center' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 mb-6">Help Center</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-stone-800 mb-4">Getting Started with ResumeAI</h3>
                  <div className="space-y-4 text-stone-600">
                    <p><strong>How do I create a resume with ResumeAI?</strong></p>
                    <p>Simply sign up for an account, then click "Create New Resume." Our AI will guide you through the process with prompts to gather your professional information.</p>
                    
                    <p><strong>Can I analyze my existing resume?</strong></p>
                    <p>Yes! Upload your existing resume (PDF or Word format) and our AI will analyze it for improvements, ATS compatibility, and keyword optimization.</p>
                    
                    <p><strong>What information do I need to provide?</strong></p>
                    <p>Our AI will ask for your work experience, education, skills, and accomplishments. The more detail you provide, the better your resume will be.</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-stone-800 mb-4">Account & Billing</h3>
                  <div className="space-y-4 text-stone-600">
                    <p><strong>How do I reset my password?</strong></p>
                    <p>Click "Forgot Password" on the login page and follow the instructions sent to your email.</p>
                    
                    <p><strong>How do I cancel my subscription?</strong></p>
                    <p>Go to your Account Settings, click on "Billing," and select "Cancel Subscription."</p>
                    
                    <p><strong>What payment methods do you accept?</strong></p>
                    <p>We accept all major credit cards and PayPal.</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-stone-800 mb-4">Troubleshooting</h3>
                  <div className="space-y-4 text-stone-600">
                    <p><strong>My resume isn't formatting correctly. What should I do?</strong></p>
                    <p>Try using our resume template or contact our support team for assistance.</p>
                    
                    <p><strong>The AI suggestions don't match my industry. How can I improve this?</strong></p>
                    <p>Provide more specific information about your role and industry. Our AI learns from your input.</p>
                    
                    <p><strong>I'm having trouble downloading my resume.</strong></p>
                    <p>Check your internet connection and try again. If the problem persists, contact support.</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="text-lg font-medium text-amber-800 mb-2">Need More Help?</h3>
                  <p className="text-amber-700">Contact our support team at support@resumeai.example.com or use the chat feature in the bottom right corner of the screen.</p>
                </div>
              </div>
            )}

            {/* Privacy Policy */}
            {activePage === 'privacy' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 mb-6">Privacy Policy</h2>
                <p className="text-stone-500 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <div className="space-y-6 text-stone-600">
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">1. Information We Collect</h3>
                    <p>We collect information you provide directly to us when creating resumes, including:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Personal and contact information</li>
                      <li>Professional history, education, and skills</li>
                      <li>Resume content and preferences</li>
                      <li>Payment information for premium services</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">2. How We Use Your Information</h3>
                    <p>We use your information to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Create, analyze, and improve your resumes</li>
                      <li>Provide personalized recommendations</li>
                      <li>Process transactions and send related information</li>
                      <li>Respond to your comments and questions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">3. Data Security</h3>
                    <p>We implement security measures designed to protect your information, including encryption of sensitive data and regular security assessments.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">4. Your Rights</h3>
                    <p>You can access, correct, or delete your personal information at any time through your account settings. You may also request a copy of your data or ask us to restrict processing.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">5. Contact Us</h3>
                    <p>If you have questions about this Privacy Policy, please contact us at privacy@resumeai.example.com.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms of Service */}
            {activePage === 'terms' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 mb-6">Terms of Service</h2>
                <p className="text-stone-500 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <div className="space-y-6 text-stone-600">
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">1. Acceptance of Terms</h3>
                    <p>By accessing or using ResumeAI, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">2. Account Registration</h3>
                    <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">3. Services</h3>
                    <p>ResumeAI provides AI-powered resume creation and analysis tools. While we strive for accuracy, we cannot guarantee specific results from using our services.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">4. User Content</h3>
                    <p>You retain ownership of the content you create with ResumeAI. By using our services, you grant us a license to use your content to provide and improve our services.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">5. Subscription and Payments</h3>
                    <p>Premium features require payment. Fees are non-refundable except as required by law. We may change our fees with 30 days' notice.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">6. Limitation of Liability</h3>
                    <p>ResumeAI is not liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Cookie Policy */}
            {activePage === 'cookie' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 mb-6">Cookie Policy</h2>
                <p className="text-stone-500 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <div className="space-y-6 text-stone-600">
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">1. What Are Cookies?</h3>
                    <p>Cookies are small text files stored on your device when you visit websites. They help websites remember information about your visit.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">2. How We Use Cookies</h3>
                    <p>We use cookies to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Keep you signed in to your account</li>
                      <li>Remember your preferences and settings</li>
                      <li>Understand how you use our services</li>
                      <li>Provide personalized features</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">3. Types of Cookies We Use</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                      <li><strong>Preference Cookies:</strong> Remember your choices</li>
                      <li><strong>Analytics Cookies:</strong> Help us improve our services</li>
                      <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 mb-2">4. Managing Cookies</h3>
                    <p>You can control cookies through your browser settings. Note that disabling cookies may affect your experience with our services.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer component with links to legal pages
// const Footer = () => {
//   return (
//     <footer className="bg-stone-100 mt-20">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">ResumeAI</h4>
//             <p className="text-stone-600">Creating professional resumes with AI-powered tools and analysis.</p>
//           </div>
          
//           <div>
//             <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Resources</h4>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Resume Templates</a></li>
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Career Advice</a></li>
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Blog</a></li>
//             </ul>
//           </div>
          
//           <div>
//             <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Support</h4>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Help Center</a></li>
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Contact Us</a></li>
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">FAQ</a></li>
//             </ul>
//           </div>
          
//           <div>
//             <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Legal</h4>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Privacy</a></li>
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Terms</a></li>
//               <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Cookie Policy</a></li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-stone-500 text-sm">
//             © {new Date().getFullYear()} ResumeAI. All rights reserved.
//           </p>
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <a href="#" className="text-stone-500 hover:text-stone-700 text-sm">Privacy Policy</a>
//             <a href="#" className="text-stone-500 hover:text-stone-700 text-sm">Terms of Service</a>
//             <a href="#" className="text-stone-500 hover:text-stone-700 text-sm">Sitemap</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };