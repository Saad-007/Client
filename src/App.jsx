import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HomePage from "./components/Homepage";
import Footer from "./components/Footer";
import ResumeAnalysisPage from "./components/ResumeAnalysisPage";
function App() {
  return (
    <Router>
      {/* Common Layout */}
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow px-4">
          <Routes>
            {/* Home Page */}
            <Route path="/Home" element={<HomePage />} />
            <Route path="/" element={<ResumeAnalysisPage />}/>
            {/* Resume Builder Page */}
            <Route path="/resume" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
