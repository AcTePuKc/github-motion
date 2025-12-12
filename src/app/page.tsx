// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { THEMES } from "@/lib/themes";
import { AVAILABLE_LOCALES } from "@/lib/i18n";

export default function Home() {
  const [username, setUsername] = useState("AcTePuKc");
  const [theme, setTheme] = useState("unicorn");
  const [animation, setAnimation] = useState("rain");
  const [shape, setShape] = useState("heart");
  const [year, setYear] = useState(new Date().getFullYear());
  const [locale, setLocale] = useState("en");

  const [url, setUrl] = useState<string | null>(null);
  const [fullUrl, setFullUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const currentThemeObj = THEMES[theme] || THEMES["dark"];
  const [hideRank, setHideRank] = useState(false);
  const [hideStats, setHideStats] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [borderWidth, setBorderWidth] = useState(2);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let apiPath = `/api/github-motion?username=${username}&year=${year}&theme=${theme}&animation=${animation}&shape=${shape}&locale=${locale}&border_width=${borderWidth}`;

      if (hideRank) apiPath += `&hide_rank=true`;
      if (hideStats) apiPath += `&hide_total=true&hide_streaks=true`;
      if (showLegend) apiPath += `&show_legend=true`;

      setUrl(apiPath);

      if (typeof window !== "undefined") {
        setFullUrl(`${window.location.origin}${apiPath}`);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [username, theme, animation, shape, year, locale, hideRank, hideStats, borderWidth]);

  const copyCode = () => {
    const md = `![GitHub Motion](${fullUrl})`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-pink-500/30 flex flex-col">

      {/* Toast Notification */}
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 border border-white/10 backdrop-blur-md ${copied ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
          }`}
      >
        <span>✨</span> Copied to clipboard!
      </div>

      <div className="flex-grow max-w-6xl mx-auto p-6 md:p-12 space-y-12 w-full">

        {/* Header */}
        <div className="text-center space-y-6 mt-8">
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 tracking-tight drop-shadow-sm">
            GitHub Motion
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Create stunning, animated contribution graphs. <br />
            <span className="text-gray-500 text-sm">Snakes, Matrix Rain, Hearts & more.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Controls Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl space-y-6 shadow-2xl shadow-purple-900/5 hover:border-gray-700 transition-colors duration-300">

              {/* Username Input */}
              <div className="space-y-2 group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#111] border border-gray-800 rounded-xl p-3 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder-gray-600"
                  placeholder="Your GitHub Username"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Animation */}
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">Animation</label>
                  <select
                    value={animation}
                    onChange={(e) => setAnimation(e.target.value)}
                    className="w-full bg-[#111] border border-gray-800 rounded-xl p-3 text-white outline-none cursor-pointer hover:border-gray-700 focus:border-pink-500 transition-all appearance-none"
                  >
                    <option value="snake">🐍 Snake</option>
                    <option value="rain">🌧️ Rain</option>
                    <option value="matrix">👾 Matrix</option>
                    <option value="grow">🌱 Grow</option>
                    <option value="wave">🌊 Wave</option>
                    <option value="pulsar">💓 Pulsar</option>
                    <option value="glow">✨ Glow</option>
                    <option value="flip">🔄 Flip</option>
                    <option value="spark">⚡ Spark</option>
                  </select>
                </div>

                {/* Shape */}
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">Shape</label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full bg-[#111] border border-gray-800 rounded-xl p-3 text-white outline-none cursor-pointer hover:border-gray-700 focus:border-pink-500 transition-all appearance-none"
                  >
                    <option value="square">🟥 Square</option>
                    <option value="circle">🔵 Circle</option>
                    <option value="heart">❤️ Heart</option>
                    <option value="diamond">🔶 Diamond</option>
                  </select>
                </div>
              </div>

              {/* Theme Selector + Mini Preview */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">Theme</label>
                  <span className="text-[10px] text-gray-600 bg-gray-900 px-2 py-0.5 rounded-full border border-gray-800">
                    {Object.keys(THEMES).length} available
                  </span>
                </div>

                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-[#111] border border-gray-800 rounded-xl p-3 text-white outline-none cursor-pointer hover:border-gray-700 focus:border-pink-500 transition-all appearance-none"
                >
                  {Object.keys(THEMES).map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>

                {/* --- VISUAL PALETTE PREVIEW (Feature #4) --- */}
                <div className="flex gap-1 h-3 w-full rounded-md overflow-hidden border border-gray-800/50">
                  {currentThemeObj.levels.map((color, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: color }}
                      className="flex-1 h-full first:rounded-l-md last:rounded-r-md transition-all hover:opacity-80"
                      title={`Level ${i} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Language & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">Language</label>
                  <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                    className="w-full bg-[#111] border border-gray-800 rounded-xl p-3 text-white outline-none cursor-pointer hover:border-gray-700 focus:border-pink-500 transition-all appearance-none"
                  >
                    {AVAILABLE_LOCALES.map((lang) => (
                      <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="w-full bg-[#111] border border-gray-800 rounded-xl p-3 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  />
                </div>
              </div>
              {/* Border Width Control */}
              <div className="space-y-2 group">
                <div className="flex justify-between">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">Border Width</label>
                  <span className="text-xs text-gray-400 font-mono">{borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={hideRank}
                    onChange={(e) => setHideRank(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-700 bg-[#111] text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                  />
                  <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">Hide Rank</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={hideStats}
                    onChange={(e) => setHideStats(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-700 bg-[#111] text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                  />
                  <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">Hide Stats</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showLegend}
                    onChange={(e) => setShowLegend(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-700 bg-[#111] text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                  />
                  <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">Show Legend</span>
                </label>
              </div>

            </div>

            {/* Code Box */}
            <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-3xl space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between items-center px-1">
                <span>Markdown Code</span>
                <span className="text-[10px] text-gray-600">Click to copy</span>
              </label>
              <div
                onClick={copyCode}
                className="group relative bg-[#111] rounded-xl p-4 font-mono text-xs text-pink-400 break-all cursor-pointer hover:bg-[#161616] hover:border-pink-500/30 border border-gray-800 transition-all duration-200 shadow-inner"
              >
                {`![GitHub Motion](${fullUrl})`}

                {/* Hover Icon */}
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                  📋
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="lg:col-span-8">
            <div className="sticky top-8">
              <div className="h-full bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden shadow-2xl transition-all duration-500">

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20"></div>
                <div className="absolute top-6 left-6 text-xs font-bold text-gray-600 uppercase tracking-[0.2em]">
                  Live Preview
                </div>

                {url ? (
                  <img
                    src={url}
                    alt="Preview"
                    className="rounded-xl shadow-2xl border border-gray-800/50 hover:scale-[1.01] transition-transform duration-500"
                    key={url}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-600 animate-pulse">
                    <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Generating preview...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>Made with ❤️ by <a href="https://github.com/actepukc" className="hover:text-pink-400 transition-colors">AcTePuKc</a></p>
      </footer>
    </main>
  );
}