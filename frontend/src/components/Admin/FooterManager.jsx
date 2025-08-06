import React, { useState, useEffect, use } from "react";
import { adminApi, publicApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link, PlusCircle, Trash2 } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";

const FooterManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { setSaveHandler, setIsSaving, fetchDashboardSummary } = useAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicApi.getFooter();
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

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...data.quick_links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setData((prev) => ({ ...prev, quick_links: updatedLinks }));
  };

  const addLink = () => {
    setData((prev) => ({
      ...prev,
      quick_links: [...prev.quick_links, { name: "", href: "" }],
    }));
  };

  const removeLink = (index) => {
    setData((prev) => ({
      ...prev,
      quick_links: prev.quick_links.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    setSaving(true);
    try {
      await adminApi.updateFooter(data);
      toast({ title: "Success!", description: "Footer updated successfully." });
      await fetchDashboardSummary();
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (data) {
      // Register the handleSubmit function with the layout
      setSaveHandler(handleSubmit);
    }
    // Cleanup function to remove the handler when the page is closed
    return () => setSaveHandler(null);
  }, [data, setSaveHandler]);

  if (loading) return <p className="text-white">Loading Footer Data...</p>;

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          <Link className="inline-block  mr-2 w-6 h-6 text-cyan-400 animate-pulse" />
          Footer Section Management
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
              <CardTitle className="text-cyan-400">Brand Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="brand_name"
                value={data?.brand_name || ""}
                onChange={handleInputChange}
                placeholder="Brand Name"
                className="bg-slate-700"
              />
              <Textarea
                name="brand_description"
                value={data?.brand_description || ""}
                onChange={handleInputChange}
                placeholder="Brand Description"
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
              <CardTitle className="text-cyan-400">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.quick_links.map((link, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={link.name}
                    onChange={(e) =>
                      handleLinkChange(index, "name", e.target.value)
                    }
                    placeholder="Link Name (e.g., About)"
                    className="bg-slate-700"
                  />
                  <Input
                    value={link.href}
                    onChange={(e) =>
                      handleLinkChange(index, "href", e.target.value)
                    }
                    placeholder="Link Href (e.g., #about)"
                    className="bg-slate-700"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLink(index)}
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
                onClick={addLink}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Link
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
              <CardTitle className="text-cyan-400">
                Let's Connect Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="connect_title"
                value={data?.connect_title || ""}
                onChange={handleInputChange}
                placeholder="Connect Title"
                className="bg-slate-700"
              />
              <Textarea
                name="connect_description"
                value={data?.connect_description || ""}
                onChange={handleInputChange}
                placeholder="Connect Description"
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
              <CardTitle className="text-cyan-400">Bottom Bar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="bottom_text"
                value={data?.bottom_text || ""}
                onChange={handleInputChange}
                placeholder="Bottom bar text"
                className="bg-slate-700"
              />
            </CardContent>
          </Card>
        </motion.div>
      </form>
    </div>
  );
};

export default FooterManager;
