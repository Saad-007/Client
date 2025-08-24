import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HomePage from "./components/Homepage";
import Footer from "./components/Footer";
import ResumeAnalysisPage from "./components/ResumeAnalysisPage";
import ScrollToHash from "./components/ScrollToHash"
import { HelpCenter } from "./components/resources";
import { PrivacyPolicy } from "./components/resources";
import { TermsOfService } from "./components/resources";
import { CookiePolicy } from "./components/resources";
function App() {
  return (
    <Router>
      {/* 👇 Add ScrollToHash here so it runs on every route change */}
      <ScrollToHash />

      {/* Common Layout */}
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow px-4">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/Analyze" element={<ResumeAnalysisPage />} />
            {/* Resume Builder Page */}
            <Route path="/resume" element={<Home />} />
            {/* Templates Page (if you add it later) */}
            {/* <Route path="/templates" element={<Templates />} /> */}
            <Route path="/Helpcenter" element={<HelpCenter />} />
            <Route path="/Privacy" element={<PrivacyPolicy />} />
            <Route path="/Cookie" element={<CookiePolicy />} />
            <Route path="/Terms" element={<TermsOfService />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
