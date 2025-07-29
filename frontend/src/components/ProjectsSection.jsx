import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, GitlabIcon as Github, Clock, CheckCircle } from 'lucide-react';
import { portfolioData } from '../mock';

const ProjectsSection = () => {
  const { projects } = portfolioData;

  const getStatusIcon = (status) => {
    return status === 'completed' ? 
      <CheckCircle className="w-4 h-4 text-green-400" /> : 
      <Clock className="w-4 h-4 text-yellow-400" />;
  };

  const getStatusBadge = (status) => {
    return status === 'completed' ? 
      <Badge className="bg-green-500/20 text-green-400 border-green-400/50">Completed</Badge> :
      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/50">Coming Soon</Badge>;
  };

  return (
    <section id="projects" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            Projects & Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto font-['Poppins']">
            Exploring the intersection of AI, automation, and creative problem-solving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  {getStatusBadge(project.status)}
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(project.status)}
                  <CardTitle className="text-xl font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-slate-300 mb-6 font-['Poppins'] leading-relaxed">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.status === 'completed' ? (
                    <>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:text-white hover:border-white flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      disabled
                      className="bg-slate-700 text-slate-400 cursor-not-allowed flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      In Development
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add More Projects CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-slate-800/40 to-purple-900/20 backdrop-blur-lg border border-slate-700/50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-white font-['Orbitron']">More Projects Coming Soon</h3>
              </div>
              <p className="text-slate-300 mb-6 font-['Poppins']">
                Currently working on exciting AI and automation projects. Stay tuned for updates!
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                Watch This Space
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;