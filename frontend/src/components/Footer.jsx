import React from 'react';
import { Heart, Code2, Rocket } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-12 px-4 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
              Shreeya Das
            </h3>
            <p className="text-slate-400 font-['Poppins'] leading-relaxed">
              Crafting scalable cloud solutions with creativity and code. 
              Always learning, always building.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-['Poppins']">Built with React & FastAPI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-4">
            <h4 className="text-lg font-semibold text-white font-['Orbitron']">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-cyan-400 transition-colors font-['Poppins'] text-sm"
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

          {/* Opportunities */}
          <div className="text-center md:text-right space-y-4">
            <h4 className="text-lg font-semibold text-white font-['Orbitron']">Let's Connect</h4>
            <p className="text-slate-400 font-['Poppins'] text-sm leading-relaxed">
              Open to internships, learning projects, or creative tech collaborations!
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2 text-slate-500">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-['Poppins']">Ready for takeoff</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-sm font-['Poppins']">© {currentYear} Shreeya Swarupa Das</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-sm font-['Poppins']">Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm font-['Poppins']">and lots of curiosity</span>
          </div>

          <div className="text-sm text-slate-500 font-['Poppins']">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              Building the future, one line at a time
            </span>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/20 rounded-full animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;