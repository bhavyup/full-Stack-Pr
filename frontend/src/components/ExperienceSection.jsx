import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Rocket, Star, Target } from 'lucide-react';
import { publicApi } from '../utils/api';
import { portfolioData } from '../mock'; // Fallback

const ExperienceSection = () => {
  const [experience, setExperience] = useState(portfolioData.experience);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await publicApi.getExperience();
        if (response.success && response.data) {
          setExperience(response.data);
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
        // Keep using mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-800/40 rounded-lg animate-pulse mb-4 mx-auto max-w-md"></div>
            <div className="w-24 h-1 bg-slate-800/40 mx-auto animate-pulse"></div>
          </div>
          <div className="flex justify-center">
            <div className="h-96 w-full max-w-4xl bg-slate-800/40 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
        </div>

        <div className="flex justify-center">
          <Card className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group max-w-4xl">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                {/* Journey Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center group-hover:animate-bounce transition-all duration-300">
                      <Rocket className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Main Message */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                    Journey in Progress
                  </h3>
                  <p className="text-xl text-slate-300 font-['Poppins'] leading-relaxed max-w-3xl mx-auto">
                    {experience.message}
                  </p>
                </div>

                {/* Future Goals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-slate-900/50 p-6 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group/card">
                    <Star className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover/card:animate-spin" />
                    <h4 className="text-lg font-semibold text-white mb-2 font-['Orbitron']">Internships</h4>
                    <p className="text-slate-400 text-sm font-['Poppins']">Seeking hands-on learning opportunities</p>
                  </div>

                  <div className="bg-slate-900/50 p-6 rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group/card">
                    <Target className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover/card:animate-pulse" />
                    <h4 className="text-lg font-semibold text-white mb-2 font-['Orbitron']">Projects</h4>
                    <p className="text-slate-400 text-sm font-['Poppins']">Building innovative solutions</p>
                  </div>

                  <div className="bg-slate-900/50 p-6 rounded-lg border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300 group/card">
                    <Rocket className="w-8 h-8 text-pink-400 mx-auto mb-4 group-hover/card:animate-bounce" />
                    <h4 className="text-lg font-semibold text-white mb-2 font-['Orbitron']">Collaborations</h4>
                    <p className="text-slate-400 text-sm font-['Poppins']">Creative tech partnerships</p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 p-8 bg-gradient-to-r from-slate-800/40 to-purple-900/20 rounded-lg border border-slate-700/50">
                  <h4 className="text-xl font-bold text-white mb-3 font-['Orbitron']">Let's Build Something Amazing Together!</h4>
                  <p className="text-slate-300 font-['Poppins']">
                    I'm passionate about learning, growing, and contributing to innovative projects. 
                    If you have an opportunity or collaboration in mind, I'd love to hear from you!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;