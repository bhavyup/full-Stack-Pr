import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowDown, Mail } from 'lucide-react';
import { publicApi, handleApiError } from '../utils/api';
import { portfolioData } from '../mock'; // Fallback

const HeroSection = () => {
  const [profile, setProfile] = useState(portfolioData.profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await publicApi.getProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Keep using mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="text-center">
          <div className="w-48 h-48 rounded-full bg-slate-800/40 animate-pulse mx-auto mb-8"></div>
          <div className="h-12 bg-slate-800/40 rounded-lg animate-pulse mb-6"></div>
          <div className="h-6 bg-slate-800/40 rounded-lg animate-pulse mb-8"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-purple-400 p-1 bg-gradient-to-r from-cyan-400 to-purple-400">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full bg-slate-800"
              />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
          {profile.name}
        </h1>

        {/* Headline */}
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto font-['Poppins'] leading-relaxed">
          {profile.headline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection('about')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            Explore My Universe
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </Button>
          
          <Button
            onClick={() => scrollToSection('contact')}
            variant="outline"
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </Button>
        </div>

        {/* Floating animation hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-cyan-400 opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;