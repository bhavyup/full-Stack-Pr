import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Zap, Beaker, Lightbulb, ArrowRight } from 'lucide-react';
import { portfolioData } from '../mock';

const ExperimentsSection = () => {
  const { experiments } = portfolioData;

  const getStatusIcon = (status) => {
    return status === 'active' ? 
      <Zap className="w-5 h-5 text-yellow-400 animate-pulse" /> : 
      <Lightbulb className="w-5 h-5 text-blue-400" />;
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? 
      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/50">Active</Badge> :
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/50">Planning</Badge>;
  };

  return (
    <section id="experiments" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            Latest Experiments
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto font-['Poppins']">
            Pushing boundaries with AI, automation, and creative technology solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {experiments.map((experiment, index) => (
            <Card
              key={index}
              className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(experiment.status)}
                    <CardTitle className="text-xl font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                      {experiment.title}
                    </CardTitle>
                  </div>
                  {getStatusBadge(experiment.status)}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-slate-300 mb-6 font-['Poppins'] leading-relaxed">
                  {experiment.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Beaker className="w-4 h-4" />
                    <span className="text-sm">Experimental</span>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyan-400 hover:text-white hover:bg-cyan-400/20 flex items-center gap-1"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Innovation Lab */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-slate-800/40 to-purple-900/20 backdrop-blur-lg border border-slate-700/50 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center animate-spin">
                  <Beaker className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white font-['Orbitron']">Innovation Lab</h3>
              </div>

              <p className="text-slate-300 text-lg font-['Poppins'] leading-relaxed mb-8 max-w-3xl mx-auto">
                This is where ideas transform into reality. Every experiment here represents a step toward 
                the future of technology, combining AI, automation, and human creativity to solve real-world challenges.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-6 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group/card">
                  <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover/card:animate-pulse" />
                  <h4 className="text-lg font-semibold text-white mb-2 font-['Orbitron']">AI Integration</h4>
                  <p className="text-slate-400 text-sm font-['Poppins']">Exploring intelligent automation</p>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group/card">
                  <Lightbulb className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover/card:animate-bounce" />
                  <h4 className="text-lg font-semibold text-white mb-2 font-['Orbitron']">Creative Solutions</h4>
                  <p className="text-slate-400 text-sm font-['Poppins']">Innovative problem-solving approaches</p>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-lg border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300 group/card">
                  <Beaker className="w-8 h-8 text-pink-400 mx-auto mb-4 group-hover/card:animate-spin" />
                  <h4 className="text-lg font-semibold text-white mb-2 font-['Orbitron']">Rapid Prototyping</h4>
                  <p className="text-slate-400 text-sm font-['Poppins']">Fast iteration and testing</p>
                </div>
              </div>

              <Button className="mt-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-full">
                Explore Experiments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;