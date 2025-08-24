import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-stone-700 to-amber-700 bg-clip-text text-transparent mb-4">
              ResumeAI
            </h3>
            <p className="text-stone-600 mb-4">
              Create professional resumes in minutes with our easy-to-use builder. 
              Perfect for job seekers in any industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-500 hover:text-amber-700 transition-colors">
                <FiGithub className="text-xl" />
              </a>
              <a href="#" className="text-stone-500 hover:text-amber-700 transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-stone-500 hover:text-amber-700 transition-colors">
                <FiLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-stone-500 hover:text-amber-700 transition-colors">
                <FiMail className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Blog</a></li>
              <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Templates</a></li>
              <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Examples</a></li>
              <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Terms</a></li>
              <li><a href="#" className="text-stone-600 hover:text-amber-700 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-stone-500 hover:text-stone-700 text-sm">Privacy Policy</a>
            <a href="#" className="text-stone-500 hover:text-stone-700 text-sm">Terms of Service</a>
            <a href="#" className="text-stone-500 hover:text-stone-700 text-sm">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;