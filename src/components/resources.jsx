import React, { useState } from 'react';

export const HelpCenter = () => {
  const [openSections, setOpenSections] = useState({
    gettingStarted: true,
    accountBilling: false,
    troubleshooting: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Help Center</h1>
          <p className="text-stone-600">Find answers to your questions about ResumeAI</p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-stone-200">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full p-4 pl-12 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Getting Started Section */}
          <div className="mb-8">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('gettingStarted')}
            >
              <h2 className="text-xl font-semibold text-stone-800">Getting Started</h2>
              <svg 
                className={`w-5 h-5 text-amber-600 transform transition-transform ${openSections.gettingStarted ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {openSections.gettingStarted && (
              <div className="mt-4 space-y-4 text-stone-600 pl-2">
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">How do I create a resume with ResumeAI?</h3>
                  <p className="mt-2">Sign up for an account, then click "Create New Resume." Our AI will guide you through the process with prompts to gather your professional information.</p>
                </div>
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">Can I analyze my existing resume?</h3>
                  <p className="mt-2">Yes! Upload your existing resume (PDF or Word format) and our AI will analyze it for improvements, ATS compatibility, and keyword optimization.</p>
                </div>
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">What information do I need to provide?</h3>
                  <p className="mt-2">Our AI will ask for your work experience, education, skills, and accomplishments. The more detail you provide, the better your resume will be.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Account & Billing Section */}
          <div className="mb-8">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('accountBilling')}
            >
              <h2 className="text-xl font-semibold text-stone-800">Account & Billing</h2>
              <svg 
                className={`w-5 h-5 text-amber-600 transform transition-transform ${openSections.accountBilling ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {openSections.accountBilling && (
              <div className="mt-4 space-y-4 text-stone-600 pl-2">
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">How do I reset my password?</h3>
                  <p className="mt-2">Click "Forgot Password" on the login page and follow the instructions sent to your email.</p>
                </div>
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">How do I cancel my subscription?</h3>
                  <p className="mt-2">Go to your Account Settings, click on "Billing," and select "Cancel Subscription."</p>
                </div>
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">What payment methods do you accept?</h3>
                  <p className="mt-2">We accept all major credit cards and PayPal.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Troubleshooting Section */}
          <div className="mb-8">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('troubleshooting')}
            >
              <h2 className="text-xl font-semibold text-stone-800">Troubleshooting</h2>
              <svg 
                className={`w-5 h-5 text-amber-600 transform transition-transform ${openSections.troubleshooting ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {openSections.troubleshooting && (
              <div className="mt-4 space-y-4 text-stone-600 pl-2">
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">My resume isn't formatting correctly. What should I do?</h3>
                  <p className="mt-2">Try using our resume template or contact our support team for assistance.</p>
                </div>
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">The AI suggestions don't match my industry. How can I improve this?</h3>
                  <p className="mt-2">Provide more specific information about your role and industry. Our AI learns from your input.</p>
                </div>
                <div className="p-4 rounded-lg bg-stone-50 border-l-4 border-amber-600">
                  <h3 className="font-medium text-stone-800">I'm having trouble downloading my resume.</h3>
                  <p className="mt-2">Check your internet connection and try again. If the problem persists, contact support.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Contact Support */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-lg font-medium text-amber-800 mb-3">Need More Help?</h3>
            <p className="text-amber-700 mb-4">Contact our support team for personalized assistance.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:support@resumeai.example.com" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">
                Email Support
              </a>
              <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50">
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('information-collection');

  const sections = [
    { id: 'information-collection', title: 'Information Collection' },
    { id: 'information-use', title: 'Information Use' },
    { id: 'data-sharing', title: 'Data Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Privacy Policy</h1>
          <p className="text-stone-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md border border-stone-200">
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`text-sm w-full text-left py-2 px-3 rounded transition-colors ${
                        activeSection === section.id
                          ? 'bg-amber-100 text-amber-700 font-medium'
                          : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:w-3/4 bg-white p-6 md:p-8 rounded-lg shadow-md border border-stone-200">
            {/* Information Collection */}
            {activeSection === 'information-collection' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">Information We Collect</h2>
                <div className="space-y-6 text-stone-600">
                  <p>We collect information you provide directly to us when creating resumes, including:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Personal and contact information (name, email address, phone number)</li>
                    <li>Professional history, education, skills, and certifications</li>
                    <li>Resume content, preferences, and templates</li>
                    <li>Payment information for premium services</li>
                    <li>Communications with our support team</li>
                  </ul>
                  <p>We also automatically collect certain information about your device and usage of our services through cookies and similar technologies.</p>
                </div>
              </div>
            )}

            {/* Information Use */}
            {activeSection === 'information-use' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">How We Use Your Information</h2>
                <div className="space-y-6 text-stone-600">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Create, analyze, and improve your resumes using AI technology</li>
                    <li>Provide personalized recommendations and suggestions</li>
                    <li>Process transactions and send related information</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Send technical notices, updates, security alerts, and support messages</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                    <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                    <li>Personalize and improve our services</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Data Sharing */}
            {activeSection === 'data-sharing' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">Data Sharing and Disclosure</h2>
                <div className="space-y-6 text-stone-600">
                  <p>We may share your information in the following circumstances:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>With service providers who need access to such information to carry out work on our behalf</li>
                    <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
                    <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of ResumeAI or others</li>
                    <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
                    <li>With your consent or at your direction</li>
                  </ul>
                  <p className="font-medium text-amber-600">We do not sell your personal information to third parties.</p>
                </div>
              </div>
            )}

            {/* Data Security */}
            {activeSection === 'data-security' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">Data Security</h2>
                <div className="space-y-6 text-stone-600">
                  <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, strict access controls, and regular security assessments.</p>
                  <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                </div>
              </div>
            )}

            {/* Your Rights */}
            {activeSection === 'your-rights' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">Your Rights</h2>
                <div className="space-y-6 text-stone-600">
                  <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Access and receive a copy of your personal information</li>
                    <li>Rectify inaccurate or incomplete personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Restrict or object to the processing of your personal information</li>
                    <li>Data portability (receiving your data in a structured, commonly used format)</li>
                    <li>Withdraw consent at any time, where we rely on your consent to process your information</li>
                  </ul>
                  <p>To exercise any of these rights, please contact us using the information provided in the "Contact Us" section.</p>
                </div>
              </div>
            )}

            {/* Contact Us */}
            {activeSection === 'contact' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">Contact Us</h2>
                <div className="space-y-6 text-stone-600">
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                  <div className="bg-stone-50 p-6 rounded-lg">
                    <p className="font-medium text-stone-800">ResumeAI</p>
                    <p className="mt-2">Email: privacy@resumeai.example.com</p>
                    <p>Address: 123 AI Drive, Tech City, TC 12345</p>
                  </div>
                  <p>We will respond to your inquiry within 30 days.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'service', title: 'Description of Service' },
    { id: 'account', title: 'Account Registration' },
    { id: 'content', title: 'User Content' },
    { id: 'payments', title: 'Subscription & Payments' },
    { id: 'contact', title: 'Contact Information' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Terms of Service</h1>
          <p className="text-stone-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md border border-stone-200">
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`text-sm w-full text-left py-2 px-3 rounded transition-colors ${
                        activeSection === section.id
                          ? 'bg-amber-100 text-amber-700 font-medium'
                          : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:w-3/4 bg-white p-6 md:p-8 rounded-lg shadow-md border border-stone-200">
            {/* Acceptance of Terms */}
            {activeSection === 'acceptance' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">1. Acceptance of Terms</h2>
                <div className="space-y-6 text-stone-600">
                  <p>By accessing or using ResumeAI ("Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our Service.</p>
                </div>
              </div>
            )}

            {/* Description of Service */}
            {activeSection === 'service' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">2. Description of Service</h2>
                <div className="space-y-6 text-stone-600">
                  <p>ResumeAI provides an AI-powered platform for creating, analyzing, and optimizing resumes. Our Service includes tools for generating resume content, formatting resumes, and providing suggestions for improvement based on industry standards.</p>
                </div>
              </div>
            )}

            {/* Account Registration */}
            {activeSection === 'account' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">3. Account Registration</h2>
                <div className="space-y-6 text-stone-600">
                  <p>To access certain features of our Service, you must create an account. You agree to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Be responsible for all activities that occur under your account</li>
                  </ul>
                </div>
              </div>
            )}

            {/* User Content */}
            {activeSection === 'content' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">4. User Content</h2>
                <div className="space-y-6 text-stone-600">
                  <p>You retain all rights to any content you create, upload, or submit to our Service ("User Content"). By submitting User Content, you grant ResumeAI a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display your User Content solely for the purpose of providing and improving our Service.</p>
                  <p>You are solely responsible for your User Content and the consequences of posting or publishing it. You represent and warrant that you own or have the necessary rights to your User Content and that it does not violate any applicable laws or third-party rights.</p>
                </div>
              </div>
            )}

            {/* Subscription & Payments */}
            {activeSection === 'payments' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">5. Subscription and Payments</h2>
                <div className="space-y-6 text-stone-600">
                  <p>Some features of our Service require payment of fees ("Premium Features"). By selecting Premium Features, you agree to pay the applicable fees as described on our website.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Fees are non-refundable except as required by law or as otherwise stated in our refund policy</li>
                    <li>We may change our fees with 30 days' notice</li>
                    <li>Your subscription will automatically renew at the end of each billing cycle unless you cancel</li>
                    <li>You can cancel your subscription at any time through your account settings</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {activeSection === 'contact' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">12. Contact Information</h2>
                <div className="space-y-6 text-stone-600">
                  <p>If you have any questions about these Terms, please contact us at:</p>
                  <div className="bg-stone-50 p-6 rounded-lg">
                    <p className="font-medium text-stone-800">ResumeAI</p>
                    <p className="mt-2">Email: legal@resumeai.example.com</p>
                    <p>Address: 123 AI Drive, Tech City, TC 12345</p>
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

export const CookiePolicy = () => {
  const [activeSection, setActiveSection] = useState('what-are-cookies');

  const sections = [
    { id: 'what-are-cookies', title: 'What Are Cookies?' },
    { id: 'how-we-use', title: 'How We Use Cookies' },
    { id: 'types', title: 'Types of Cookies' },
    { id: 'third-party', title: 'Third-Party Cookies' },
    { id: 'managing', title: 'Managing Cookies' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Cookie Policy</h1>
          <p className="text-stone-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md border border-stone-200">
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`text-sm w-full text-left py-2 px-3 rounded transition-colors ${
                        activeSection === section.id
                          ? 'bg-amber-100 text-amber-700 font-medium'
                          : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:w-3/4 bg-white p-6 md:p-8 rounded-lg shadow-md border border-stone-200">
            {/* What Are Cookies */}
            {activeSection === 'what-are-cookies' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">1. What Are Cookies?</h2>
                <div className="space-y-6 text-stone-600">
                  <p>Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit websites. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
                  <p>Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.</p>
                </div>
              </div>
            )}

            {/* How We Use Cookies */}
            {activeSection === 'how-we-use' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">2. How We Use Cookies</h2>
                <div className="space-y-6 text-stone-600">
                  <p>We use cookies for several purposes, including:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Authentication: To keep you logged in to your account</li>
                    <li>Preferences: To remember your settings and preferences</li>
                    <li>Security: To protect your account and our Service</li>
                    <li>Analytics: To understand how you use our Service and improve it</li>
                    <li>Advertising: To deliver relevant advertisements</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Types of Cookies */}
            {activeSection === 'types' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">3. Types of Cookies We Use</h2>
                <div className="space-y-6 text-stone-600">
                  <div>
                    <h3 className="font-medium text-stone-800 mb-2">Essential Cookies</h3>
                    <p>These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800 mb-2">Performance and Analytics Cookies</h3>
                    <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800 mb-2">Functionality Cookies</h3>
                    <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800 mb-2">Targeting Cookies</h3>
                    <p>These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Third-Party Cookies */}
            {activeSection === 'third-party' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">4. Third-Party Cookies</h2>
                <div className="space-y-6 text-stone-600">
                  <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.</p>
                  <p>Some of the third-party services we use include:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Google Analytics: To understand how visitors interact with our website</li>
                    <li>Google Ads: To deliver relevant advertisements</li>
                    <li>Facebook Pixel: To measure, optimize, and build audiences for advertising campaigns</li>
                    <li>Hotjar: To understand user behavior and improve user experience</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Managing Cookies */}
            {activeSection === 'managing' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">5. Managing Cookies</h2>
                <div className="space-y-6 text-stone-600">
                  <p>You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.</p>
                  
                  <div>
                    <h3 className="font-medium text-stone-800 mb-2">Browser Controls</h3>
                    <p>Most browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-stone-800 mb-2">Opt-Out Tools</h3>
                    <p>Various third parties provide opt-out tools to help you manage your cookie preferences for advertising cookies:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Digital Advertising Alliance's opt-out tool: http://optout.aboutads.info/</li>
                      <li>Network Advertising Initiative's opt-out tool: http://optout.networkadvertising.org/</li>
                      <li>European Interactive Digital Advertising Alliance's opt-out tool: http://www.youronlinechoices.eu/</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Us */}
            {activeSection === 'contact' && (
              <div>
                <h2 className="text-2xl font-semibold text-stone-800 mb-6 border-b pb-3">7. Contact Us</h2>
                <div className="space-y-6 text-stone-600">
                  <p>If you have any questions about our use of cookies, please contact us at:</p>
                  <div className="bg-stone-50 p-6 rounded-lg">
                    <p className="font-medium text-stone-800">ResumeAI</p>
                    <p className="mt-2">Email: privacy@resumeai.example.com</p>
                    <p>Address: 123 AI Drive, Tech City, TC 12345</p>
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