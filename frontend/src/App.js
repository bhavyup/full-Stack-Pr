import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Components for the main portfolio page
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

// --- Components for the Admin Panel ---
import Login from "./components/Admin/Login";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import ProjectsManager from "./components/Admin/ProjectsManager";
import ProfileManager from "./components/Admin/ProfileManager";
import SkillsManager from "./components/Admin/SkillsManager";
import EducationManager from "./components/Admin/EducationManager";
import ExperienceManager from "./components/Admin/ExperienceManager";
import LearningJourneyManager from "./components/Admin/LearningJourneyManager";
import ExperimentsManager from "./components/Admin/ExperimentsManager";
import MessagesManager from "./components/Admin/MessagesManager";
import ContactManager from "./components/Admin/ContactManager";
import FooterManager from "./components/Admin/FooterManager";
import AdminManager from "./components/Admin/AdminManager";
import SearchResults from "./components/Admin/SearchResults";
import MessagePopover from "./components/Admin/MessageDropDown";

// --- THIS IS THE CRITICAL FIX ---
// Import the AdminProvider from the context file we created
import { AdminProvider } from "./context/AdminContext";
// --- END OF FIX ---

// This is the component for your main, public-facing portfolio page.
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

// This is the main App component that handles all routing.
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Main Portfolio Route */}
          <Route path="/" element={<Portfolio />} />

          {/* Admin Login Route (Public) */}
          <Route path="/admin/login" element={<Login />} />

          {/* --- THIS IS THE CRITICAL FIX --- */}
          {/* The AdminProvider now wraps the entire protected admin section */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminProvider>
                  <AdminLayout />
                </AdminProvider>
              </ProtectedRoute>
            }
          >
            {/* These pages are now correctly nested and will have access to the context */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<ProfileManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route
              path="learning-journey"
              element={<LearningJourneyManager />}
            />
            <Route path="experiments" element={<ExperimentsManager />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="contact" element={<ContactManager />} />
            <Route path="footer" element={<FooterManager />} />
            <Route path="manage-admins" element={<AdminManager />} />
            <Route path="search" element={<SearchResults />} />
          </Route>
          {/* --- END OF FIX --- */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
