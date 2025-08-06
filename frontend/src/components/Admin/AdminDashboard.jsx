import React, { useState, useEffect } from "react";
import { adminApi, publicApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { useAdmin } from "../../context/AdminContext";
import { Briefcase, MessageSquare, Lightbulb, Users, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import ChartOne from "../ui/ChartOne"; // Corrected path
import SkillRadarChart from "../ui/SkillRadarChart"; // Import new components
import ProjectTimeline from "../ui/ProjectTimeline";
import FlippyCard from "../ui/FlippyCard";
import GCardM from "../ui/GCardMSG";
import { motion } from "framer-motion";

const DataCard = ({ title, value, children }) => (
  <div className="rounded-lg border border-slate-700 bg-slate-800/40 py-6 px-7 shadow-xl">
    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-slate-900/50">
      {children}
    </div>
    <div className="mt-4 flex items-end justify-between">
      <div>
        <h4 className="text-2xl font-bold text-white">{value}</h4>
        <span className="text-sm font-medium text-slate-400">{title}</span>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [skills, setSkills] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { setSaveHandler } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    setSaveHandler(null);
  }, [setSaveHandler]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, skillsRes, projectsRes] = await Promise.all([
          adminApi.getDashboardSummary(),
          publicApi.getSkills(),
          publicApi.getProjects(),
        ]);

        if (summaryRes.success) setSummary(summaryRes.data);
        if (skillsRes.success) setSkills(skillsRes.data);
        if (projectsRes.success) setProjects(projectsRes.data);
      } catch (error) {
        handleApiError(error, toast);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [toast]);

  if (loading || !summary) {
    return <p className="text-white">Loading Dashboard...</p>;
  }

  const chartData = [
    { label: "Projects", value: summary.project_count },
    { label: "Messages", value: summary.message_count },
    { label: "Skills", value: summary.skill_category_count },
  ];

  return (
    <div className="p-8">
      <motion.div
        className="w-full mb-10 bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5  shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          <LayoutDashboard className="inline-block w-6 h-6 mr-2 animate-pulse"/>
          Dashboard</h2>
        <p className="text-sm text-slate-400 ml-8">
          <a className="underline text-blue-600 hover:text-blue-700" href="/">
            Home
          </a>{" "}
          / Dashboard
        </p>
      </motion.div>

      <div className=" max-w-screen-2xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 mb-10">
          <motion.div
            className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg hover:shadow-cyan-500/10 transition-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FlippyCard
              title="Total Projects"
              badge={<Briefcase className="w-8 h-8 text-green-400" />}
              value={summary.project_count}
              imageUrl={"#"}
            />
          </motion.div>

          <motion.div
            className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg hover:shadow-cyan-500/10 transition-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FlippyCard
              title="Unread Messages"
              badge={<MessageSquare className="w-8 h-8 text-purple-400" />}
              value={summary.unread_message_count}
              imageUrl={"#"}
            />
          </motion.div>

          <motion.div
            className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg hover:shadow-cyan-500/10 transition-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FlippyCard
              title="Skill Categories"
              badge={<Lightbulb className="w-8 h-8 text-yellow-400" />}
              value={summary.skill_category_count}
              imageUrl={"#"}
            />
          </motion.div>
          <motion.div
            className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg hover:shadow-cyan-500/10 transition-shadow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FlippyCard
              title="Total Messages"
              badge={<Users className="w-8 h-8 text-pink-400" />}
              value={summary.message_count}
              imageUrl={"#"}
            />
          </motion.div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ChartOne data={chartData} title="Portfolio Overview" />
            </motion.div>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GCardM>
                <div className="w-full h-full ">
                  <div className="rounded-[5px] bg-slate-800/40 p-6 h-full w-full">
                    {/* Header */}
                    <div className="p-0 mb-2 flex flex-row items-center justify-between">
                      <h2 className="text-base md:text-base font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-['Orbitron']">
                        Recent Messages
                        <div className="w-full h-px bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent"></div>
                        <div className="w-full h-px bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent blur-sm"></div>
                      </h2>

                      <button
                        className="text-cyan-400 hover:text-cyan-500 text-sm px-2 py-1 rounded"
                        onClick={() => navigate("/admin/messages")}
                      >
                        View All
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-0">
                      {summary.recent_messages.length > 0 ? (
                        summary.recent_messages.map((msg) => (
                          <div className="p-1 mb-2 bg-slate-900 rounded-md outline outline-1 outline-purple-300 flex flex-col gap-5">
                            <div
                              key={msg.id}
                              className="flex items-center gap-4"
                            >
                              <div className="flex-1">
                                <h5 className="font-medium text-white">
                                  {msg.name}
                                </h5>
                                <p className="text-sm text-slate-400 truncate">
                                  {msg.message}
                                </p>
                              </div>
                              <span className="text-xs text-slate-500">
                                {new Date(msg.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-slate-500 py-10">
                          No new messages.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </GCardM>
            </motion.div>
          </div>
        </div>

        {/* --- ADDED NEW COMPONENTS ROW --- */}
        <div className="mt-10 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SkillRadarChart skills={skills} />
            </motion.div>
          </div>
          <div className="col-span-12 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectTimeline projects={projects} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
