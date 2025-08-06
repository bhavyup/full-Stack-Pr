import React, { createContext, useState, useContext, useCallback, useRef } from 'react';
import { adminApi } from '../utils/api';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isSaveVisible, setIsSaveVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  
  // --- THIS IS THE FIX ---
  // We use a ref to hold a stable reference to the save function.
  // This prevents issues with stale state in callbacks.
  const saveHandlerRef = useRef(() => {});
  // --- END OF FIX ---

  const setSaveHandler = useCallback((handler) => {
    if (handler) {
      saveHandlerRef.current = handler; // Set the current ref to the page's save function
      setIsSaveVisible(true);
    } else {
      saveHandlerRef.current = () => {}; // Clear the handler
      setIsSaveVisible(false);
    }
  }, []);

  const fetchDashboardSummary = useCallback(async () => {
    try {
      const response = await adminApi.getDashboardSummary();
      if (response.success) {
        setSummary(response.data);
        setUnreadNotifCount(response.data.unread_notification_count);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard summary", error);
    }
  }, []);

  const value = {
    isSaveVisible,
    isSaving,
    setIsSaving,
    // The onSave function now calls the function stored in the ref
    onSave: () => saveHandlerRef.current(),
    setSaveHandler,
    adminProfile,
    setAdminProfile,
    summary, 
    setSummary,
    unreadNotifCount,
    setUnreadNotifCount, 
    fetchDashboardSummary
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};