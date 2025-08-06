import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { adminApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Bot,
  MessageSquare,
  Mail,
  LogOut,
  Star,
  GitBranch,
  FlaskConical,
  Terminal,
  Save,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import AdminHeader from "./AdminHeader";
import BGGrid from "./BGGrid";

const FloatingSaveButton = () => {
  const { isSaveVisible, isSaving, onSave } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = (e) => {
    if (e) e.preventDefault();
    onSave();
  };

  const handleLogout = async () => {
    try {
      await adminApi.logoutNotify();
    } catch (error) {
      console.error("Failed to notify logout", error);
    } finally {
      adminApi.logout();
      toast({ title: "Logged out successfully." });
      navigate("/admin/login");
    }
  };

  return (
    <div className="fixed bottom-10 left-5 z-50 flex flex-col space-y-5 w-[220px]">
      {isSaveVisible && (
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] animate-pulse hover:animate-none hover:scale-[1.03] hover:brightness-110 transition-all duration-300"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="mr-2 h-5 w-5" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      )}
      <Button
        size="lg"
        variant="destructive"
        className="w-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-5 w-5" />
        Logout
      </Button>
    </div>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    setAdminProfile,
    setSummary,
    setUnreadNotifCount,
    fetchDashboardSummary,
  } = useAdmin();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [profileResponse, summaryResponse] = await Promise.all([
          adminApi.getAdminProfile(),
          adminApi.getDashboardSummary(),
          fetchDashboardSummary(),
        ]);

        if (profileResponse) {
          setAdminProfile(profileResponse);
        }
        if (summaryResponse.success) {
          setSummary(summaryResponse.data);
          setUnreadNotifCount(summaryResponse.data.unread_notification_count);
        }
      } catch (error) {
        console.error("Failed to fetch initial admin data", error);
      }
    };

    fetchInitialData();
    const intervalId = setInterval(() => {
      fetchDashboardSummary();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [setAdminProfile, setSummary, setUnreadNotifCount, fetchDashboardSummary]);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/admin/profile", icon: User },
    { name: "Projects", path: "/admin/projects", icon: Briefcase },
    { name: "Skills", path: "/admin/skills", icon: Lightbulb },
    { name: "Education", path: "/admin/education", icon: GraduationCap },
    { name: "Experience", path: "/admin/experience", icon: Star },
    {
      name: "Learning Journey",
      path: "/admin/learning-journey",
      icon: GitBranch,
    },
    { name: "Experiments", path: "/admin/experiments", icon: FlaskConical },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare },
    { name: "Contact", path: "/admin/contact", icon: Mail },
    { name: "Footer", path: "/admin/footer", icon: Terminal },
    { name: "Managers", path: "/admin/manage-admins", icon: Bot },
  ];

  return (
    <div className="relative min-h-screen bg-[#060111] text-white font-sans">
      <div className="absolute inset-0 z-0 h-full w-full">
        <BGGrid
          gravity={0.01}
          wallBounce={0.9}
          friction={0.98}
          count={100}
          colors={[0x1e293b, 0x06b6d4, 0x8b5cf6]}
          minSize={0.4}
          maxSize={1.2}
          ambientColor={0xa7d8f9}
          ambientIntensity={0.5}
          lightIntensity={80}
          followCursor={true}
          size0={1}
          maxVelocity={1.2}
          maxX={20}
          maxY={20}
          maxZ={2}
        />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800/60 backdrop-blur-md p-6 flex flex-col border-r border-slate-700 shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] overflow-y-auto">
          <h1 className="text-3xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 text-center tracking-wider">
            Admin Panel
          </h1>
          <nav className="flex-grow space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-1 rounded-lg font-medium transition-all duration-300 focus:outline-none 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-700/60 hover:text-white hover:shadow-md"
                  }`
                }
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 group-hover:animate-pulse group-hover:text-cyan-400 transition-transform duration-300 " />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content Panel */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto px-4 py-4 bg-transparent backdrop-blur-xl">
            <Outlet />
          </main>
          <FloatingSaveButton />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
