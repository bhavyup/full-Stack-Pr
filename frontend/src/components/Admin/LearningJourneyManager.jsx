import React, { useState, useEffect } from "react";
import { adminApi, publicApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"; // Added Textarea import
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PlusCircle, Route, Trash2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";

const LearningJourneyManager = () => {
  const [journey, setJourney] = useState([]);
  // --- ADD THIS STATE for Growth Mindset ---
  const [growthMindset, setGrowthMindset] = useState({ title: "", quote: "" });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { fetchDashboardSummary } = useAdmin();

  useEffect(() => {
    // We fetch both sets of data now
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [journeyRes, mindsetRes] = await Promise.all([
          publicApi.getLearningJourney(),
          publicApi.getGrowthMindset(),
        ]);

        if (journeyRes.success && journeyRes.data) {
          const editableJourney = journeyRes.data.map((phase) => ({
            ...phase,
            skills: phase.skills.join(", "),
          }));
          setJourney(editableJourney);
        }

        if (mindsetRes.success && mindsetRes.data) {
          setGrowthMindset(mindsetRes.data);
        }
      } catch (error) {
        handleApiError(error, toast);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [toast]); // useEffect will now re-run if toast changes, which is fine.

  const handleInputChange = (index, field, value) => {
    const updatedJourney = [...journey];
    updatedJourney[index] = { ...updatedJourney[index], [field]: value };
    setJourney(updatedJourney);
  };

  // --- ADD THIS HANDLER for mindset form inputs ---
  const handleMindsetInputChange = (e) => {
    const { name, value } = e.target;
    setGrowthMindset((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePhase = async (index) => {
    const phase = journey[index];
    const { id, ...phaseData } = phase; // Exclude ID from payload
    const payload = {
      ...phaseData,
      skills: phase.skills.split(",").map((s) => s.trim()),
      order: Number(phase.order),
    };

    try {
      if (id) {
        await adminApi.updateLearningPhase(id, payload);
        toast({ title: "Phase updated!" });
        await fetchDashboardSummary();
      } else {
        await adminApi.createLearningPhase(payload);
        toast({ title: "Phase created!" });
        await fetchDashboardSummary();
      }
      // Re-fetch journey data after saving a phase to get the new ID
      const response = await publicApi.getLearningJourney();
      if (response.success && response.data) {
        const editableJourney = response.data.map((p) => ({
          ...p,
          skills: p.skills.join(", "),
        }));
        setJourney(editableJourney);
      }
    } catch (error) {
      handleApiError(error, toast);
    }
  };

  const handleAddPhase = () => {
    const newPhase = {
      phase: "New Phase",
      skills: "",
      status: "planned",
      order: journey.length + 1,
    };
    setJourney([...journey, newPhase]);
  };

  const handleDeletePhase = async (phaseId) => {
    if (window.confirm("Are you sure you want to delete this phase?")) {
      try {
        await adminApi.deleteLearningPhase(phaseId);
        toast({ title: "Phase deleted!" });
        await fetchDashboardSummary();
        // Re-fetch data after deleting
        const response = await publicApi.getLearningJourney();
        if (response.success && response.data) {
          const editableJourney = response.data.map((p) => ({
            ...p,
            skills: p.skills.join(", "),
          }));
          setJourney(editableJourney);
        }
      } catch (error) {
        handleApiError(error, toast);
      }
    }
  };

  // --- ADD THIS SAVE HANDLER for the mindset section ---
  const handleSaveMindset = async () => {
    try {
      await adminApi.updateGrowthMindset(growthMindset);
      toast({
        title: "Success!",
        description: "Growth Mindset section has been updated.",
      });
      await fetchDashboardSummary();
    } catch (error) {
      handleApiError(error, toast);
    }
  };

  if (loading) return <p className="text-white">Loading Data...</p>;

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          <Route className="inline mr-2 h-6 w-6 animate-pulse" />
          Learning/Growth Section Management
        </h2>
        <p className="text-sm text-slate-400 ml-8">
          *Each section has its own "Save" button beneath itself.
        </p>
        <p className="text-sm text-slate-400 ml-8">
          *Phases are directly saved through "Save Phase" button under the Phase
          Editor Card.
          <br />
          *Deleted Phases are updated itself when you click YES/OK.
        </p>
      </motion.div>

      <div className="space-y-8">
        {" "}
        {/* Changed from space-y-6 */}
        {/* --- ADD THIS CARD for the Growth Mindset editor --- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            <CardHeader>
              <CardTitle className="text-cyan-400">
                Manage Growth Mindset Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label>Title</label>
                <Input
                  name="title"
                  value={growthMindset.title || ""}
                  onChange={handleMindsetInputChange}
                  className="bg-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label>Quote</label>
                <Textarea
                  name="quote"
                  value={growthMindset.quote || ""}
                  onChange={handleMindsetInputChange}
                  rows={4}
                  className="bg-slate-700"
                />
              </div>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-2xl"
                onClick={handleSaveMindset}
              >
                Save Growth Mindset
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        {/* --- Your original Journey Manager code below --- */}
        <motion.div
          className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-end">
            <div className="space-y-0">
              <h2 className="text-2xl font-bold text-cyan-400">
                <BookOpen className="inline mr-2 h-6 w-6 animate-pulse" />
                Manage Learning Journey Phases
              </h2>
              <p className="text-sm text-slate-400 ml-8">
                *Counter against the Phase's Status signifies the order of
                visibility.
              </p>
              <p className="text-sm text-slate-400 ml-8">
                *Tinker them when you want to reorder the Phase Cards.
              </p>
            </div>
            <Button variant="save" onClick={handleAddPhase}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Phase
            </Button>
          </div>
        </motion.div>
        {journey
          .sort((a, b) => a.order - b.order)
          .map((phase, index) => (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                key={phase.id || index}
                className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow"
              >
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle className="text-cyan-400">Phase {phase.order}: {phase.phase}</CardTitle>
                  {phase.id && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePhase(phase.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Phase Title (e.g., Foundation)"
                    value={phase.phase}
                    onChange={(e) =>
                      handleInputChange(index, "phase", e.target.value)
                    }
                    className="bg-slate-700"
                  />
                  <Input
                    placeholder="Skills (comma-separated)"
                    value={phase.skills}
                    onChange={(e) =>
                      handleInputChange(index, "skills", e.target.value)
                    }
                    className="bg-slate-700"
                  />
                  <div className="flex gap-4">
                    <select
                      value={phase.status}
                      onChange={(e) =>
                        handleInputChange(index, "status", e.target.value)
                      }
                      className="w-full p-2 bg-slate-700 rounded-md"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                    <Input
                      type="number"
                      placeholder="Order"
                      value={phase.order}
                      onChange={(e) =>
                        handleInputChange(index, "order", e.target.value)
                      }
                      className="bg-slate-700 w-24"
                    />
                  </div>
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-2xl"
                    onClick={() => handleSavePhase(index)}
                  >
                    Save {phase.phase} Phase
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default LearningJourneyManager;
