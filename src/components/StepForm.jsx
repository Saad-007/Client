import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiEdit3, FiLoader, FiCheckCircle, FiInfo } from 'react-icons/fi';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SinglePromptResumeForm = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= 500) {
      setPrompt(input);
      if (error) setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please provide your career details.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/resume/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate resume");
      }

      const data = await res.json();
      onGenerate(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg border border-stone-200"
    >
      {/* Header Section */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-700 flex-shrink-0">
          <FiEdit3 className="text-xl" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800">Tell Us About Yourself</h2>
          <p className="text-stone-600 mt-1 text-sm sm:text-base">
            Share your professional journey in 5-6 sentences. Include your experience, education, skills, and achievements.
          </p>
        </div>
      </div>

      {/* Textarea Section */}
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-stone-700">
          Professional Summary
        </label>
        <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-amber-500 ring-opacity-50 rounded-lg' : ''}`}>
          <textarea
            id="prompt"
            value={prompt}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Example: I'm a frontend developer with 3 years experience at ABC Corp. I have a BSc in Computer Science from XYZ University. Skilled in React, JavaScript, and Node.js. Led a team that built an e-commerce platform with 10k monthly users. Certified in AWS Cloud Practitioner."
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none resize-none ${
              error ? 'border-red-500 bg-red-50' : 'border-stone-300 hover:border-stone-400'
            } ${isFocused ? 'border-amber-500' : ''}`}
            rows={5}
          />
          <div className="absolute bottom-2 right-2 text-xs text-stone-500 bg-white px-1 rounded">
            {prompt.length}/500
          </div>
        </div>
        {error ? (
          <p className="text-red-600 text-sm flex items-center gap-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        ) : (
          <p className="text-stone-500 text-sm">
            Tip: Be specific about your skills and achievements for better results.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
          loading 
            ? 'bg-stone-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 shadow-md hover:shadow-lg active:translate-y-0 sm:hover:-translate-y-0.5'
        } text-amber-50`}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin" />
            <span>Crafting Your Resume...</span>
          </>
        ) : (
          <>
            <FiCheckCircle />
            <span>Generate My Resume</span>
          </>
        )}
      </button>

      {/* Tips Section */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h3 className="font-medium text-amber-800 flex items-center gap-2">
          <FiInfo className="w-5 h-5 flex-shrink-0" />
          What makes a good summary?
        </h3>
        <ul className="mt-2 text-amber-700 text-sm space-y-1 pl-5">
          <li className="list-disc">Mention your years of experience</li>
          <li className="list-disc">Include your highest education</li>
          <li className="list-disc">Highlight key technical skills</li>
          <li className="list-disc">Describe major achievements</li>
          <li className="list-disc">Keep it concise (5-6 sentences)</li>
        </ul>
      </div>
    </form>
  );
};

SinglePromptResumeForm.propTypes = {
  onGenerate: PropTypes.func.isRequired
};

export default SinglePromptResumeForm;