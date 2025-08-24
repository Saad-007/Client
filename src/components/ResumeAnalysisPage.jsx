// ResumeAnalysisPage.jsx
import { useState, useEffect } from 'react';
import { FiUpload, FiBarChart2, FiCheck, FiX, FiEdit2, FiDownload, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




  // Mock analysis data for initial state
  const defaultAnalysisData = {
    overallScore: 0,
    categories: [
      { name: "ATS Compatibility", score: 0, feedback: "Upload your resume to get started" },
      { name: "Content Structure", score: 0, feedback: "We'll analyze your resume structure" },
      { name: "Design Impact", score: 0, feedback: "Visual presentation matters" },
      { name: "Skills Presentation", score: 0, feedback: "We'll evaluate your skills section" }
    ],
    suggestions: [
      "Upload your resume and optionally a job description for personalized feedback"
    ],
    jobTitleMatch: null,
    keywordMatches: []
  };

const ResumeAnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
const [analysis, setAnalysis] = useState(defaultAnalysisData);
  const [jobDescription, setJobDescription] = useState('');


const getResumeFeedback = async (resumeText) => {
  const res = await fetch("http://localhost:5000/api/resume/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText }),
  });

  const data = await res.json();
  console.log("Resume Feedback:", data);
}
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type and size
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, DOCX, or TXT file');
        return;
      }
      
      if (selectedFile.size > maxSize) {
        setError('File size must be less than 5MB');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

// Updated analyzeResume function with proper error handling and endpoint
const analyzeResume = async () => {
  console.log('Analyze button clicked');
  if (!file) {
    setError('Please select a file first');
    return;
  }

  setIsLoading(true);
  setError(null);

    try {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await axios.post(`${API_BASE_URL}/api/resume/feedback`, formData);

    // Ensure response has required fields
    if (!response.data?.data) {
      throw new Error('Invalid response structure');
    }

    const backendData = response.data.data;

    // Transform backend data to match your frontend state
    const analysisResult = {
      overallScore: backendData.overallScore || 0,
      categories: backendData.categories || [{
        name: "General Assessment",
        score: backendData.overallScore || 0,
        feedback: "See suggestions below"
      }],
      suggestions: backendData.suggestions || [],
      jobTitleMatch: backendData.jobTitleMatch || null,
      keywordMatches: backendData.keywordMatches || []
    };

    setAnalysis(analysisResult);
  } catch (err) {
    console.error('Analysis error:', err);
    const errorMessage = err.response?.data?.error || 
                        err.message || 
                        'Failed to analyze resume. Please try again.';
    setError(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
const downloadReport = async () => {
  try {
    if (!analysis || analysis.overallScore === 0) {
      alert('Please analyze a resume first to generate a report');
      return;
    }

    // Show loading state
    const downloadBtn = document.querySelector('button:has(svg)');
    const originalHTML = downloadBtn?.innerHTML;
    if (downloadBtn) {
      downloadBtn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div> Generating...';
      downloadBtn.disabled = true;
    }

    // Create PDF HTML with inline styles that mimic Tailwind
    const pdfHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          /* Tailwind-like styles */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            background: #ffffff;
            padding: 0;
            margin: 0;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }
          
          /* Header styles matching your site */
          .header {
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            color: white;
            padding: 15px 10px;
            border-radius: 16px;
            text-align: center;
            margin-bottom: 2px;
          }
          
          .header h1 {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 2px;
          }
          
          .score {
            font-size: 30px;
            font-weight: 700;
            color: #d97706;
            margin: 10px 0;
          }
          
          /* Grid layout */
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
          }
          
          /* Card styles */
          .card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .card-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
          }
          
          .score-badge {
            background: #d97706;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
          }
          
          /* Progress bar */
          .progress {
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            margin-top: 12px;
            overflow: hidden;
          }
          
          .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #d97706, #f59e0b);
            border-radius: 4px;
          }
          
          /* Suggestions list */
          .suggestions {
            margin-top: 40px;
          }
          
          .suggestion-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            padding: 16px;
            background: #fffbeb;
            border-radius: 8px;
            border-left: 4px solid #d97706;
          }
          
          .suggestion-bullet {
            color: #d97706;
            font-weight: 700;
            margin-right: 12px;
            min-width: 20px;
          }
          
          /* Keywords */
          .keywords {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
          }
          
          .keyword {
            background: #e5e7eb;
            color: #374151;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
          }
          
          .keyword-high {
            background: #dcfce7;
            color: #166534;
          }
          
          .keyword-medium {
            background: #fef3c7;
            color: #78350f;
          }
          
          /* Section titles */
          .section-title {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 24px;
            padding-bottom: 12px;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .section-Title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 5px;
            padding-bottom: 12px;
          }
          
          /* Footer */
          .footer {
            margin-top: 60px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>Resume Analysis Report</h1>
            <div class="score">${analysis.overallScore}/100</div>
            <p style="color: #d1d5db; font-size: 16px;">
              Generated on ${new Date().toLocaleDateString()}
              ${file ? `• ${file.name}` : ''}
            </p>
          </div>

          <!-- Overall Score -->
          <div style="margin-bottom: 10px;">
            <h2 class="section-title">Overall Assessment</h2>
         
            <p style="font-size: 16px; color: #6b7280;">
              Your resume scored <strong style="color: #1f2937;">${analysis.overallScore}/100</strong>. 
              ${analysis.overallScore >= 80 ? 
                'Excellent! Your resume is highly competitive.' :
                analysis.overallScore >= 60 ?
                'Good foundation with room for improvement.' :
                'Needs significant improvements to be competitive.'
              }
            </p>
                  ${analysis.jobTitleMatch ? `
            <div style="margin-top: 2px;">
              <h2 class="section-Title">Recommended Role</h2>
                <p style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0;">
                  ${analysis.jobTitleMatch}
                </p>
            </div>
          ` : ''}
          </div>

          <!-- Category Analysis -->
          <div style="margin-bottom: 20px;">
            <h2 class="section-title">Detailed Analysis</h2>
                <!-- Job Match -->
       
            <div class="grid">
              ${analysis.categories.map(cat => {
                const scorePercent = (cat.score / 10) * 100;
                return `
                  <div class="card">
                    <div class="card-header">
                      <span class="card-title">${cat.name}</span>
                      <span class="score-badge">${cat.score}/10</span>
                    </div>
                    <p style="color: #6b7280; line-height: 1.5;">${cat.feedback}</p>
                   
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Actionable Suggestions -->
          <div class="suggestions">
            <h2 class="section-title">Actionable Suggestions</h2>
            ${analysis.suggestions.map((sug, index) => `
              <div class="suggestion-item">
                <span class="suggestion-bullet">${index + 1}.</span>
                <span style="color: #78350f; line-height: 1.5;">${sug}</span>
              </div>
            `).join('')}
          </div>

          <!-- Keyword Analysis -->
          ${analysis.keywordMatches && analysis.keywordMatches.length > 0 ? `
            <div style="margin-top: 40px;">
              <h2 class="section-title">Keyword Analysis</h2>
              <p style="color: #6b7280; margin-bottom: 16px;">Keywords found in your resume:</p>
              <div class="keywords">
                ${analysis.keywordMatches.map(kw => `
                  <span class="keyword keyword-${kw.importance}">
                    ${kw.keyword} (${kw.count}x)
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}


          <!-- Footer -->
          <div class="footer">
            <p>Generated by ResumeAI • ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send to backend
    const response = await fetch(`${API_BASE_URL}/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: pdfHtml,
        fileName: `Resume_Analysis_${new Date().toISOString().split('T')[0]}`,
        resumeData: {
          name: file ? file.name.replace(/\.[^/.]+$/, "") : 'Resume',
          analyzedDate: new Date().toISOString()
        }
      }),
    });

    if (!response.ok) throw new Error('Failed to generate PDF');

    // Download PDF
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resume_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to generate PDF: ' + error.message);
  } finally {
    // Reset button
    const downloadBtn = document.querySelector('button:has(svg)');
    if (downloadBtn) {
      downloadBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg> Download PDF Report';
      downloadBtn.disabled = false;
    }
  }
};
 const getScoreColor = (score) => {
  // Convert 0-10 score to 0-100 for color calculation
  const percentage = score * 10;
  if (percentage >= 80) return "bg-green-100 text-green-800";
  if (percentage >= 60) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

  return (
    <div className="bg-stone-50 min-h-screen antialiased">
     

      {/* ===== Main Content ===== */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Upload Section */}
        <section className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-6">AI Resume Analysis</h2>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed">
              Get instant feedback on your resume's strengths and weaknesses from our advanced AI system.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-dashed border-stone-300 rounded-2xl p-12 cursor-pointer hover:border-amber-400 transition-colors bg-white"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center">
                <FiUpload className="text-4xl text-amber-600 mb-4" />
                {file ? (
                  <>
                    <p className="font-medium text-stone-800 text-lg mb-2">{file.name}</p>
                    <p className="text-stone-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button 
                      onClick={() => setFile(null)}
                      className="mt-6 bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Change File
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-stone-800 text-lg mb-2">Drag & Drop Your Resume Here</p>
                    <p className="text-stone-500">PDF, DOCX, or TXT (Max 5MB)</p>
                    <label className="mt-6 bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
                      Select File
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.txt"
                      />
                    </label>
                  </>
                )}
              </div>
            </motion.div>

            {/* Job Description Input */}
            <div className="mt-8 max-w-2xl mx-auto">
              <label htmlFor="jobDescription" className="block text-left text-stone-700 mb-2">
                Optional: Paste job description for targeted analysis
              </label>
              <textarea
                id="jobDescription"
                rows={4}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Paste the job description here to get more targeted feedback..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={analyzeResume}
              disabled={!file || isLoading}
              className={`mt-8 px-8 py-4 rounded-xl font-bold text-lg ${file && !isLoading ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-lg' : 'bg-stone-300 cursor-not-allowed'} transition-all`}
            >
              {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-stone-100 rounded-full px-4 py-2">
                <FiCheck className="text-amber-600 mr-2" />
                <span className="text-sm">Free analysis</span>
              </div>
              <div className="flex items-center bg-stone-100 rounded-full px-4 py-2">
                <FiCheck className="text-amber-600 mr-2" />
                <span className="text-sm">No account required</span>
              </div>
              <div className="flex items-center bg-stone-100 rounded-full px-4 py-2">
                <FiCheck className="text-amber-600 mr-2" />
                <span className="text-sm">Instant results</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Analysis Results Section - Only show if we have data */}
        {analysis.overallScore > 0 && (
          <section id="analysis-results" className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden mb-24">
            {/* Results Header */}
            <div className="bg-stone-900 text-white p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-2xl font-medium mb-2">Analysis Results</h3>
                  <p className="text-stone-300">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
              
                  <button 
                    onClick={downloadReport}
                    className="flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-800 px-6 py-3 rounded-lg font-medium transition-colors border border-stone-300"
                  >
                    <FiDownload /> Download PDF Report
                  </button>
                </div>
              </div>
            </div>

            {/* Score Overview */}
            <div className="p-8 border-b border-stone-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3"
                      strokeDasharray={`${analysis.overallScore}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-stone-800">{analysis.overallScore}</span>
                    <span className="text-stone-500">out of 100</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-medium text-stone-800 mb-4">Overall Resume Score</h4>
                  <p className="text-stone-600 mb-6">
                    {analysis.overallScore >= 80 ? (
                      <>Your resume scores in the <span className="font-medium text-green-600">top 10%</span> of resumes we analyze. Great job!</>
                    ) : analysis.overallScore >= 60 ? (
                      <>Your resume scores in the <span className="font-medium text-amber-600">top 30%</span> of resumes we analyze. With a few improvements, you could be in the top 10%.</>
                    ) : (
                      <>Your resume needs improvement to be competitive. Follow our suggestions below to improve your score.</>
                    )}
                  </p>
                  
                  <div className="w-full bg-stone-100 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full" 
                      style={{ width: `${analysis.overallScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Needs Work</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Match Analysis (if job description was provided) */}
            {analysis.jobTitleMatch && (
              <div className="p-8 border-b border-stone-200">
                <h4 className="text-xl font-medium text-stone-800 mb-4">Job Match Analysis</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <p className="text-blue-800 font-medium">{analysis.jobTitleMatch}</p>
                </div>
                
                {analysis.keywordMatches.length > 0 && (
                  <>
                    <h5 className="font-medium text-stone-700 mb-3">Keyword Matches</h5>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {analysis.keywordMatches.map((keyword, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${
                            keyword.importance === 'high' ? 'bg-green-100 text-green-800' :
                            keyword.importance === 'medium' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {keyword.keyword} ({keyword.count}x)
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Category Breakdown */}
            <div className="p-8 border-b border-stone-200">
              <h4 className="text-xl font-medium text-stone-800 mb-6">Detailed Breakdown</h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {analysis.categories.map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="bg-stone-50 rounded-xl p-6 border border-stone-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h5 className="font-medium text-stone-800">{category.name}</h5>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(category.score*10)}`}>
                        {category.score}/10
                      </span>
                    </div>
                    <p className="text-stone-600 text-sm">{category.feedback}</p>
                    
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actionable Suggestions */}
            <div className="p-8">
              <h4 className="text-xl font-medium text-stone-800 mb-6">Actionable Suggestions</h4>
              <ul className="space-y-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      index % 2 === 0 ? "bg-amber-100 text-amber-600" : "bg-stone-100 text-stone-600"
                    }`}>
                      <FiChevronRight className="text-xs" />
                    </div>
                    <p className="text-stone-700">{suggestion}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Upgrade CTA */}
        <section className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-12 text-center text-white mb-24">
          <h3 className="text-3xl font-bold mb-6">Get Personalized Resume Coaching</h3>
          <p className="text-stone-300 max-w-2xl mx-auto mb-8 text-lg">
            Our experts will review your resume line-by-line and provide customized recommendations to maximize your interview chances.
          </p>
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
            Upgrade to Premium Analysis
          </button>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-stone-900 mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {[
              {
                question: "How does the AI analyze my resume?",
                answer: "Our system evaluates your resume against 20+ factors including ATS compatibility, content structure, keyword optimization, and design principles used by professional resume writers."
              },
              {
                question: "Is my resume data secure?",
                answer: "Yes, we don't store your resume after analysis is complete unless you choose to save it to your account. All data is encrypted during processing."
              },
              {
                question: "How accurate is the analysis?",
                answer: "Our AI is trained on thousands of successful resumes and constantly updated with hiring trends. While not perfect, it identifies 95% of common resume issues."
              }
            ].map((item, index) => (
              <div key={index} className="border border-stone-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center p-6 text-left hover:bg-stone-50 transition-colors">
                  <span className="font-medium text-stone-800">{item.question}</span>
                  <FiChevronRight className="text-stone-500 transform transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-xl font-bold mb-6">Resume<span className="text-amber-400">AI</span></h4>
              <p className="text-stone-400">The most advanced AI-powered resume builder and analyzer for modern professionals.</p>
            </div>
            <div>
              <h5 className="font-medium mb-4">Product</h5>
              <ul className="space-y-3 text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analysis</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Resources</h5>
              <ul className="space-y-3 text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Company</h5>
              <ul className="space-y-3 text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-500">
            <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeAnalysisPage;