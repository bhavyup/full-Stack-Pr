import React, { useState, useEffect } from "react";
import { adminApi, publicApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FlaskConical, PlusCircle, Trash2 } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";

const ExperimentsManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { setSaveHandler, setIsSaving, fetchDashboardSummary } = useAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicApi.getExperiments();
        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (error) {
        handleApiError(error, toast);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (listName, index, field, value) => {
    const updatedList = [...data[listName]];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setData((prev) => ({ ...prev, [listName]: updatedList }));
  };

  const addItem = (listName, newItem) => {
    setData((prev) => ({ ...prev, [listName]: [...prev[listName], newItem] }));
  };

  const removeItem = (listName, index) => {
    setData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    setSaving(true);
    try {
      await adminApi.updateExperimentsSection(data);
      toast({ title: "Success!", description: "Experiments section updated." });
      await fetchDashboardSummary();
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (data) setSaveHandler(handleSubmit);
    return () => setSaveHandler(null);
  }, [data, setSaveHandler]);

  if (loading) return <p className="text-white">Loading Experiments Data...</p>;

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          <FlaskConical className="inline-block mr-2 h-6 w-6" />
          Experiments Section Management
        </h2>
        <p className="text-sm text-slate-400 ml-8">
          *Do not forget to click on the "Save All Changes" button at the end of
          the side panel after making updates.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            <CardHeader>
              <CardTitle className="text-cyan-400">Header Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="header_title"
                value={data?.header_title || ""}
                onChange={handleInputChange}
                placeholder="Header Title"
                className="bg-slate-700"
              />
              <Textarea
                name="header_description"
                value={data?.header_description || ""}
                onChange={handleInputChange}
                placeholder="Header Description"
                className="bg-slate-700"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            <CardHeader>
              <CardTitle className="text-cyan-400">Innovation Lab</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="lab_title"
                value={data?.lab_title || ""}
                onChange={handleInputChange}
                placeholder="Lab Title"
                className="bg-slate-700"
              />
              <Textarea
                name="lab_description"
                value={data?.lab_description || ""}
                onChange={handleInputChange}
                placeholder="Lab Description"
                className="bg-slate-700"
              />
              <h4 className="font-semibold pt-4 text-cyan-400">Lab Features</h4>
              {data?.lab_features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={feature.title}
                    onChange={(e) =>
                      handleNestedChange(
                        "lab_features",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Feature Title"
                    className="bg-slate-700"
                  />
                  <Input
                    value={feature.description}
                    onChange={(e) =>
                      handleNestedChange(
                        "lab_features",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Feature Description"
                    className="bg-slate-700"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem("lab_features", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-2xl"
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("lab_features", { title: "", description: "" })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Feature
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            <CardHeader>
              <div className="grid grid-cols-4 items-center justify-between">
              <CardTitle className="text-cyan-400 col-span-3">Experiments List</CardTitle>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-2xl "
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("experiments", {
                    title: "",
                    description: "",
                    status: "planning",
                  })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Experiment
              </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.experiments.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 border border-slate-700 rounded-lg space-y-2"
                >
                  <Input
                    value={exp.title}
                    onChange={(e) =>
                      handleNestedChange(
                        "experiments",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Experiment Title"
                    className="bg-slate-700"
                  />
                  <Textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleNestedChange(
                        "experiments",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Experiment Description"
                    className="bg-slate-700"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={exp.status}
                      onChange={(e) =>
                        handleNestedChange(
                          "experiments",
                          index,
                          "status",
                          e.target.value
                        )
                      }
                      className="w-full p-2 bg-slate-700 rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="planning">Planning</option>
                    </select>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem("experiments", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Experiment
                    </Button>
                  </div>
                </div>
              ))}
              
            </CardContent>
          </Card>
        </motion.div>
      </form>
    </div>
  );
};

export default ExperimentsManager;
