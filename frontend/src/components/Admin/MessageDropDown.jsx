import React, { useState, useRef } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const MessagesPopover = ({ unreadCount, recentMessages, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const handleOpen = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleClose = () => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleDelayedOpen = () => {
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => setIsOpen(true), 500);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={handleDelayedOpen}
        onMouseLeave={handleClose}
        onClick={handleOpen}
      >
        <div
          className={`relative group cursor-pointer ${
            isOpen ? `text-purple-400` : `text-slate-300`
          }`}
        >
          <Mail
            className={`h-6 w-6 ${
              isOpen ? `text-purple-400` : `text-slate-300`
            } group-hover:text-purple-400 transition-colors duration-300 `}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white shadow-md">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        align="end"
        className="w-80 border border-purple-500/30 backdrop-blur-md rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 shadow-[0_0_20px_rgba(168,85,247,0.2)] focus:outline-none focus:ring-0 focus-visible:ring-0"
      >
        <div className="px-4 py-2 text-sm font-semibold text-purple-400 tracking-wide uppercase border-b border-slate-700">
          📩 Recent Messages
        </div>

        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {recentMessages.length > 0 ? (
            recentMessages.map((msg) => (
              <Link
                key={msg.id}
                to="/admin/messages"
                className="block px-4 py-2 hover:bg-purple-500/10 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] rounded-md transition duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0
"
              >
                <div className="flex justify-between gap-4">
                  {/* Left: Name + Timestamp */}
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-white">{msg.name}</p>
                    <p className="text-sm font-thin text-slate-600">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Right: Message preview */}
                  <div className="flex-1 text-right">
                    <p
                      title={msg.message}
                      className="text-xs text-slate-400 truncate"
                    >
                      {msg.message}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-slate-400 italic text-center">
              No new messages
            </div>
          )}
        </div>

        <div className="border-t border-slate-700 mt-2" />
        <button
          onClick={onNavigate}
          className="w-full px-4 py-3 text-sm font-semibold text-purple-300 hover:text-white hover:bg-purple-500/10 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-300 rounded-b-xl focus:outline-none focus:ring-0 focus-visible:ring-0
"
        >
          View All Messages →
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default MessagesPopover;
