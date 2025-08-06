import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const BarChart = ({ data, title }) => {
  // Find the maximum value in the dataset, default to 1 if all are 0
  const maxValue = Math.max(...data.map(d => d.value)) || 1;

  return (
    <Card className="bg-slate-800/40 border-slate-700 backdrop-blur-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl text-white font-['Orbitron']">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        {/* --- THIS IS THE FINAL FIX --- */}
        <div className="w-full h-48 flex items-end justify-around gap-4 border-t border-slate-700 pt-4">
          {data.map((item, index) => {
            // Calculate height safely, ensuring it's 0 if the value is 0.
            const barHeight = (item.value / maxValue) * 100;

            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div className="text-white text-sm font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.value}
                </div>
                {/* The bar itself */}
                <div
                  className="w-3/4 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t-md transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                  style={{ height: `${barHeight}%` }}
                ></div>
                {/* The label at the bottom */}
                <span className="text-xs text-slate-400 mt-2 font-semibold pt-1 border-t border-transparent">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* --- END OF FINAL FIX --- */}
      </CardContent>
    </Card>
  );
};

export default BarChart;