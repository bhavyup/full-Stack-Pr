import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Zap, Beaker, Lightbulb, ArrowRight } from 'lucide-react';
import { publicApi } from '../utils/api';
import ShinyText from './ui/ShinyText';
import GradientText from '@/ui/TextAnimations/GradientText/GradientText';

const ExperimentsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const response = await publicApi.getExperiments();
        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching experiments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiments();
  }, []);

  const getStatusIcon = (status) => (status === 'active' ? <Zap className="w-5 h-5 text-yellow-400" /> : <Lightbulb className="w-5 h-5 text-blue-400" />);
  const getStatusBadge = (status) => (status === 'active' ? <Badge className="bg-yellow-500/20 text-yellow-400">Active</Badge> : <Badge className="bg-blue-500/20 text-blue-400">Planning</Badge>);

  if (loading || !data) {
    return <section id="experiments" className="py-20 px-4">{/* You can add a loading skeleton here */}</section>;
  }

  const featureIcons = {
    "AI Integration": Zap,
    "Creative Solutions": Lightbulb,
    "Rapid Prototyping": Beaker
  };

  return (
    <section id="experiments" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            {data.header_title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
          <ShinyText text={data.header_description} speed={2} disabled={false} className="max-w-2xl mx-auto font-['Poppins']" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {data.experiments.map((experiment, index) => (
            <Card key={index} className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 group">
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
                <p className="text-slate-300 font-['Poppins'] leading-relaxed">
                  {experiment.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-slate-800/40 to-purple-900/20 backdrop-blur-lg border border-slate-700/50 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center animate-spin">
                  <Beaker className="w-6 h-6 text-white" />
                </div>
                <GradientText colors={["#22d3ee", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} animationSpeed={5}><h3 className="text-3xl font-bold font-['Orbitron']">{data.lab_title}</h3></GradientText>
              </div>
              <p className="text-slate-300 text-lg font-['Poppins'] leading-relaxed mb-8 max-w-3xl mx-auto">
                {data.lab_description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.lab_features.map((feature, index) => {
                  const Icon = featureIcons[feature.title] || Beaker;
                  return (
                    <div key={index} className="bg-slate-900/50 p-6 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group/card">
                      <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover/card:animate-pulse" />
                      <GradientText colors={["#40ffaa", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} className="mx-auto" animationSpeed={5}><h4 className="text-lg font-semibold  mb-2 font-['Orbitron']">{feature.title}</h4></GradientText>
                      <p className="text-slate-400 text-sm font-['Poppins']">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;