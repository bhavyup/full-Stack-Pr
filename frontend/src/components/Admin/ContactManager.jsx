import React, { useState, useEffect } from "react";
import { adminApi, publicApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Contact, PlusCircle, Trash2 } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";

const ContactManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { setSaveHandler, setIsSaving, fetchDashboardSummary } = useAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicApi.getContactSection();
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
    const updatedLinks = [...data.contact_links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setData((prev) => ({ ...prev, contact_links: updatedLinks }));
  };

  const addLink = () => {
    setData((prev) => ({
      ...prev,
      contact_links: [
        ...prev.contact_links,
        { name: "", value: "", icon: "Link" },
      ],
    }));
  };

  const removeLink = (index) => {
    setData((prev) => ({
      ...prev,
      contact_links: prev.contact_links.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    setSaving(true);
    try {
      await adminApi.updateContactSection(data);
      toast({ title: "Success!", description: "Contact section updated." });
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

  if (loading) return <p className="text-white">Loading Contact Data...</p>;

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          <Contact className="inline-block mr-2 h-6 w-6 text-cyan-500 animate-pulse" />
        Contact Section Management
      </h2>
      <p className="text-sm text-slate-400 ml-9">
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
            />
            <Textarea
              name="header_description"
              value={data?.header_description || ""}
              onChange={handleInputChange}
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
              <CardTitle className="text-cyan-400">"Let's Connect" Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <Input
              name="connect_title"
              value={data?.connect_title || ""}
              onChange={handleInputChange}
            />
            <Textarea
              name="connect_description"
              value={data?.connect_description || ""}
              onChange={handleInputChange}
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
              <CardTitle className="text-cyan-400">"Contact Links" Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <Input
              name="get_in_touch_title"
              value={data?.get_in_touch_title || ""}
              onChange={handleInputChange}
            />
            <Textarea
              name="get_in_touch_description"
              value={data?.get_in_touch_description || ""}
              onChange={handleInputChange}
            />
            <h4 className="font-semibold pt-4 text-cyan-400">Contact Links</h4>
            <div
              name="test"
              className="grid grid-cols-4 gap-2 items-center px-1"
            >
              <h6 className="text-sm text-slate-600">Name</h6>
              <h6 className="text-sm text-slate-600">Value/Link</h6>
              <h6 className="text-sm text-slate-600">
                Platform Icon
                <br />
                (e.g. Instagram or Discord)
              </h6>
              <h6 className="text-sm text-slate-600">
                Color
                <br />
                Same as Icons for its color-coding
              </h6>
            </div>
            {data?.contact_links.map((link, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-center">
                <Input
                  value={link.name}
                  onChange={(e) =>
                    handleLinkChange(index, "name", e.target.value)
                  }
                  placeholder="Name (e.g., Email)"
                />
                <Input
                  value={link.value}
                  onChange={(e) =>
                    handleLinkChange(index, "value", e.target.value)
                  }
                  placeholder="Value (e.g., test@test.com)"
                />
                <Input
                  value={link.icon}
                  onChange={(e) =>
                    handleLinkChange(index, "icon", e.target.value)
                  }
                  placeholder="Icon (add Fa or Si prefix if N/A)"
                />
                <div className="flex gap-2">
                  <Input
                    value={link.color}
                    onChange={(e) =>
                      handleLinkChange(index, "color", e.target.value)
                    }
                    placeholder="only Icon (e.g., Discord)"
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
      </form>
    </div>
  );
};

export default ContactManager;
