import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, Calendar } from 'lucide-react';
import { portfolioData } from '../mock';

const LearningJourneySection = () => {
  const { learningJourney } = portfolioData;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-400 animate-spin" />;
      case 'planned':
        return <Calendar className="w-6 h-6 text-blue-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-400/50">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/50">In Progress</Badge>;
      case 'planned':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/50">Planned</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-400/50">Unknown</Badge>;
    }
  };

  const getProgressWidth = (status) => {
    switch (status) {
      case 'completed': return '100%';
      case 'in-progress': return '60%';
      case 'planned': return '10%';
      default: return '0%';
    }
  };

  return (
    <section id="learning" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            Learning Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto font-['Poppins']">
            Continuous growth and skill development pathway
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full"></div>

          <div className="space-y-12">
            {learningJourney.map((phase, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                {/* Timeline Node */}
                <div className="flex-1">
                  <Card className={`bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                          {phase.phase}
                        </h3>
                        {getStatusBadge(phase.status)}
                      </div>

                      {/* Skills List */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {phase.skills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex}
                            variant="outline" 
                            className="border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-400">
                          <span>Progress</span>
                          <span>{phase.status === 'completed' ? '100%' : phase.status === 'in-progress' ? '60%' : '10%'}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-1000"
                            style={{ width: getProgressWidth(phase.status) }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Icon */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-900 border-4 border-cyan-400 rounded-full flex items-center justify-center">
                    {getStatusIcon(phase.status)}
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                </div>

                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Mindset Quote */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-slate-800/40 to-purple-900/20 backdrop-blur-lg border border-slate-700/50 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-bold text-white font-['Orbitron']">Growth Mindset</h3>
              </div>
              <p className="text-slate-300 text-lg font-['Poppins'] leading-relaxed italic">
                "The journey of a thousand miles begins with a single step. Every skill learned, 
                every challenge overcome, brings me closer to creating the future I envision."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LearningJourneySection;