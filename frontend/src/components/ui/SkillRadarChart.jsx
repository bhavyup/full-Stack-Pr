import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import GCardTS from './GCardTS';

const SkillRadarChart = ({ skills }) => {
  // Get the top skills based on proficiency
  const allSkills = Object.values(skills).flat();
  const topSkills = allSkills.sort((a, b) => b.proficiency - a.proficiency).slice(0, 15);

  const options = {
    chart: {
      type: 'radar',
      toolbar: { show: false },
      foreColor: '#AEB7C0'
    },
    xaxis: {
      categories: topSkills.map(s => s.name),
    },
    yaxis: {
        show: false,
    },
    stroke: {
      width: 2,
      colors: ['#8B5CF6']
    },
    fill: {
      opacity: 0.2,
      colors: ['#8B5CF6']
    },
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColors: ['#8B5CF6'],
      strokeWidth: 2,
    },
    tooltip: {
        theme: 'dark'
    }
  };

  const series = [{
    name: 'Proficiency',
    data: topSkills.map(s => s.proficiency),
  }];

  return (
    <GCardTS>
        <div className="w-full h-full">
    <div className="rounded-[5px] bg-slate-800/40 p-6 h-full w-full">
  {/* Header */}
  <div className="mb-4">
    <h2 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
      Top Skills Overview
      <div className="w-full h-px bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent"></div>
      <div className="w-full h-px bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent blur-sm"></div>
    </h2>
  </div>

  {/* Content */}
  <div className="p-0">
    <div className="h-96 w-full">
      <ApexCharts
        options={options}
        series={series}
        type="radar"
        width="100%"
        height="100%"
      />
    </div>
  </div>
</div>

    </div>
    </GCardTS>
  );
};

export default SkillRadarChart;