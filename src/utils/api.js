// src/utils/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const generateResume = async ({
  name,
  contactInfo,
  summary,
  education,
  experience,
  skills,
  projects,
  certifications,
  languages,
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/resume/full`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contactInfo,
        summary,
        education,
        experience,
        skills,
        projects,
        certifications,
        languages,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate full resume.");
    }

    const data = await response.json();
    return data.resume; // Assuming backend returns { resume: "..." }
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};
