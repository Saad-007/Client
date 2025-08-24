import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase, FiDownload, FiUser, FiHome, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { to: "/Home", icon: <FiHome className="text-lg" />, text: "Home" },
    { to: "/resume", icon: <FiUser className="text-lg" />, text: "Resume Builder" },
    { to: "/", icon: <FiBriefcase className="text-lg" />, text: "Resume Analysis" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-stone-800">Resume<span className="text-amber-600">AI</span></h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                to={item.to} 
                className="text-gray-700 hover:text-amber-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
              >
                {item.icon}
                {item.text}
              </Link>
            ))}
          </div>
          
          {/* Export Button (Desktop) */}
          <div className="hidden md:flex md:items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-stone-700 to-stone-800 text-amber-50 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-200 hover:from-stone-800 hover:to-stone-900 border border-stone-600"
            >
              <FiDownload className="text-lg" />
              Export Resume
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-700 focus:outline-none"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="text-gray-700 hover:text-amber-700 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.text}
                </Link>
              ))}
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-gradient-to-r from-stone-700 to-stone-800 text-amber-50 px-4 py-2 rounded-md text-base font-medium flex items-center justify-center gap-2 border border-stone-600"
              >
                <FiDownload className="text-lg" />
                Export Resume
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;