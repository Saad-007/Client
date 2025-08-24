import { useState, useRef, useEffect } from "react";
import SinglePromptResumeForm from "../components/StepForm";
import ResumePreview from "../components/ResumePreview";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiFileText, FiCheck, FiAward, FiBriefcase, FiBook, FiCode, FiGlobe, FiChevronDown } from "react-icons/fi";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Template configurations
const TEMPLATES = {
  professional: {
    name: "Professional",
    description: "Clean corporate layout for formal job applications",
    icon: <FiBriefcase className="text-xl" />,
    previewColor: "from-stone-600 to-stone-800",
    styles: {
      primaryColor: "#57534e",
      secondaryColor: "#44403c",
      backgroundColor: "#ffffff",
      textColor: "#374151",
      accentColor: "#f5f5f4",
      headerStyle: "gradient"
    }
  },
  modern: {
    name: "Modern",
    description: "Contemporary design with creative elements",
    icon: <FiAward className="text-xl" />,
    previewColor: "from-amber-600 to-amber-800",
    styles: {
      primaryColor: "#d97706",
      secondaryColor: "#b45309",
      backgroundColor: "#fffbeb",
      textColor: "#1f2937",
      accentColor: "#fef3c7",
      headerStyle: "solid"
    }
  },
  minimalist: {
    name: "Minimalist",
    description: "Simple and clean layout with focus on content",
    icon: <FiBook className="text-xl" />,
    previewColor: "from-gray-600 to-gray-800",
    styles: {
      primaryColor: "#000000",
      secondaryColor: "#4b5563",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#f3f4f6",
      headerStyle: "minimal"
    }
  },
  creative: {
    name: "Creative",
    description: "Colorful design for creative industries",
    icon: <FiCode className="text-xl" />,
    previewColor: "from-brown-600 to-brown-800",
    styles: {
      primaryColor: "#78350f",
      secondaryColor: "#5a3807",
      backgroundColor: "#fef7ed",
      textColor: "#4b5563",
      accentColor: "#fed7aa",
      headerStyle: "creative"
    }
  },
  international: {
    name: "International",
    description: "Designed for global job applications",
    icon: <FiGlobe className="text-xl" />,
    previewColor: "from-stone-700 to-stone-900",
    styles: {
      primaryColor: "#44403c",
      secondaryColor: "#292524",
      backgroundColor: "#fafaf9",
      textColor: "#064e3b",
      accentColor: "#e7e5e4",
      headerStyle: "gradient"
    }
  }
};

