import React, { useState, useEffect } from "react";
import { adminApi, publicApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  PlusCircle,
  Edit,
  Trash2,
  Save,
  ExternalLink,
  Github,
  FolderGit2,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";

const ProjectForm = ({ project, onSave, closeDialog }) => {
  const [formData, setFormData] = useState(
    project || {
      title: "",
      description: "",
      status: "coming-soon",
      image: "",
      liveUrl: "",
      githubUrl: "",
      technologies: "",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies:
        typeof formData.technologies === "string"
          ? formData.technologies.split(",").map((t) => t.trim())
          : formData.technologies,
    };
    onSave(projectData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {["title", "image", "liveUrl", "githubUrl", "technologies"].map(
        (field, index) => (
          <label
            key={index}
            className="text-sm font-medium text-slate-300 flex flex-col gap-2"
          >
            {field === "technologies"
              ? "Tech Used (comma-separated):"
              : field === "title"
              ? "Name:"
              : `${field.charAt(0).toUpperCase() + field.slice(1)}:`}
            <Input
              name={field}
              placeholder={
                field === "technologies"
                  ? "React, FastAPI, TailwindCSS"
                  : `${field.charAt(0).toUpperCase() + field.slice(1)} URL`
              }
              value={
                Array.isArray(formData[field])
                  ? formData[field].join(", ")
                  : formData[field]
              }
              onChange={handleInputChange}
              required={["title", "image"].includes(field)}
              className="bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-cyan-500"
            />
          </label>
        )
      )}
      <label className="text-sm font-medium text-slate-300 flex flex-col gap-2">
        Description:
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500"
        />
      </label>
      <label className="text-sm font-medium text-slate-300 flex flex-col gap-2">
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-white"
        >
          <option value="coming-soon">Coming Soon</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <Button
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl transition-all duration-300"
        type="submit"
      >
        <Save className="mr-2 h-4 w-4" /> Save Project
      </Button>
    </form>
  );
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { toast } = useToast();
  const { setSaveHandler, fetchDashboardSummary } = useAdmin();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await publicApi.getProjects();
      if (response.success) {
        setProjects(response.data);
      }
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSaveHandler(null);
  }, [setSaveHandler]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = async (projectData) => {
    try {
      if (editingProject) {
        await adminApi.updateProject(editingProject.id, projectData);
        toast({ title: "Project updated!" });
        await fetchDashboardSummary();
      } else {
        await adminApi.createProject(projectData);
        toast({ title: "Project created!" });
        await fetchDashboardSummary();
      }
      setIsDialogOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      handleApiError(error, toast);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await adminApi.deleteProject(projectId);
        toast({ title: "Project deleted!" });
        await fetchDashboardSummary();
        fetchProjects();
      } catch (error) {
        handleApiError(error, toast);
      }
    }
  };

  const openDialog = (project = null) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-cyan-300 flex items-center gap-3">
          <FolderGit2 className="w-6 h-6 text-cyan-400 animate-pulse" />
          Projects Management
        </h2>
        <p className="text-sm text-slate-400 mt-1 ml-9">
           *Projects are directly saved through "Save Projects" button inside the
          Editor Dialog Box.
        </p>
        <p className="text-sm text-slate-400 mt-1 ml-9">
           *Deleted Projects are updated itself when you click YES/OK.
        </p>
      </motion.div>
      
      <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-cyan-400 ">Manage Projects</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-xl rounded-xl transition-all duration-300"
                onClick={() => openDialog()}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border border-slate-700 text-white rounded-xl backdrop-blur-md shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-purple-300 text-lg font-semibold">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </DialogTitle>
              </DialogHeader>
              <ProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                closeDialog={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-cyan-400">Title</TableHead>
                <TableHead className="text-cyan-400">Status</TableHead>
                <TableHead className="text-cyan-400">Links</TableHead>
                <TableHead className="text-cyan-400">Tech</TableHead>
                <TableHead className="text-cyan-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="transition duration-300 hover:bg-slate-800"
                >
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-500"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-slate-700 text-xs text-white px-2 py-0.5 rounded-full border border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-md rounded-md"
                      size="sm"
                      onClick={() => openDialog(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md rounded-md"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsManager;
