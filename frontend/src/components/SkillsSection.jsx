import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Code2, CloudRain, Database, Wrench, Brain, Users } from 'lucide-react';
import { publicApi } from '../utils/api';
import { portfolioData } from '../mock'; // Fallback
import ShinyText from './ui/ShinyText';

// --- NEW: A helper to map category IDs to icons ---
const categoryIcons = {
  default: Code2,
  current: Code2,
  learning: Brain,
  tools: Wrench,
  programming: Code2,
  database: Database,
  cloud: CloudRain,
  soft: Users,
};

const SkillsSection = () => {
  const [skills, setSkills] = useState(portfolioData.skills);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await publicApi.getSkills();
        if (response.success && response.data) {
          setSkills(response.data);
          // Set the first available category as active
          setActiveCategory(Object.keys(response.data)[0] || null);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // --- THIS IS THE FIX ---
  // The categories are now generated dynamically from the fetched data
  const categories = Object.keys(skills).map(id => ({
    id: id,
    label: id.replace('-', ' '),
    icon: categoryIcons[id] || categoryIcons.default,
    skills: skills[id] || [],
    // You can add a color mapping here if you wish
    color: 'cyan' 
  }));
  // --- END OF THE FIX ---

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

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 relative z-10">
        {/* Loading UI... */}
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto font-['Poppins']">
            
          </p>
          <ShinyText text="A showcase of the tools and technologies I use to bring ideas to life." speed={2} disabled={false} />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 capitalize ${
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
                      {skill.name ? skill.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                  <h3 className=" font-semibold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-['Poppins']">{skill.name}</h3>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses(categories.find(cat => cat.id === activeCategory)?.color)} transition-all duration-1000`}
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;