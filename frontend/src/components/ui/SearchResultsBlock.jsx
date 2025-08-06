import React from "react";
import { Link } from "react-router-dom";

const SearchResultBlock = ({ title, icon: Icon, results = [], color = "", linkTo = "#" }) => {
  if (!results.length) return null;

  const colorMap = {
    xp: {
      header: "text-cyan-300",
      icon: "text-cyan-400",
      countBg: "bg-cyan-900/40 text-cyan-200 border-cyan-700/30",
      border: "border-cyan-700/40 hover:border-cyan-400/60",
      shadow: "shadow-cyan-700/40",
      ring: "ring-cyan-400/20"
    },
    lg: {
      header: "text-green-300",
      icon: "text-green-400",
      countBg: "bg-green-900/40 text-green-200 border-green-700/30",
      border: "border-green-700/40 hover:border-green-400/60",
      shadow: "shadow-green-700/40",
      ring: "ring-green-400/20"
    },
    projects: {
      header: "text-purple-300",
      icon: "text-purple-400",
      countBg: "bg-purple-900/40 text-purple-200 border-purple-700/30",
      border: "border-purple-700/40 hover:border-purple-400/60",
      shadow: "shadow-purple-700/40",
      ring: "ring-purple-400/20"
    },
    skills: {
      header: "text-yellow-300",
      icon: "text-yellow-400",
      countBg: "bg-yellow-900/40 text-yellow-200 border-yellow-700/30",
      border: "border-yellow-700/40 hover:border-yellow-400/60",
      shadow: "shadow-yellow-700/40",
      ring: "ring-yellow-400/20"
    },
    education: {
      header: "text-blue-300",
      icon: "text-blue-400",
      countBg: "bg-blue-900/40 text-blue-200 border-blue-700/30",
      border: "border-blue-700/40 hover:border-blue-400/60",
      shadow: "shadow-blue-700/40",
      ring: "ring-blue-400/20"
    },
    profile: {
      header: "text-pink-300",
      icon: "text-pink-400",
      countBg: "bg-pink-900/40 text-pink-200 border-pink-700/30",
      border: "border-pink-700/40 hover:border-pink-400/60",
      shadow: "shadow-pink-700/40",
      ring: "ring-pink-400/20"
    },
    gm: {
      header: "text-orange-300",
      icon: "text-orange-400",
      countBg: "bg-orange-900/40 text-orange-200 border-orange-700/30",
      border: "border-orange-700/40 hover:border-orange-400/60",
      shadow: "shadow-orange-700/40",
      ring: "ring-orange-400/20"
    },
    exp: {
      header: "text-teal-300",
      icon: "text-teal-400",
      countBg: "bg-teal-900/40 text-teal-200 border-teal-700/30",
      border: "border-teal-700/40 hover:border-teal-400/60",
      shadow: "shadow-teal-700/40",
      ring: "ring-teal-400/20"
    },
    contact: {
      header: "text-gray-300",
      icon: "text-gray-400",
      countBg: "bg-gray-900/40 text-gray-200 border-gray-700/30",
      border: "border-gray-700/40 hover:border-gray-400/60",
      shadow: "shadow-gray-700/40",
      ring: "ring-gray-400/20"
    },
    footer: {
      header: "text-indigo-300",
      icon: "text-indigo-400",
      countBg: "bg-indigo-900/40 text-indigo-200 border-indigo-700/30",
      border: "border-indigo-700/40 hover:border-indigo-400/60",
      shadow: "shadow-indigo-700/40",
      ring: "ring-indigo-400/20"
    }
  };

  const theme = colorMap[color] || colorMap.xp;

  return (
    <div
      className={`rounded-3xl p-6 backdrop-blur-xl bg-gradient-to-br from-slate-900/70 to-black/60 border ${theme.border} ${theme.shadow} ${theme.ring} ring-1 ring-inset transition-all duration-500`}
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`w-6 h-6 ${theme.icon} animate-pulse drop-shadow-lg`} />
        <h3 className={`text-2xl font-semibold tracking-wide ${theme.header}`}>{title}</h3>
        <span
          className={`ml-auto px-3 py-1 text-xs font-medium rounded-full border ${theme.countBg} backdrop-blur-sm`}
        >
          {results.length} found
        </span>
      </div>

      <div className="grid gap-4">
        {results.map((match, index) => (
          <Link
            key={index}
            to={linkTo}
            className={`group block bg-slate-800/50 hover:bg-slate-800/70 p-4 rounded-xl border ${theme.border} hover:scale-[1.015] transition-transform duration-300 ease-in-out shadow-sm backdrop-blur-md`}
          >
            <p className={`font-medium text-sm ${theme.header} group-hover:underline`}>{match.field}</p>
            <p className="text-xs text-slate-400 mt-1 italic font-mono line-clamp-2">"{match.value}"</p>
            {match.icon ? (<p className="text-xs text-slate-400 mt-1 italic font-mono line-clamp-2">"Icon: {match.icon}"</p>) : null}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultBlock;
