import { useState } from "react";

function Jobs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      const res = await fetch("/api/resume/feedback", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      setData(json); // ✅ resume analysis + jobs
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resume Analysis & Jobs</h1>

      {/* Resume upload */}
      <input type="file" onChange={handleResumeUpload} className="mb-6" />

      {loading && <p>Analyzing resume and fetching jobs...</p>}

      {/* Resume feedback */}
      {data?.data && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-semibold">Feedback</h2>
          <p>Overall Score: {data.data.overallScore}</p>
          <p>Suggested Role: {data.data.jobTitleMatch}</p>
        </div>
      )}

      {/* Matching jobs */}
      {data?.jobs && data.jobs.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mt-6">Matching Jobs</h2>
          <div className="grid gap-4 mt-4">
            {data.jobs.map((job, i) => (
              <div
                key={i}
                className="p-4 bg-white shadow rounded-lg border border-gray-100"
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">
                  {job.company} — {job.location}
                </p>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 inline-block"
                >
                  Apply on {job.platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
