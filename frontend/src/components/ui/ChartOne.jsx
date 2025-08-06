import React from 'react';
import ApexCharts from 'react-apexcharts';
import GCard from './GCardPO';

const ChartOne = ({ data, title }) => {
  const options = {
    legend: {
      show: false,
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      height: 335,
      type: 'area',
      toolbar: {
        show: false,
      },
      foreColor: '#AEB7C0'
    },
    // --- THIS IS THE FIX for the tooltip ---
    tooltip: {
        theme: 'dark' // This tells the tooltip to use dark-friendly colors
    },
    // --- END OF FIX ---
    responsive: [
      {
        breakpoint: 1024,
        options: { chart: { height: 300 } },
      },
      {
        breakpoint: 1366,
        options: { chart: { height: 350 } },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      borderColor: '#374151',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColors: ['#3C50E0', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: data.map(d => d.label),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { style: { fontSize: '0px' } },
      min: 0,
    },
  };
  
  const series = [
      {
          name: "Count",
          data: data.map(d => d.value)
      }
  ];

  return (
  <GCard>
    <div className="bg-slate-800/40 w-full h-full p-4">
      <h3 className="mt-2 text-2xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
        {title}
      </h3>
      <div className="w-full h-px bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent"></div>
      <div className="w-full h-px bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent blur-sm"></div>
      <div id="chartOne" className="w-full">
        <ApexCharts options={options} series={series} type="area" height={300} />
      </div>
    </div>
  </GCard>
);


};

export default ChartOne;