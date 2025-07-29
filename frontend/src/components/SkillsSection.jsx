import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Code2, CloudRain, Database, Wrench, Brain, Users } from 'lucide-react';
import { portfolioData } from '../mock';

const SkillsSection = () => {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('current');

  const categories = [
    { id: 'current', label: 'Current Skills', icon: Code2, skills: skills.current, color: 'cyan' },
    { id: 'learning', label: 'Learning', icon: Brain, skills: skills.learning, color: 'purple' },
    { id: 'tools', label: 'Tools', icon: Wrench, skills: skills.tools, color: 'pink' },
    { id: 'programming', label: 'Programming', icon: Code2, skills: skills.programming, color: 'blue' },
    { id: 'database', label: 'Database', icon: Database, skills: skills.database, color: 'green' },
    { id: 'cloud', label: 'Cloud', icon: CloudRain, skills: skills.cloud, color: 'indigo' },
    { id: 'soft', label: 'Soft Skills', icon: Users, skills: skills.soft, color: 'orange' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: 'from-cyan-400 to-cyan-600',
      purple: 'from-purple-400 to-purple-600',
      pink: 'from-pink-400 to-pink-600',
      blue: 'from-blue-400 to-blue-600',
      green: 'from-green-400 to-green-600',
      indigo: 'from-indigo-400 to-indigo-600',
      orange: 'from-orange-400 to-orange-600'
    };
    return colors[color] || colors.cyan;
  };

  return (
    <section id="skills" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto font-['Poppins']">
            Combined coding with design to create faster analysis models for academic research.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories
            .find(cat => cat.id === activeCategory)
            ?.skills.map((skill, index) => (
            <Card
              key={index}
              className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getColorClasses(categories.find(cat => cat.id === activeCategory)?.color)} flex items-center justify-center group-hover:animate-pulse`}>
                  <span className="text-white font-semibold text-lg">
                    {skill.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2 font-['Poppins']">{skill}</h3>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses(categories.find(cat => cat.id === activeCategory)?.color)} transition-all duration-1000`}
                    style={{ width: `${70 + Math.random() * 30}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-slate-800/40 to-purple-900/20 backdrop-blur-lg border border-slate-700/50 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-spin"></div>
                <h3 className="text-2xl font-bold text-white font-['Orbitron']">Impact Statement</h3>
              </div>
              <p className="text-slate-300 text-lg font-['Poppins'] leading-relaxed">
                "Combined coding with design to create faster analysis models for academic research."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;