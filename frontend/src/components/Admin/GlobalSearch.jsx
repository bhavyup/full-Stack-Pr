import { useState, useEffect } from "react";
import Fuse from "fuse.js";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/projects"); // Replace with real API
        const json = await res.json();

        const fuseInstance = new Fuse(json, {
          keys: ["title", "description", "name"],
          includeScore: true,
          threshold: 0.4,
        });

        setFuse(fuseInstance);
        setData(json);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    }

    fetchData();
  }, []);

  const handleSearch = () => {
    if (!fuse || !query.trim()) return setResults([]);
    const found = fuse.search(query).map((r) => r.item);
    setResults(found);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter pressed, searching:", query);
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 w-[250px] bg-zinc-800 text-white rounded-md focus:outline-none"
      />

      {results.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white text-black rounded-md shadow-lg max-h-64 overflow-y-auto">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => alert(`Clicked: ${item.title || item.name}`)}
            >
              <strong>{item.title || item.name}</strong>
              <div className="text-xs text-gray-600">Result {idx + 1}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
