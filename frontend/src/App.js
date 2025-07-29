import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Components
import SpaceBackground from "./components/SpaceBackground";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import LearningJourneySection from "./components/LearningJourneySection";
import ExperimentsSection from "./components/ExperimentsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ExperienceSection />
        <LearningJourneySection />
        <ExperimentsSection />
        <ContactSection />
        <Footer />
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;