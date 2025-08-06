import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Sparkles } from 'lucide-react';
import { publicApi } from '../utils/api';
import { portfolioData } from '../mock'; // Fallback
import GradientText from '@/ui/TextAnimations/GradientText/GradientText';

const AboutSection = () => {
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

  if (loading) {
    return (
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-800/40 rounded-lg animate-pulse mb-4 mx-auto max-w-md"></div>
            <div className="w-24 h-1 bg-slate-800/40 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-64 bg-slate-800/40 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-slate-800/40 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio Card */}
          <Card className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-cyan-400 group-hover:animate-spin transition-all duration-300" />
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={5}><h3 className="text-2xl font-semibold font-['Orbitron']">My Story</h3></GradientText>
              </div>
              <p className="text-slate-300 leading-relaxed font-['Poppins'] text-lg">
                {profile.bio}
              </p>
            </CardContent>
          </Card>

          {/* Highlights Panel */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-purple-900/20 backdrop-blur-lg border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={5}><h3 className="text-2xl font-semibold font-['Orbitron']">Quick Highlights</h3></GradientText>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
                  <p className="text-xl font-semibold text-cyan-400 font-['Poppins']">
                    {profile.highlights}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-all duration-300">
                    <div className="text-2xl font-bold text-cyan-400 font-['Orbitron']">5+</div>
                    <div className="text-sm text-slate-400">Languages</div>
                  </div>
                  <div className="p-4 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-all duration-300">
                    <div className="text-2xl font-bold text-purple-400 font-['Orbitron']">10+</div>
                    <div className="text-sm text-slate-400">Tools</div>
                  </div>
                  <div className="p-4 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-all duration-300">
                    <div className="text-2xl font-bold text-pink-400 font-['Orbitron']">∞</div>
                    <div className="text-sm text-slate-400">Curiosity</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;