"use client";

import { useState, useEffect } from "react";
import { THEMES } from "@/lib/themes";

export default function Home() {
  const [username, setUsername] = useState("AcTePuKc");
  const [theme, setTheme] = useState("unicorn"); // Default to fun theme!
  const [animation, setAnimation] = useState("snake");
  const [shape, setShape] = useState("heart"); // Start with Hearts <3
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [url, setUrl] = useState<string | null>(null);
  const [fullUrl, setFullUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Added shape param
      const apiPath = `/api/github-motion?username=${username}&year=${year}&theme=${theme}&animation=${animation}&shape=${shape}`;
      setUrl(apiPath);
      
      if (typeof window !== "undefined") {
        setFullUrl(`${window.location.origin}${apiPath}`);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [username, theme, animation, shape, year]);

  const copyCode = () => {
    const md = `![GitHub Motion](${fullUrl})`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-pink-500/30">
      
      {/* Toast */}
      <div 
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-6 py-2 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 ${
          copied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <span>💖</span> Copied to clipboard!
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 tracking-tight">
            GitHub Motion
          </h1>
          <p className="text-gray-400 text-lg">
            Turn your contributions into animated hearts, snakes, and matrix rain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl space-y-5 shadow-2xl shadow-purple-900/10">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Animation</label>
                  <select 
                    value={animation}
                    onChange={(e) => setAnimation(e.target.value)}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 text-white outline-none cursor-pointer"
                  >
                    <option value="snake">🐍 Snake</option>
                    <option value="rain">🌧️ Rain</option>
                    <option value="matrix">👾 Matrix</option>
                    <option value="grow">🌱 Grow</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shape</label>
                  <select 
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 text-white outline-none cursor-pointer"
                  >
                    <option value="square">🟥 Square</option>
                    <option value="circle">🔵 Circle</option>
                    <option value="heart">❤️ Heart</option>
                    <option value="diamond">🔶 Diamond</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 text-white outline-none cursor-pointer"
                  >
                    {Object.keys(THEMES).map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Year</label>
                  <input 
                    type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 text-white outline-none" 
                  />
                </div>
              </div>

            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-2xl space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                 <span>Markdown Code</span>
               </label>
               <div 
                 onClick={copyCode}
                 className="group relative bg-[#111] rounded-lg p-3 font-mono text-xs text-pink-400 break-all cursor-pointer hover:bg-[#161616] transition-colors border border-gray-800"
               >
                 {`![GitHub Motion](${fullUrl})`}
                 <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-[10px] px-2 py-1 rounded">
                   Click to Copy
                 </div>
               </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-8">
            <div className="h-full bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden shadow-2xl">
              <div className="absolute top-4 left-4 text-xs font-bold text-gray-600 uppercase tracking-widest">
                Live Preview
              </div>
              {url ? (
                <img 
                  src={url} 
                  alt="Preview" 
                  className="rounded-lg shadow-lg max-w-full"
                  key={url} 
                />
              ) : (
                <div className="text-gray-600 animate-pulse">Generatiing preview...</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}