// src/lib/themes.ts

export interface Theme {
  bg: string;
  text: string;
  levels: string[]; // 0 (empty) -> 4 (most active)
}

export const THEMES: Record<string, Theme> = {
  // --- CLASSIC ---
  default: {
    bg: "#ffffff",
    text: "#24292f",
    levels: ["#dde2eaff", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  },
  dark: {
    bg: "#0d1117",
    text: "#c9d1d9",
    levels: ["#242a34ff", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
  
  // --- FUN & CUTE ---
  unicorn: {
    bg: "#fff0f5", // Lavender Blush
    text: "#6a0dad",
    levels: ["#ffdae6ff", "#ffb6c1", "#ff69b4", "#da70d6", "#9400d3"], // Pinks & Purples
  },
  candy: {
    bg: "#ffffff",
    text: "#ff4500",
    levels: ["#f6cacaff", "#ffcccb", "#ff9999", "#ff6666", "#ff0000"], // Red/Pink Candy
  },
  sunset: {
    bg: "#2d1b2e",
    text: "#ffcc00",
    levels: ["#442244", "#ff6b6b", "#ff9e7d", "#ffcc00", "#ffff99"], // Orange/Yellow
  },
  ocean: {
    bg: "#e0f7fa",
    text: "#006064",
    levels: ["#a7e8f0ff", "#80deea", "#26c6da", "#00acc1", "#006064"], // Light Blues
  },

  // --- DEV THEMES ---
  "nightowl": {
    bg: "#011627",
    text: "#d6deeb",
    levels: ["#0b253a", "#21c7a8", "#22eaf2", "#82aaff", "#c792ea"], 
  },
  dracula: {
    bg: "#282a36",
    text: "#f8f8f2",
    levels: ["#44475a", "#6272a4", "#8be9fd", "#50fa7b", "#ff79c6"],
  },
  monokai: {
    bg: "#272822",
    text: "#f8f8f2",
    levels: ["#3e3d32", "#a6e22e", "#f92672", "#fd971f", "#ae81ff"],
  },
  "tokyonight": {
    bg: "#1a1b26",
    text: "#787c99",
    levels: ["#24283b", "#7aa2f7", "#bb9af7", "#f7768e", "#9ece6a"],
  },
};