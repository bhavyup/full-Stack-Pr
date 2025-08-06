import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import * as LucideIcons from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { useToast } from '../hooks/use-toast';
import { publicApi, handleApiError } from '../utils/api';
import { portfolioData } from '../mock';
import ShinyText from './ui/ShinyText';
import GradientText from '@/ui/TextAnimations/GradientText/GradientText';

const ContactSection = () => {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(portfolioData.profile);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [contactRes, profileRes] = await Promise.all([
          publicApi.getContactSection(),
          publicApi.getProfile()
        ]);
        if (contactRes.success) setData(contactRes.data);
        if (profileRes.success) setProfile(profileRes.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await publicApi.submitContactForm(formData);
      toast({ title: "Message Sent!", description: "Thank you for reaching out." });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !data) {
    return <section id="contact" className="py-20 px-4">{/* Loading UI */}</section>;
  }

   const getIcon = (iconName) => {
    let IconComponent = FaIcons["Fa"+iconName];

    if (!IconComponent) {
      IconComponent = SiIcons["Si"+iconName];
    }
    
    if (!IconComponent) {
      IconComponent = LucideIcons[iconName];
    }

    return IconComponent ? <IconComponent className="w-6 h-6 text-white" /> : <LucideIcons.Link className="w-6 h-6 text-white" />;
  };

  const getLinkHref = (link) => {
      if (link.name.toLowerCase() === 'email') return `mailto:${link.value}`;
      return `${link.value}`;
  };
  
  const getColorClasses = (color) => {
    const colorMap = {
      Mail: { bg: 'from-cyan-400 to-blue-500', hover: 'hover:border-cyan-400/50', text: 'text-cyan-400' },
      MapPin: { bg: 'from-green-400 to-teal-500', hover: 'hover:border-green-400/50', text: 'text-green-400' },
      Phone: { bg: 'from-emerald-400 to-green-600', hover: 'hover:border-emerald-400/50', text: 'text-emerald-400' },
  
  // Professional & Social
      Linkedin: { bg: 'from-blue-500 to-sky-600', hover: 'hover:border-blue-400/50', text: 'text-blue-400' },  
      Twitter: { bg: 'from-sky-400 to-cyan-300', hover: 'hover:border-sky-400/50', text: 'text-sky-400' },
      Instagram: { bg: 'from-yellow-400 via-pink-500 to-purple-600', hover: 'hover:border-pink-400/50', text: 'text-pink-400' },
      Facebook: { bg: 'from-blue-600 to-indigo-700', hover: 'hover:border-blue-500/50', text: 'text-blue-500' },
  
  // Development & Code
      Github: { bg: 'from-gray-700 to-gray-900', hover: 'hover:border-gray-500/50', text: 'text-gray-300' },
      Gitlab: { bg: 'from-orange-500 to-red-600', hover: 'hover:border-orange-400/50', text: 'text-orange-400' },
      Codepen: { bg: 'from-gray-400 to-gray-600', hover: 'hover:border-gray-300/50', text: 'text-gray-300' },

  // Media
      Youtube: { bg: 'from-red-500 to-red-700', hover: 'hover:border-red-400/50', text: 'text-red-400' },
      Twitch: { bg: 'from-purple-500 to-indigo-600', hover: 'hover:border-purple-400/50', text: 'text-purple-400' },
      Spotify: { bg: 'from-green-400 to-emerald-500', hover: 'hover:border-green-400/50', text: 'text-green-400' },

  // Messaging
      Discord: { bg: 'from-indigo-500 to-purple-600', hover: 'hover:border-indigo-400/50', text: 'text-indigo-400' },
      Telegram: { bg: 'from-sky-400 to-blue-500', hover: 'hover:border-sky-400/50', text: 'text-sky-400' },
      Slack: { bg: 'from-purple-600 to-pink-600', hover: 'hover:border-purple-500/50', text: 'text-purple-500' },
    };
    return colorMap[color] || { bg: 'from-gray-400 to-gray-600', hover: 'hover:border-gray-400/50', text: 'text-gray-400' };
  };

  return (
    <section id="contact" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
            {data.header_title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
          <ShinyText text={data.header_description} speed={2} disabled={false} className="max-w-2xl mx-auto font-['Poppins']" />
        </div>

        <Card className="bg-gradient-to-r from-slate-800/40 to-purple-900/20 backdrop-blur-lg border-slate-700/50 mb-12 max-w-4xl mx-auto">
          <CardContent className="p-8 text-center">
            <GradientText colors={["#40ffaa", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} className="mx-auto" animationSpeed={5}><h3 className="text-2xl font-bold mb-4 font-['Orbitron']">{data.connect_title}</h3></GradientText>
            <p className="text-slate-300 mb-6 font-['Poppins']">
              {data.connect_description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <Button className="bg-gradient-to-r from-cyan-500 to-blue-600" asChild>
                  <a href={profile.calendly_url || '#'} target="_blank" rel="noopener noreferrer">Schedule a Chat</a>
               </Button>
               <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white" asChild>
                  <a href={profile.resume_url ? `${process.env.REACT_APP_BACKEND_URL}${profile.resume_url}` : '#'} target="_blank" rel="noopener noreferrer">View Resume</a>
               </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="bg-slate-800/40 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-['Orbitron']">
                <LucideIcons.MessageCircle className="w-6 h-6 text-cyan-400" /> <GradientText className="text-2x1 font-semibold font-['Orbitron']" colors={["#40ffaa", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} animationSpeed={5}>{data.get_in_touch_title}</GradientText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 leading-relaxed font-['Poppins']">
                {data.get_in_touch_description}
              </p>
              <div className="space-y-4">
                  {data.contact_links.map((link, index) => {
                    const colors = getColorClasses(link.color);
                    return (
                        <a key={index} href={getLinkHref(link)} target="_blank" rel="noopener noreferrer" 
                           className={`flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 transition-all duration-300 group/item ${colors.hover}`}>
                            <div className={`w-12 h-12 bg-gradient-to-r ${colors.bg} rounded-full flex items-center justify-center group-hover/item:animate-pulse`}>
                                {getIcon(link.icon)}
                            </div>
                            <div>
                                <div className={`${colors.text} font-semibold font-['Orbitron']`}>{link.name}</div>
                            </div>
                        </a>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white font-['Orbitron']">
                <LucideIcons.Send className="w-6 h-6 text-cyan-400" /><GradientText colors={["#40ffaa", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} className="font-semibold" animationSpeed={5}>Send a Message</GradientText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" required disabled={submitting} className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" required disabled={submitting} className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Message</label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your message..." rows={5} required disabled={submitting} className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"/>
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600">
                  <LucideIcons.Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;