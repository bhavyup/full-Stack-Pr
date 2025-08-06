import React, { useState, useEffect } from 'react';
import { adminApi, publicApi, handleApiError } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAdmin } from '../../context/AdminContext';
import { PlusCircle, Trash2, Sparkles, SquareChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperienceManager = () => {
  const [experienceData, setExperienceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { setSaveHandler, setIsSaving, fetchDashboardSummary } = useAdmin();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await publicApi.getExperience();
      if (response.success && response.data) {
        setExperienceData(response.data);
      }
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await adminApi.updateExperience(experienceData);
      toast({ title: "Success!", description: "Experience section updated." });
      await fetchDashboardSummary();
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (experienceData) {
      setSaveHandler(handleSubmit);
    }
    return () => setSaveHandler(null);
  }, [experienceData, setSaveHandler]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (index, field, value) => {
    const updatedGoals = [...experienceData.goals];
    updatedGoals[index] = { ...updatedGoals[index], [field]: value };
    setExperienceData(prev => ({ ...prev, goals: updatedGoals }));
  };

  const addGoal = () => {
    const newGoal = { title: 'New Goal', description: 'A brief description' };
    setExperienceData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const removeGoal = (indexToRemove) => {
    setExperienceData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, index) => index !== indexToRemove)
    }));
  };

  if (loading) return <p className="text-white">Loading Experience Data...</p>;

  return (
    <div className="p-6">
      <motion.div
              className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
        <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-3">
          <SquareChevronUp className="text-cyan-400 w-6 h-6" />
          Experience Section Management</h2>
        <p className="text-sm text-slate-400 ml-9">*Do not forget to click the "Save Changes" button in the side panel after making edits.</p>
      </motion.div>
      

      <div className="space-y-6">
        <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
          <CardHeader>
            <CardTitle className="text-cyan-400">Manage Experience Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label>Main Title</label>
              <Input name="main_title" value={experienceData?.main_title || ''} onChange={handleInputChange} className="bg-slate-700" />
            </div>
            <div className="space-y-2">
              <label>Main Message</label>
              <Textarea name="main_message" value={experienceData?.main_message || ''} onChange={handleInputChange} rows={3} className="bg-slate-700" />
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-600 pb-2">
                <h3 className="text-lg font-semibold text-cyan-400">Future Goals</h3>
                <Button type="button" variant="save" size="sm" onClick={addGoal}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
                </Button>
              </div>
              {experienceData?.goals?.map((goal, index) => (
                <div key={index} className="flex gap-4 items-center p-4 border border-slate-700 rounded-lg">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Goal Title" value={goal.title} onChange={(e) => handleGoalChange(index, 'title', e.target.value)} className="bg-slate-700" />
                    <Input placeholder="Goal Description" value={goal.description} onChange={(e) => handleGoalChange(index, 'description', e.target.value)} className="bg-slate-700" />
                  </div>
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeGoal(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-4">
              <h3 className="text-lg font-semibold border-b border-slate-600 pb-2 text-cyan-400">Call to Action</h3>
              <div className="space-y-2">
                <label>CTA Title</label>
                <Input name="cta_title" value={experienceData?.cta_title || ''} onChange={handleInputChange} className="bg-slate-700" />
              </div>
              <div className="space-y-2">
                <label>CTA Message</label>
                <Textarea name="cta_message" value={experienceData?.cta_message || ''} onChange={handleInputChange} rows={3} className="bg-slate-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExperienceManager;
