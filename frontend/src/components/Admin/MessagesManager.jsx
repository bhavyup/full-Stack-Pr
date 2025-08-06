import React, { useState, useEffect } from "react";
import { adminApi, handleApiError } from "../../utils/api";
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
import { Trash2, Eye, MessagesSquare } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { fetchDashboardSummary } = useAdmin();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getMessages();
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await adminApi.deleteMessage(messageId);
        toast({ title: "Message deleted successfully." });
        await fetchDashboardSummary();
        fetchMessages(); // Refresh the list
      } catch (error) {
        handleApiError(error, toast);
      }
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await adminApi.markMessageRead(messageId);
      toast({ title: "Message marked as read." });
      await fetchDashboardSummary();
      fetchMessages(); // Refresh the list
    } catch (error) {
      handleApiError(error, toast);
    }
  };

  if (loading) {
    return <p className="text-white">Loading Messages...</p>;
  }

  return (
    <div className="p-5">
      <motion.div
        className="w-full bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-700 backdrop-blur-sm rounded-xl p-5 mb-4 shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          <MessagesSquare className="inline-block mr-2" />
          Messages Section Database
        </h2>
        <p className="text-sm text-slate-400 ml-9">
          *Read, Mark as Seen or Delete Messages here.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-slate-800 border-slate-700 text-white shadow-lg hover:shadow-cyan-500/10 transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-cyan-400">
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <motion.tr
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="transition duration-300 hover:bg-slate-800"
                  >
                    <TableCell
                      className={`font-medium ${
                        !message.read
                          ? "bg-slate-600 text-white"
                          : "bg-slate-800/40"
                      }`}
                    >
                      {message.name}
                    </TableCell>
                    <TableCell
                      className={`font-medium ${
                        !message.read
                          ? "bg-slate-600 text-white"
                          : "bg-slate-800/40"
                      }`}
                    >
                      {message.email}
                    </TableCell>
                    <TableCell
                      className={`font-medium max-w-md truncate ${
                        !message.read
                          ? "bg-slate-600 text-white"
                          : "bg-slate-800/40"
                      }`}
                    >
                      {message.message}
                    </TableCell>
                    <TableCell
                      className={`font-medium max-w-md truncate ${
                        !message.read
                          ? "bg-slate-600 text-white"
                          : "bg-slate-800/40"
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell
                      className={`font-medium ${
                        !message.read
                          ? "bg-slate-600 text-white"
                          : "bg-slate-800/40"
                      }`}
                    >
                      {message.read ? (
                        <Badge variant="secondary" className="bg-green-500">
                          Read
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-yellow-500">
                          New
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell
                      className={`font-medium space-x-2 ${
                        !message.read
                          ? "bg-slate-600 text-white"
                          : "bg-slate-800/40"
                      }`}
                    >
                      {!message.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(message.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            {messages.length === 0 && (
              <p className="text-center text-slate-400 py-8">
                No messages yet.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MessagesManager;
