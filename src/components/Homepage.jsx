import { useState, useEffect } from "react";
import { FiAward,FiBook ,FiCode ,FiGlobe,  FiBriefcase, FiDownload, FiMessageSquare, FiCheck, FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
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
      headerStyle: "gradient",
    },
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
      headerStyle: "solid",
    },
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
      headerStyle: "minimal",
    },
  },
  creative: {
    name: "Creative",
    description: "Colorful design for creative industries",
    icon: <FiCode className="text-xl" />,
    previewColor: "from-orange-700 to-orange-900",
    styles: {
      primaryColor: "#78350f",
      secondaryColor: "#5a3807",
      backgroundColor: "#fef7ed",
      textColor: "#4b5563",
      accentColor: "#fed7aa",
      headerStyle: "creative",
    },
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
      headerStyle: "gradient",
    },
  },
};
const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-stone-50 antialiased">
      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm sticky top-0 z-50">
      
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-2 pt-2 pb-3">
            <div className="space-y-1">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700">Features</a>
              <a href="#templates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700">Templates</a>
              <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700">Testimonials</a>
              <button className="w-full mt-4 bg-gradient-to-r from-stone-700 to-stone-800 text-amber-50 px-4 py-2 rounded-md text-base font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="relative text-center py-20 md:py-32 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-4 md:left-20 w-24 h-24 md:w-40 md:h-40 rounded-full bg-amber-200 blur-2xl md:blur-3xl"></div>
          <div className="absolute bottom-20 right-4 md:right-20 w-32 h-32 md:w-60 md:h-60 rounded-full bg-stone-300 blur-2xl md:blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-stone-900 leading-tight tracking-tight"
          >
            <span className="inline-block">Craft Your </span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">Masterpiece Resume</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-stone-500"></span>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-stone-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            AI-curated resume builder with <span className="font-medium text-stone-800">designer templates</span> that command attention and land interviews
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
           <Link to='/resume'>
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden group bg-stone-900 text-stone-50 px-6 py-4 md:px-10 md:py-5 rounded-xl font-medium text-base md:text-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Building Now 
                <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-stone-800 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </motion.button>
            </Link>
           </motion.div> 
          
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center items-center gap-3 text-stone-500 text-sm"
          >
            <div className="flex items-center bg-stone-100 rounded-full px-3 py-1 md:px-4 md:py-2">
              <FiCheck className="text-amber-600 mr-2" /> 
              <span>No signup required</span>
            </div>
            <div className="flex items-center bg-stone-100 rounded-full px-3 py-1 md:px-4 md:py-2">
              <FiCheck className="text-amber-600 mr-2" />
              <span>Free PDF download</span>
            </div>
          </motion.div>
        </div>
      </section>
              
      {/* ===== Value Propositions ===== */}
      <section id="features" className="max-w-7xl mx-auto py-20 md:py-32 px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 md:mb-6"
          >
            <span className="inline-block relative">
              Unparalleled Resume Crafting
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></span>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto"
          >
            Precision tools for the modern professional
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: <FiAward className="text-2xl" />,
              title: "ATS Mastery",
              desc: "Algorithmically optimized to pass through applicant tracking systems",
              color: "bg-stone-100"
            },
            {
              icon: <FiBriefcase className="text-2xl" />,
              title: "Designer Templates",
              desc: "Curated by professional typographers and recruiters",
              color: "bg-amber-50"
            },
            {
              icon: <FiDownload className="text-2xl" />,
              title: "Seamless Export",
              desc: "Pixel-perfect PDFs with customizable color profiles",
              color: "bg-stone-100"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 40px -10px rgba(0, 0, 0, 0.08)"
              }}
              className={`${item.color} p-6 md:p-8 rounded-xl md:rounded-2xl border border-stone-200 hover:border-stone-300 transition-all duration-500`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-stone-900 text-amber-50 flex items-center justify-center mb-6 md:mb-8 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-stone-800">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

  {/* ===== Template Showcase ===== */}
{/* ===== Template Showcase ===== */}
<section id="templates" className="py-20 md:py-32 bg-stone-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-12 md:mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 md:mb-6">
        Signature Templates
      </h2>
      <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
        Minimalist designs that emphasize your unique value
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Object.values(TEMPLATES).map((template, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{
            y: -10,
            transition: { duration: 0.3 },
          }}
          className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-sm border border-stone-200"
        >
          {/* Preview Block */}
          <div
            className={`h-60 md:h-80 bg-gradient-to-br ${template.previewColor} flex flex-col items-center justify-center text-white`}
          >
            <div className="mb-3">{template.icon}</div>
            <span className="text-2xl md:text-3xl font-semibold">
              {template.name}
            </span>
            <p className="text-sm md:text-base mt-2 opacity-80 max-w-xs text-center">
              {template.description}
            </p>
          </div>

          {/* Hover Overlay */}

          {/* <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
            <button className="translate-y-4 group-hover:translate-y-0 transition-transform bg-white text-stone-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base">
              Preview Template
            </button>
          </div> */}
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ===== Testimonial ===== */}
      <section id="testimonials" className="max-w-7xl mx-auto py-20 md:py-32 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-amber-500/10 rounded-full blur-2xl md:blur-3xl"></div>
          
          <blockquote className="relative z-10 text-center max-w-4xl mx-auto">
            <FiMessageSquare className="text-3xl md:text-4xl text-amber-500/30 mx-auto mb-8 md:mb-12" />
            <p className="text-xl md:text-2xl font-light text-stone-100 mb-8 md:mb-12 leading-relaxed">
              "The difference was night and day. After using this builder, I received interview requests from Google, Apple, and Tesla within 10 days. The typography alone makes my experience look more substantial."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-500 to-stone-500 flex items-center justify-center text-white font-medium shadow-md">
                SK
              </div>
              <div className="text-center sm:text-left">
                <p className="font-medium text-stone-50">Sarah Kensington</p>
                <p className="text-stone-400 text-sm md:text-base">Senior Product Designer</p>
              </div>
            </div>
          </blockquote>
        </motion.div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="relative py-20 md:py-32 bg-stone-900 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 md:w-60 md:h-60 rounded-full bg-amber-400 blur-2xl md:blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 md:w-80 md:h-80 rounded-full bg-stone-600 blur-2xl md:blur-3xl"></div>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-50 mb-6 md:mb-8">
            Elevate Your Career Narrative
          </h2>
          <p className="text-lg md:text-xl text-stone-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join executives and creatives who trust our platform to present their best selves
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 px-8 py-4 md:px-12 md:py-5 rounded-xl font-medium text-base md:text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            Begin Your Journey
          </motion.button>
          <p className="text-stone-400 mt-6 md:mt-8 text-xs md:text-sm">
            * No credit card required • 14-day free trial of premium features
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;