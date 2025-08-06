import React, { useState, useEffect } from 'react';
import { Heart, Code2, Rocket } from 'lucide-react';
import { publicApi } from '../utils/api';
import { portfolioData } from '../mock'; // Fallback
import ShinyText from './ui/ShinyText';

const Footer = () => {
  const [data, setData] = useState(portfolioData.footer); // Use mock data
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicApi.getFooter();
        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  if (loading || !data) {
      return <footer>{/* Optional: Add a loading skeleton for the footer */}</footer>;
  }

  return (
    <footer className="relative z-10 py-12 px-4 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
              {data.brand_name}
            </h3>
            <p className="text-slate-400 font-['Poppins'] leading-relaxed">
              {data.brand_description}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-['Poppins']">Built with React & FastAPI</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {data.quick_links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-cyan-400 transition-colors font-['Poppins'] text-sm focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center md:text-right space-y-4">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">{data.connect_title}</h4>
            <p className="text-slate-400 font-['Poppins'] text-sm leading-relaxed">
              {data.connect_description}
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2 text-slate-500">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-['Poppins']">Ready for takeoff</span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-sm font-['Poppins']">© {currentYear} {data.brand_name}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <ShinyText text="Made with" speed={2} disabled={false} className="text-sm font-['Poppins']" />
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <ShinyText text="and lots of curiosity" speed={2} disabled={false} className="text-sm font-['Poppins']" />
          </div>
          <div className="text-sm text-slate-500 font-['Poppins']">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              {data.bottom_text}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;