const Home = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const resumeRef = useRef();

  // Animation for template selection
  const handleTemplateSelect = (template) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTemplate(template);
      setIsAnimating(false);
      setShowTemplateDropdown(false);
    }, 300);
  };

  const handleGeneratedResume = (data) => {
    setResume({
      ...data,
      raw: data.resume || "",
      name: data.name || "John Doe",
      contactInfo: data.contactInfo || "Not provided",
      summary: data.summary || "",
      experience: data.experienceBullets || [],
      skills: data.skills || [],
      education: data.education || [],
      projects: data.projects || [],
      certifications: data.certifications || [],
      languages: data.languages || [],
      template: selectedTemplate
    });
  };

  // PDF download function
  const downloadPDF = async () => {
    try {
      setPdfLoading(true);
      
      // Get the HTML content
      const htmlContent = resumeRef.current.innerHTML;
      
      // Check if content is short enough for one page
      const isOnePageContent = estimateContentLength(resume);
      
      const response = await fetch(`${API_BASE_URL}/api/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: htmlContent,
          fileName: resume.name.replace(/\s+/g, "_"),
          resumeData: {
            name: resume.name
          },
          // Add flag to indicate if content should fit on one page
          forceOnePage: isOnePageContent
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Get filename from Content-Disposition header if available
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `${resume.name.replace(/\s+/g, "_")}_Resume.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/) || 
                             contentDisposition.match(/filename\*=UTF-8''(.+)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Clean up
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
      setPdfLoading(false);
    } catch (err) {
      console.error("Download error:", err);
      setPdfLoading(false);
      alert("Failed to download PDF: " + err.message);
    }
  };

  // Helper function to estimate if content fits on one page
  const estimateContentLength = (resumeData) => {
    if (!resumeData) return false;
    
    // Count the number of sections with content
    let contentSections = 0;
    
    // Check each section for content
    if (resumeData.summary && resumeData.summary.length > 0) contentSections++;
    if (resumeData.experience && resumeData.experience.length > 0) contentSections++;
    if (resumeData.skills && resumeData.skills.length > 0) contentSections++;
    if (resumeData.education && resumeData.education.length > 0) contentSections++;
    if (resumeData.projects && resumeData.projects.length > 0) contentSections++;
    if (resumeData.certifications && resumeData.certifications.length > 0) contentSections++;
    if (resumeData.languages && resumeData.languages.length > 0) contentSections++;
    
    // Estimate based on number of sections and content length
    const totalContentLength = 
      (resumeData.summary?.length || 0) +
      (resumeData.experience?.reduce((acc, exp) => acc + exp.length, 0) || 0) +
      (resumeData.skills?.length || 0) * 10 + // Approximate chars per skill
      (resumeData.education?.reduce((acc, edu) => acc + edu.length, 0) || 0) +
      (resumeData.projects?.reduce((acc, proj) => acc + proj.length, 0) || 0) +
      (resumeData.certifications?.reduce((acc, cert) => acc + cert.length, 0) || 0) +
      (resumeData.languages?.reduce((acc, lang) => acc + lang.length, 0) || 0);
    
    // If we have few sections and not too much content, assume it fits on one page
    return contentSections <= 4 && totalContentLength < 2000;
  };

  // DOC download function
  const downloadDOC = async () => {
    try {
      setDocLoading(true);
      
      console.log("Sending resume data for DOC:", resume);
      
      const response = await fetch(`${API_BASE_URL}/api/generate-doc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: resume
        }),
      });

      console.log("DOC response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume.name.replace(/\s+/g, "_")}_Resume.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
      setDocLoading(false);
    } catch (err) {
      console.error("DOC download error:", err);
      setDocLoading(false);
      alert("Failed to download DOC: " + err.message);
    }
  };

  // Scroll to preview when resume is generated
  useEffect(() => {
    if (resume && resumeRef.current) {
      resumeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [resume]);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-stone-700 to-amber-700 bg-clip-text text-transparent">
            Build Your Perfect Resume
          </h1>
          <p className="text-base sm:text-lg text-center text-stone-600 max-w-2xl mx-auto">
            Fill in your details and choose a template to create a professional resume in minutes.
          </p>
        </motion.div>

        <SinglePromptResumeForm
          onGenerate={handleGeneratedResume}
          setLoading={setLoading}
          setError={setError}
          selectedTemplate={selectedTemplate}
        />

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-4 bg-amber-50 rounded-lg text-amber-800 flex items-center gap-3"
            >
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-700"></div>
              Generating your resume...
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-4 bg-red-50 rounded-lg text-red-800 flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Error: {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Template selection */}
        <div className="mb-8 sm:mb-12 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <span className="bg-amber-100 text-amber-700 p-2 rounded-full">
              <FiBriefcase />
            </span>
            Choose Your Resume Template
          </h2>
          
          {/* Mobile template selector (dropdown) */}
          <div className="block lg:hidden mb-6">
            <div className="relative">
              <button
                onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                className="w-full p-4 border-2 rounded-xl flex items-center justify-between bg-white"
                style={{ borderColor: TEMPLATES[selectedTemplate].styles.primaryColor }}
              >
                <div className="flex items-center gap-3">
                  <div style={{ color: TEMPLATES[selectedTemplate].styles.primaryColor }}>
                    {TEMPLATES[selectedTemplate].icon}
                  </div>
                  <span className="font-medium">{TEMPLATES[selectedTemplate].name}</span>
                </div>
                <FiChevronDown className={`transform transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showTemplateDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-stone-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {Object.entries(TEMPLATES).map(([key, template]) => (
                    <div
                      key={key}
                      onClick={() => handleTemplateSelect(key)}
                      className="p-4 border-b border-stone-100 last:border-b-0 hover:bg-stone-50 cursor-pointer flex items-center gap-3"
                    >
                      <div style={{ color: template.styles.primaryColor }}>
                        {template.icon}
                      </div>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-stone-500">{template.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop template grid */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {Object.entries(TEMPLATES).map(([key, template]) => (
              <motion.div
                key={key}
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTemplateSelect(key)}
                className={`p-4 sm:p-5 border-2 rounded-xl cursor-pointer transition-all relative overflow-hidden group ${
                  selectedTemplate === key
                    ? "ring-2 ring-offset-2 ring-amber-500 shadow-lg"
                    : "border-stone-200 hover:border-stone-300"
                }`}
                style={{
                  backgroundColor: template.styles.backgroundColor,
                }}
              >
                {selectedTemplate === key && (
                  <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <FiCheck className="mr-1" /> Selected
                  </div>
                )}
                
                <div className={`h-24 sm:h-32 mb-3 sm:mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br ${template.previewColor}`}>
                  <span className="text-white text-3xl sm:text-4xl">{template.icon}</span>
                </div>
                
                <h3 className="font-bold text-base sm:text-lg mb-1 flex items-center gap-2" style={{ color: template.styles.primaryColor }}>
                  {template.icon}
                  {template.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">{template.description}</p>
                
                <div className="mt-2 sm:mt-3 flex gap-1 h-3 sm:h-4 rounded-full overflow-hidden">
                  <div className="flex-1" style={{ backgroundColor: template.styles.primaryColor }} />
                  <div className="flex-1" style={{ backgroundColor: template.styles.secondaryColor }} />
                  <div className="flex-1" style={{ backgroundColor: template.styles.accentColor }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume Preview */}
        <div ref={resumeRef} className="flex justify-center mt-8 sm:mt-12" id="resume-pdf-container">
          <AnimatePresence>
            {resume && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-3xl break-words"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                <ResumePreview 
                  resume={resume} 
                  template={selectedTemplate} 
                  templateStyles={TEMPLATES[selectedTemplate]?.styles}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {resume && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          >
            {/* Primary PDF Download Button */}
            <button
              onClick={downloadPDF}
              disabled={pdfLoading}
              className={`px-5 py-3 sm:px-6 sm:py-3 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 ${
                pdfLoading ? "bg-stone-400 cursor-not-allowed" : "hover:scale-105 transform shadow-lg"
              }`}
              style={{
                backgroundColor: pdfLoading ? '#a8a29e' : TEMPLATES[selectedTemplate].styles.primaryColor
              }}
            >
              {pdfLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FiDownload />
                  Download Perfect PDF
                </>
              )}
            </button>

            {/* Secondary DOCX Download Button */}
            <div className="relative group">
              <button
                onClick={downloadDOC}
                disabled={docLoading}
                className={`px-4 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 w-full sm:w-auto ${
                  docLoading ? "bg-gray-300 cursor-not-allowed" : "hover:bg-gray-100 border border-gray-300"
                }`}
                style={{
                  color: TEMPLATES[selectedTemplate].styles.primaryColor
                }}
              >
                {docLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FiFileText />
                    DOCX (Text Only)
                  </>
                )}
              </button>
              
              <div className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black text-white text-sm rounded p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                Simple text version for editing. For perfect formatting, use PDF.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;