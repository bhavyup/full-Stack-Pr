import React from 'react';
import { Card, CardContent } from './ui/card';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../mock';

const EducationSection = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
        </div>

        <div className="flex justify-center">
          <Card className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group max-w-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center group-hover:animate-spin transition-all duration-300">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                  {education.degree}
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="font-['Poppins']">{education.institution}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="font-['Poppins']">{education.year}</span>
                </div>

                {/* Progress indicator */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-3 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 text-center">Expected graduation: 2026</p>
                </div>

                {/* Academic highlights */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
                    <div className="text-2xl font-bold text-cyan-400 font-['Orbitron']">CS</div>
                    <div className="text-sm text-slate-400">Major</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
                    <div className="text-2xl font-bold text-purple-400 font-['Orbitron']">2026</div>
                    <div className="text-sm text-slate-400">Graduation</div>
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

export default EducationSection;