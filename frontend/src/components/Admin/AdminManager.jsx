import React, { useState, useEffect } from "react";
import { adminApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PlusCircle, ShieldUser, Table, Trash2 } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import {
  Table as ATable,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "../ui/table";
import { motion } from "framer-motion";

const AdminManager = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const { toast } = useToast();
  const { adminProfile, fetchDashboardSummary } = useAdmin();

  const fetchAdmins = async () => {
    try {
      const response = await adminApi.getAdmins();
      if (response.success) {
        setAdmins(response.data);
      }
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async () => {
    if (!newUsername || !newPassword || !newName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username, Full Name and password are required.",
      });
      return;
    }
    try {
      await adminApi.createAdmin({
        username: newUsername,
        password: newPassword,
        name: newName,
        profileImage: newProfileImage,
      });
      await fetchDashboardSummary();
      toast({
        title: "Success",
        description: `Admin '${newUsername}' created.`,
      });
      setNewUsername("");
      setNewPassword("");
      setNewName("");
      setNewProfileImage("");
      
      fetchAdmins(); // Refresh the list after creating
    } catch (error) {
      await fetchDashboardSummary();
      handleApiError(error, toast);
    }
  };

  const handleDeleteAdmin = async (username) => {
    if (
      window.confirm(`Are you sure you want to delete the admin '${username}'?`)
    ) {
      try {
        await adminApi.deleteAdmin(username);
        toast({
          title: "Success",
          description: `Admin '${username}' deleted.`,
        });
        await fetchDashboardSummary();
        fetchAdmins(); // Refresh the list
      } catch (error) {
        await fetchDashboardSummary();
        handleApiError(error, toast);
      }
    }
  };

  if (loading) return <p className="text-white">Loading Admins...</p>;

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          <ShieldUser className="inline-block mr-2 w-6 h-6 text-red-500 animate-pulse" />
          Admin Management
        </h2>
        <p className="text-sm text-red-400 ml-8">
          *Caution: Manage your admin users here.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
          <CardHeader>
            <CardTitle className="text-cyan-500 font-bold text-xl">
              Manage Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Admin</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="New Username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="bg-slate-700"
                      required
                    />
                    <Input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-slate-700"
                      required
                    />
                    <Input
                      placeholder="Full Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-slate-700"
                      required
                    />
                    <Input
                      placeholder="Profile Image URL"
                      value={newProfileImage}
                      onChange={(e) => setNewProfileImage(e.target.value)}
                      className="bg-slate-700"
                    />
                    <Button
                      variant="save"
                      onClick={handleCreateAdmin}
                      className="w-full"
                    >
                      Create Admin
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Display the list of admins */}
            <div className="space-y-2">
              <ATable>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Avatar</TableHead>
                    <TableHead className="text-center">Username</TableHead>
                    <TableHead className="text-center">Full Name</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Role</TableHead>
                    {adminProfile?.role === "superadmin" && (
                      <TableHead className="text-right">Actions</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="transition duration-300 hover:bg-slate-800"
                    >
                      <TableCell className={`font-medium `}>
                        {admin.profileImage.startsWith("http") ? (
                          <img
                            src={admin.profileImage}
                            alt={admin.username}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className={`font-medium text-center`}>
                        {admin.username}
                      </TableCell>
                      <TableCell className={`font-medium text-center`}>
                        {admin.name || "N/A"}
                      </TableCell>
                      <TableCell className={`font-medium text-center`}>
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={`font-medium text-center`}>
                        {admin.role}
                      </TableCell>
                      {adminProfile?.role === "superadmin" &&
                        admin.username !== "shreeya" && (
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteAdmin(admin.username)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        )}
                    </motion.tr>
                  ))}
                </TableBody>
              </ATable>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminManager;
