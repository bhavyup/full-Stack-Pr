import React, { useState, useEffect, useRef } from 'react';
import { adminApi, publicApi, handleApiError } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAdmin } from '../../context/AdminContext';
import { Sparkles, UploadCloud, FileText, DownloadCloud, UserPen } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileManager = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const { setSaveHandler, setIsSaving, fetchDashboardSummary } = useAdmin();

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await publicApi.getProfile();
        if (response.success && response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        handleApiError(error, toast);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await adminApi.uploadResume(file);
      if (response.success) {
        setProfileData(prev => ({ ...prev, resume_url: response.url }));
        toast({ title: "Success!", description: "Resume uploaded. Don't forget to save changes." });
      }
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setUploading(false);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    setSaving(true);
    try {
      await adminApi.updateProfile(profileData);
      toast({
        title: "Success!",
        description: "Your profile has been updated successfully.",
      });
      await fetchDashboardSummary();
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (profileData) {
      setSaveHandler(handleSubmit);
    }
    return () => setSaveHandler(null);
  }, [profileData, setSaveHandler]);

  if (loading) {
    return <p className="text-white animate-pulse">Loading Profile...</p>;
  }

  return (
    <div className="p-5 animate-fade-in">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-cyan-300 flex items-center gap-3">
          <UserPen className="w-6 h-6 text-cyan-400 animate-pulse" />
          Profile Manager
        </h2>
        <p className="text-sm text-slate-400 mt-1 ml-9">
          *Don’t forget to click "Save All Changes" after updating.
        </p>
      </motion.div>
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 text-white shadow-lg shadow-cyan-500/10">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in animate-duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="space-y-1.5">
                <label className="text-cyan-300 font-medium">Name</label>
                <Input name="name" value={profileData?.name || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20 focus:scale-[1.015] focus:ring-cyan-400 focus:ring-2 focus:outline-none focus-visible:shadow-lg transition-all duration-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-cyan-300 font-medium">Email</label>
                <Input name="email" type="email" value={profileData?.email || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20 focus:scale-[1.015] focus:ring-cyan-400 focus:ring-2 focus:outline-none focus-visible:shadow-lg transition-all duration-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-cyan-300 font-medium">LinkedIn URL</label>
                <Input name="linkedin" value={profileData?.linkedin || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20 focus:scale-[1.015] focus:ring-cyan-400 focus:ring-2 focus:outline-none focus-visible:shadow-lg transition-all duration-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-cyan-300 font-medium">Location</label>
                <Input name="location" value={profileData?.location || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20 focus:scale-[1.015] focus:ring-cyan-400 focus:ring-2 focus:outline-none focus-visible:shadow-lg transition-all duration-200" />
              </div>
            </div>

            <div className="grid grid-cols-12 space-y-1.5">
              <div className="col-span-1">
                {profileData?.profileImage && (
                  <img src={profileData.profileImage} alt="Preview" className="mt-2 w-20 h-20 rounded-full border border-cyan-500/30 shadow-md" />
                )}
              </div>
              <div className="col-span-11">
                <label className="text-cyan-300 font-medium">Profile Image URL</label>
                <Input name="profileImage" value={profileData?.profileImage || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-cyan-300 font-medium">Headline</label>
              <Textarea name="headline" value={profileData?.headline || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20 animate-fade-in animate-delay-200" />
            </div>

            <div className="space-y-1.5">
              <label className="text-cyan-300 font-medium">Bio</label>
              <Textarea name="bio" rows={5} value={profileData?.bio || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20 animate-fade-in animate-delay-300" />
            </div>

            <div className="space-y-1.5">
              <label className="text-cyan-300 font-medium">Highlights</label>
              <Input name="highlights" value={profileData?.highlights || ''} onChange={handleInputChange} className="bg-slate-700 border border-cyan-500/20 animate-fade-in animate-delay-400" />
            </div>

            <div className="p-4 border border-slate-700 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800/60 backdrop-blur-sm shadow-inner hover:shadow-cyan-400/10 transition-shadow duration-300">
              <h4 className="font-semibold text-purple-300 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5" /> Resume Management
              </h4>
              <div className="space-y-2">
                <label className="text-cyan-300 text-sm">Current Resume URL</label>
                <Input name="resume_url" value={profileData?.resume_url || ''} onChange={handleInputChange} placeholder="/static/your-resume.pdf" className="bg-slate-900/50 border border-cyan-500/10" />
                {profileData?.resume_url && (
                  <a href={profileData.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
                    <DownloadCloud className="w-4 h-4" /> Preview Resume
                  </a>
                )}
              </div>
              <div className="space-y-2 mt-3">
                <label className="text-cyan-300 text-sm">Upload New Resume (PDF)</label>
                <div className="flex items-center gap-3">
                  <Input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="bg-slate-800 border border-cyan-500/10 file:cursor-pointer file:rounded-md file:border-none file:bg-cyan-800/30 file:text-white file:transition-all file:hover:bg-cyan-700/50" disabled={uploading} />
                  {uploading && <UploadCloud className="w-5 h-5 text-cyan-400 animate-bounce" />}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManager;
