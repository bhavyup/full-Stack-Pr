import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, Zap } from 'lucide-react';
import GCardPS from './GCardPS'; // Assuming GCardPS is a styled component similar to GCardTS

const ProjectTimeline = ({ projects }) => {

  // --- THIS IS THE FIX ---
  // Sorts the projects array to show 'completed' status first.
  const sortedProjects = projects.slice().sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') {
      return -1; // 'a' (completed) comes before 'b'
    }
    if (b.status === 'completed' && a.status !== 'completed') {
      return 1; // 'b' (completed) comes before 'a'
    }
    return 0; // Keep original order if statuses are the same
  });
  // --- END OF FIX ---

  return (
    <GCardPS>
        <div className="w-full h-full">
    <div className="rounded-[5px] bg-slate-800/40 p-5  h-full w-full">
  {/* Header */}
  <div className="p-0 mb-2">
    <h2 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron'] mb-2">
      Project Status
      <div className="w-full h-px bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent"></div>
      <div className="w-full h-px bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent blur-sm"></div>
    </h2>
  </div>

  {/* Content */}
  <div className="p-0">
    <div className="relative border-l-2 border-slate-700 ml-3">
      {sortedProjects.slice(0, 4).map((project, index) => (
        <div
          key={project.id || index}
          className="mb-8 pl-8 relative"
        >
          <div
            className={`absolute -left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
              project.status === 'completed'
                ? 'bg-green-500/20'
                : 'bg-cyan-500/20'
            }`}
          >
            {project.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Zap className="w-5 h-5 text-cyan-400" />
            )}
          </div>
          <h4
            className={`font-semibold ${
              project.status === 'completed'
                ? 'text-slate-500'
                : 'text-slate-200'
            }`}
          >
            {project.title}
          </h4>
          <p
            className={`text-sm capitalize ${
              project.status === 'completed'
                ? 'text-green-400'
                : 'text-cyan-400'
            }`}
          >
            {project.status.replace('-', ' ')}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
    </GCardPS>
  );
};

export default ProjectTimeline;