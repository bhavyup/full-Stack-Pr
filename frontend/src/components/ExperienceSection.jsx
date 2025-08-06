import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Rocket, Star, Target } from 'lucide-react';
import { publicApi } from '../utils/api';
import { portfolioData } from '../mock'; // Fallback
import GradientText from '@/ui/TextAnimations/GradientText/GradientText';

const goalIcons = {
  Internships: Star,
  Projects: Target,
  Collaborations: Rocket,
};

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
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading || !experience) {
    return (
      <section id="experience" className="py-20 px-4 relative z-10">
        {/* Loading UI... */}
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
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center group-hover:animate-bounce transition-all duration-300">
                      <Rocket className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                    {experience.main_title}
                  </h3>
                  <p className="text-xl text-slate-300 font-['Poppins'] leading-relaxed max-w-3xl mx-auto">
                    {experience.main_message}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {experience.goals?.map((goal, index) => {
                    const Icon = goalIcons[goal.title] || Star;
                    return (
                      <div key={index} className="bg-slate-900/50 p-6 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group/card">
                        <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover/card:animate-spin" />
                        <GradientText colors={["#40ffaa", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} className="mx-auto" animationSpeed={5}><h4 className="text-lg font-semibold  mb-2 font-['Orbitron']">{goal.title}</h4></GradientText>
                        <p className="text-slate-400 text-sm font-['Poppins']">{goal.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 p-8 bg-gradient-to-r from-slate-800/40 to-purple-900/20 rounded-lg border border-slate-700/50">
                  <GradientText colors={["#40ffaa", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} className="mx-auto" animationSpeed={5}><h4 className="text-xl font-bold  mb-3 font-['Orbitron']">{experience.cta_title}</h4></GradientText>
                  <p className="text-slate-300 font-['Poppins']">
                    {experience.cta_message}
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