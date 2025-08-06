import React, { useState, useEffect } from "react";
import { adminApi, publicApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Slider } from "../ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PlusCircle, Trash2, Save, Sparkles, Notebook } from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";

const SkillsManager = () => {
  const [skillsData, setSkillsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingCategory, setSavingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { toast } = useToast();
  const { fetchDashboardSummary } = useAdmin();



  const fetchSkillsData = async () => {
    setLoading(true);
    try {
      const response = await publicApi.getSkills();
      if (response.success && response.data) {
        setSkillsData(response.data);
      }
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, [toast]);

  const handleSkillChange = (category, index, field, value) => {
    const updatedSkills = [...skillsData[category]];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkillsData((prev) => ({ ...prev, [category]: updatedSkills }));
  };

  const addSkill = (category) => {
    const newSkill = { name: "New Skill", proficiency: 50 };
    setSkillsData((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newSkill],
    }));
  };

  const removeSkill = (category, index) => {
    const updatedSkills = skillsData[category].filter((_, i) => i !== index);
    setSkillsData((prev) => ({ ...prev, [category]: updatedSkills }));
  };

  const handleAddNewCategory = () => {
    if (newCategoryName && !skillsData[newCategoryName]) {
      const formattedCategoryName = newCategoryName
        .toLowerCase()
        .replace(/\s+/g, "-");
      setSkillsData((prev) => ({ ...prev, [formattedCategoryName]: [] }));
      setNewCategoryName("");
    }
  };

  const handleUpdateCategory = async (category) => {
    setSavingCategory(category);
    try {
      await adminApi.updateSkills(category, skillsData[category]);
      toast({
        title: "Success!",
        description: `Skills for '${category}' updated.`,
      });
      await fetchDashboardSummary();
      fetchSkillsData();
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setSavingCategory(null);
    }
  };

  const handleDeleteCategory = async (category) => {
    if (
      window.confirm(
        `Are you sure you want to delete the entire '${category}' category?`
      )
    ) {
      try {
        await adminApi.deleteSkillsCategory(category);
        toast({
          title: "Success!",
          description: `Category '${category}' has been deleted.`,
        });
        await fetchDashboardSummary();
        fetchSkillsData();
      } catch (error) {
        handleApiError(error, toast);
      }
    }
  };

  if (loading)
    return <p className="text-white animate-pulse">Loading Skills...</p>;

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-cyan-300 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          Skills Section Management
        </h2>
        <p className="text-sm text-slate-400 mt-1 ml-9 mb-5">
          *Each category has its own "Save" button. Click it after updates.
        </p>
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="save">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Create a New Skill Category</DialogTitle>
          </DialogHeader>
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., Frameworks"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="bg-slate-700"
            />
            <Button variant="save" onClick={handleAddNewCategory}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </motion.div>

      <div className="space-y-8 mt-6">
        {Object.keys(skillsData).map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="capitalize text-cyan-300 tracking-wide">
                  {category.replace("-", " ")}
                </CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCategory(category)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Category
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData[category]?.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <Input
                        value={skill.name}
                        onChange={(e) =>
                          handleSkillChange(
                            category,
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Skill Name"
                        className="bg-slate-700 w-1/3"
                      />
                      <Slider
                        value={[skill.proficiency]}
                        onValueChange={(value) =>
                          handleSkillChange(
                            category,
                            index,
                            "proficiency",
                            value[0]
                          )
                        }
                        max={100}
                        step={5}
                        className="w-2/3"
                      />
                      <span className="w-12 text-center text-cyan-400 font-semibold">
                        {skill.proficiency}%
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSkill(category, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="save"
                    size="sm"
                    onClick={() => addSkill(category)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                  </Button>
                </div>
                <div className="mt-6 border-t border-slate-700 pt-4 flex justify-end">
                  <Button
                    variant="save"
                    onClick={() => handleUpdateCategory(category)}
                    disabled={savingCategory === category}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {savingCategory === category
                      ? "Saving..."
                      : `Save ${category.replace("-", " ")}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
