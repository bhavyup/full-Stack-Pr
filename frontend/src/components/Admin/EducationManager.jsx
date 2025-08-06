import React, { useState, useEffect } from 'react';
import { adminApi, publicApi, handleApiError } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';
import { useAdmin } from '../../context/AdminContext';
import { Sparkles, University } from 'lucide-react';
import { motion } from 'framer-motion';

const EducationManager = () => {
  const [educationData, setEducationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { setSaveHandler, setIsSaving, fetchDashboardSummary } = useAdmin();

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await publicApi.getEducation();
        if (response.success && response.data) {
          setEducationData(response.data);
        }
      } catch (error) {
        handleApiError(error, toast);
      } finally {
        setLoading(false);
      }
    };
    fetchEducationData();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSliderChange = (value) => {
    setEducationData(prevData => ({ ...prevData, progress: value[0] }));
  };

  const handleSubmit = async (e) => {
    setSaving(true);
    try {
      const payload = {
        ...educationData,
        progress: Number(educationData.progress)
      };
      await adminApi.updateEducation(payload);
      toast({
        title: "Success!",
        description: "Your education details have been updated.",
      });
      await fetchDashboardSummary();
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (educationData) setSaveHandler(handleSubmit);
    return () => setSaveHandler(null);
  }, [handleSubmit, setSaveHandler]);

  if (loading) {
    return <p className="text-white">Loading Education Data...</p>;
  }

  return (
    <div className="p-6">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-cyan-300 flex items-center gap-3">
          <University className="w-6 h-6 text-cyan-400 animate-pulse" />
          Education Section Management
        </h2>
        <p className="text-sm text-slate-400 mt-1 ml-9">
          *Do not forget to click the "Save Changes" button in the side panel after making edits.
        </p>
      </motion.div>

      <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
        <CardHeader>
          <CardTitle className="text-cyan-300">Manage Education</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-slate-300">Degree</label>
                <Input name="degree" value={educationData?.degree || ''} onChange={handleInputChange} className="bg-slate-700 focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="space-y-2">
                <label className="text-slate-300">Institution</label>
                <Input name="institution" value={educationData?.institution || ''} onChange={handleInputChange} className="bg-slate-700 focus:ring-2 focus:ring-cyan-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-300">Year of Completion (Expected)</label>
              <Input name="year" value={educationData?.year || ''} onChange={handleInputChange} className="bg-slate-700 focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div className="space-y-2">
              <label className="text-slate-300">Progress</label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[educationData?.progress || 0]}
                  onValueChange={handleSliderChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <span className="w-16 text-center p-2 bg-slate-700 rounded-md text-cyan-300 font-semibold">
                  {educationData?.progress || 0}%
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationManager;
