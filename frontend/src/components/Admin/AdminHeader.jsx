// frontend/src/components/Admin/AdminHeader.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Mail } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import MessagePopover from "./MessageDropDown";
import NotificationPanel from "./NotificationPanel";
import { MessageSquare, Pencil, UserPlus } from "lucide-react";
import { adminApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AdminHeader = () => {
  const {
    adminProfile,
    summary,
    unreadNotifCount,
    setUnreadNotifCount,
    fetchDashboardSummary,
  } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNotificationClick = async (notificationId) => {
    try {
      await adminApi.markOneNotificationAsRead(notificationId);
      // Update the local list to remove the blue dot
      setNotifications(
        notifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      // Decrement the unread count for the badge
      setUnreadNotifCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      handleApiError(error, toast);
    }
  };

  const handleBellClick = async () => {
    try {
      const res = await adminApi.getNotifications();
      if (res.success) {
        setNotifications(res.data);
        await fetchDashboardSummary();
      }
    } catch (err) {
      await fetchDashboardSummary();
      console.error("Failed to fetch notifications");
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      try {
        await adminApi.clearAllNotifications();
        const res = await adminApi.getNotifications();
        if (res.success) {
          setNotifications(res.data);
        }
        toast({ title: "Success", description: "All notifications cleared." });
        await fetchDashboardSummary();
      } catch (err) {
        console.error("Failed to clear notifications");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not clear notifications.",
        });
        await fetchDashboardSummary();
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await adminApi.markNotificationsAsRead();
      // 1. Update the local state to reflect the change immediately
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      const res = await adminApi.getNotifications();
        if (res.success) {
          setNotifications(res.data);
        }
      // 2. Set the unread count to 0 to hide the badge
      setUnreadNotifCount(0);
      toast({
        title: "Success",
        description: "All notifications marked as read.",
      });
      await fetchDashboardSummary();
    } catch (error) {
      await fetchDashboardSummary();
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not mark all as read.",
      });
      handleApiError(error, toast);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/search?q=${searchQuery}`);
    }
  };

  const handleNavigateToMessages = () => {
    window.location.href = "/admin/messages";
  };

  const recentMessages = summary?.recent_messages || [];
  const unreadCount = summary?.unread_message_count || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Center: Search */}
        <div className="hidden md:flex flex-1 justify-center max-w-md">
          <form className="relative w-full" onSubmit={handleSearchSubmit}>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-full bg-slate-900/60 text-slate-200 placeholder:text-slate-400 pl-10 pr-4 py-2 backdrop-blur border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 shadow-inner shadow-slate-900/40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Right: Notifications + Admin */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4 items-center">
            <div className="relative group">
              <NotificationPanel
                unreadNotifCount={unreadNotifCount}
                notifications={notifications}
                onBellClick={handleBellClick}
                onClearAll={handleClearAll}
                onMarkAllAsRead={handleMarkAllAsRead}
                onNotificationClick={handleNotificationClick}
              />
            </div>

            <MessagePopover
              unreadCount={unreadCount}
              recentMessages={recentMessages}
              onNavigate={handleNavigateToMessages}
            />
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            {adminProfile ? (
              <>
                <div className="hidden lg:block text-right">
                  <p className="text-base font-semibold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent font-['Orbitron'] drop-shadow-sm">
                    {adminProfile.username}
                  </p>
                  <p className="text-xs text-slate-400 font-mono tracking-wider">
                    {adminProfile.name}
                  </p>
                </div>
                <div className="hidden lg:block">
                  <img
                    src={
                      adminProfile.profileImage ||
                      "https://via.placeholder.com/40"
                    }
                    alt={adminProfile.name || "Admin Profile"}
                    className="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-[0_0_12px_#0ff] transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </>
            ) : (
              <div className="text-slate-400 text-sm animate-pulse">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
