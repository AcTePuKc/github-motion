// src/lib/motion-card.ts
import { UserContributionData } from "./github";
import { THEMES } from "./themes";
import { getTranslations } from "./i18n";

// --- 1. TYPES  OF ANIMATION ---
export type AnimationType = "snake" | "rain" | "matrix" | "grow" | "wave" | "pulsar" | "glow" | "flip" | "spark";
export type ShapeType = "square" | "circle" | "heart" | "diamond";

interface Options {
  username: string;
  year: number;
  theme?: string;
  animation?: AnimationType;
  shape?: ShapeType;
  locale?: string;
  hideTotal?: boolean;
  hideStreaks?: boolean;
  hideRank?: boolean;
  showLegend?: boolean;
  borderWidth?: number;
}

const CONSTANTS = {
  CELL_SIZE: 10,
  CELL_GAP: 3,
  GRID_MARGIN_X: 20,
  GRID_MARGIN_Y: 50,
};

// --- 2. NEW ANIMATION MAPS ---
const ANIMATION_MAP: Record<string, string> = {
  snake: "dropAndFade",
  rain: "dropAndFade",
  matrix: "dropAndFade",
  grow: "growUp",
  wave: "waveMove",
  pulsar: "pulseSize",
  glow: "glowPulse",     
  flip: "flipCard",      
  spark: "sparkFlicker", 
};

const SHAPE_ANIMATION_OVERRIDES: Record<string, string> = {
  "diamond_grow": "growRotateUp",
  "diamond_default": "dropRotateAndFade",
  "heart_default": "dropAndSway",
  "circle_default": "dropAndSway",
  "diamond_wave": "waveRotate",
  "diamond_pulsar": "pulseRotate",
  "diamond_glow": "glowRotate",
  "diamond_flip": "flipRotate",
  "diamond_spark": "sparkRotate",
};

// --- HELPER FUNCTIONS ---

const pseudoRandom01 = (a: number, b: number) => {
  const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const getRank = (total: number) => {
  if (total >= 2000) return { label: "S+", color: "#ff0000", text: "#ffffff" };
  if (total >= 1000) return { label: "S", color: "#ffd700", text: "#000000" };
  if (total >= 500)  return { label: "A", color: "#26a641", text: "#ffffff" };
  if (total >= 200)  return { label: "B", color: "#61afef", text: "#ffffff" };
  return { label: "C", color: "#8b949e", text: "#ffffff" };
};

// 3. UPDATED STATS LOGIC (Better Year Handling)
function calculateStats(data: UserContributionData, year: number) {
  let total = 0; let currentStreak = 0; let maxStreak = 0; let tempStreak = 0;
  
  const allDays = data.weeks.flatMap(w => w.contributionDays);
  allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const currentYear = new Date().getFullYear();
  const cutoffDate = (year < currentYear) 
    ? `${year}-12-31` 
    : new Date().toISOString().split('T')[0];

  const validDays = allDays.filter(d => d.date <= cutoffDate);

  validDays.forEach(day => {
    total += day.contributionCount;
    if (day.contributionCount > 0) {
      tempStreak++;
    } else {
      maxStreak = Math.max(maxStreak, tempStreak);
      tempStreak = 0;
    }
  });
  maxStreak = Math.max(maxStreak, tempStreak);

  for (let i = validDays.length - 1; i >= 0; i--) {
    if (validDays[i].contributionCount > 0) currentStreak++;
    else break;
  }

  return { total, maxStreak, currentStreak };
}

function renderCell(x: number, y: number, fill: string, shape: ShapeType, style: string): string {
  const { CELL_SIZE } = CONSTANTS;
  const content = [];
  content.push(`<g transform="translate(${x}, ${y})">`);
  
  if (shape === "circle") {
    const r = CELL_SIZE / 2;
    content.push(`<circle cx="${r}" cy="${r}" r="${r}" fill="${fill}" style="${style}" />`);
  } else if (shape === "heart") {
    content.push(`<path d="M5 9.5l-0.7-0.6C2.5 7.2 1 5.8 1 4.2 1 2.8 2.1 1.7 3.5 1.7c0.8 0 1.5 0.4 2 1 0.5-0.6 1.2-1 2-1 1.4 0 2.5 1.1 2.5 2.5 0 1.6-1.5 3-3.3 4.7L5 9.5z" fill="${fill}" style="${style}" />`);
  } else if (shape === "diamond") {
    content.push(`<rect x="1.5" y="1.5" width="7" height="7" fill="${fill}" rx="1" style="${style}" />`);
  } else {
    content.push(`<rect width="${CELL_SIZE}" height="${CELL_SIZE}" fill="${fill}" rx="2" style="${style}" />`);
  }
  content.push(`</g>`);
  return content.join("");
}

// --- MAIN GENERATOR ---

export function generateMotionCard(data: UserContributionData, options: Options): string {
  const {
    username, year, 
    theme = "dark", animation = "snake", shape = "square", locale = "en",
    hideTotal = false, hideStreaks = false, hideRank = false, 
    showLegend = false,
    borderWidth = 2, // Default 2
  } = options;
  
  const themeObj = THEMES[theme] || THEMES["dark"];
  const stats = calculateStats(data, year);
  const t = getTranslations(locale);
  const rank = getRank(stats.total);

  const { CELL_SIZE, CELL_GAP, GRID_MARGIN_X, GRID_MARGIN_Y } = CONSTANTS;
  
  const hasFooter = !hideTotal || !hideStreaks;
  const gridHeight = 7 * (CELL_SIZE + CELL_GAP);
  const gridWidth = data.weeks.length * (CELL_SIZE + CELL_GAP);
  const width = GRID_MARGIN_X * 2 + gridWidth;
  const height = GRID_MARGIN_Y + gridHeight + (hasFooter ? 90 : 30);
  const footerY = height - 50;

  let cellsSvg = "";
  let dayCounter = 0;

  data.weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day) => {
      dayCounter++;
      const level = Math.min(day.contributionCount, 4);
      const fill = themeObj.levels[level];
      const x = GRID_MARGIN_X + weekIndex * (CELL_SIZE + CELL_GAP);
      const y = GRID_MARGIN_Y + day.weekday * (CELL_SIZE + CELL_GAP);

      // --- 4. DELAY LOGIC ---
      let delay = 0;
      switch (animation) {
        case "snake": delay = dayCounter * 0.015; break;
        case "rain": delay = (weekIndex * 0.1) + (day.weekday * 0.05); break;
        case "matrix": delay = Math.random() * 3; break;
        case "grow": delay = (weekIndex * 0.05) + ((6 - day.weekday) * 0.1); break;
        case "wave": delay = weekIndex * 0.1; break;
        case "pulsar": delay = (day.weekday * 0.1) + (weekIndex * 0.05); break;
        case "glow": delay = (weekIndex * 0.03) + (day.weekday * 0.06); break;
        case "flip": delay = dayCounter * 0.01; break;
        case "spark": delay = pseudoRandom01(weekIndex, day.weekday) * 3.5; break;
      }

      let animName = ANIMATION_MAP[animation] || "dropAndFade";
      
      const specificKey = `${shape}_${animation}`;
      const defaultKey = `${shape}_default`;

      if (SHAPE_ANIMATION_OVERRIDES[specificKey]) {
        animName = SHAPE_ANIMATION_OVERRIDES[specificKey];
      } 
      else if (SHAPE_ANIMATION_OVERRIDES[defaultKey]) {
        const complexAnimations = ["grow", "wave", "pulsar", "glow", "flip", "spark"];
        
        if (!complexAnimations.includes(animation)) {
          animName = SHAPE_ANIMATION_OVERRIDES[defaultKey];
        }
      }

      const style = `opacity: 0; animation: ${animName} 4s infinite; animation-delay: ${delay}s; transform-origin: center; transform-box: fill-box;`;
      cellsSvg += renderCell(x, y, fill, shape, style);
    });
  });

  const border = themeObj.borderColor 
    ? `stroke="${themeObj.borderColor}" stroke-width="${borderWidth}"` 
    : `stroke="${themeObj.levels[1]}" stroke-width="${borderWidth}" stroke-opacity="0.2"`;

  // --- 5. LEGEND SVG ---
  const legendSvg = showLegend ? `
    <g transform="translate(${width - GRID_MARGIN_X - 100}, ${GRID_MARGIN_Y + gridHeight + 15})">
      <text x="-10" y="8" text-anchor="end" font-size="10" fill="${themeObj.text}" opacity="0.6">Less</text>
      ${themeObj.levels.map((color, i) => `
        <rect x="${i * 12}" y="0" width="10" height="10" rx="2" fill="${color}" stroke="rgba(0,0,0,0.1)" stroke-width="1" />
      `).join("")}
      <text x="${5 * 12 + 5}" y="8" text-anchor="start" font-size="10" fill="${themeObj.text}" opacity="0.6">More</text>
    </g>
  ` : "";

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; fill: ${themeObj.text}; }
        .title { font-size: 18px; font-weight: bold; }
        .subtitle { font-size: 12px; opacity: 0.8; }
        .stat-value { font-size: 20px; font-weight: bold; }
        .stat-label { font-size: 12px; opacity: 0.6; }
        .static-content { opacity: 0; animation: fadeIn 0.8s ease-out forwards; }
        
        @keyframes fadeIn { to { opacity: 1; } }
        
        /* Original Animations */
        @keyframes dropAndFade { 0% { transform: translateY(-300px); opacity: 0; } 15% { transform: translateY(0); opacity: 1; } 75% { transform: translateY(0); opacity: 1; } 85% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(-300px); opacity: 0; } }
        @keyframes dropAndSway { 0% { transform: translateY(-300px) translateX(0); opacity: 0; } 10% { transform: translateY(-150px) translateX(-5px); opacity: 0.5; } 15% { transform: translateY(0) translateX(0); opacity: 1; } 30% { transform: translateY(0) translateX(1px); } 50% { transform: translateY(0) translateX(-1px); } 70% { transform: translateY(0) translateX(1px); } 75% { transform: translateY(0) translateX(0); opacity: 1; } 85% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(-300px); opacity: 0; } }
        @keyframes dropRotateAndFade { 0% { transform: translateY(-300px) rotate(45deg); opacity: 0; } 15% { transform: translateY(0) rotate(45deg); opacity: 1; } 75% { transform: translateY(0) rotate(45deg); opacity: 1; } 85% { transform: translateY(20px) rotate(45deg); opacity: 0; } 100% { transform: translateY(-300px) rotate(45deg); opacity: 0; } }
        @keyframes growUp { 0% { transform: translateY(100px) scaleY(0); opacity: 0; } 20% { transform: translateY(0) scaleY(1); opacity: 1; } 75% { transform: translateY(0) scaleY(1); opacity: 1; } 85% { opacity: 0; } 100% { opacity: 0; } }
        @keyframes growRotateUp { 0% { transform: translateY(100px) scale(0) rotate(45deg); opacity: 0; } 20% { transform: translateY(0) scale(1) rotate(45deg); opacity: 1; } 75% { transform: translateY(0) scale(1) rotate(45deg); opacity: 1; } 85% { opacity: 0; } 100% { opacity: 0; } }
        @keyframes waveMove { 0% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-15px); opacity: 1; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes waveRotate { 0% { transform: translateY(0) rotate(45deg); opacity: 1; } 50% { transform: translateY(-15px) rotate(45deg); opacity: 1; } 100% { transform: translateY(0) rotate(45deg); opacity: 1; } }
        @keyframes pulseSize { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.6); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes pulseRotate { 0% { transform: scale(1) rotate(45deg); opacity: 1; } 50% { transform: scale(0.6) rotate(45deg); opacity: 0.7; } 100% { transform: scale(1) rotate(45deg); opacity: 1; } }

        /* Glow Pulse */
        @keyframes glowPulse {
          0%   { transform: scale(1);   opacity: 0.9; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
          50%  { transform: scale(1.1); opacity: 1;   filter: drop-shadow(0 0 3px ${themeObj.text}80); }
          100% { transform: scale(1);   opacity: 0.9; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
        }
        
        @keyframes glowRotate {
          0%   { transform: scale(1) rotate(45deg);   opacity: 0.9; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
          50%  { transform: scale(1.1) rotate(45deg); opacity: 1;   filter: drop-shadow(0 0 3px ${themeObj.text}80); }
          100% { transform: scale(1) rotate(45deg);   opacity: 0.9; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
        }

        /* Flip Card (Requires Perspective handled in render or style) */
        @keyframes flipCard {
          0%   { transform: perspective(400px) rotateY(90deg); opacity: 0; }
          15%  { transform: perspective(400px) rotateY(0deg);  opacity: 1; }
          70%  { transform: perspective(400px) rotateY(0deg);  opacity: 1; }
          85%  { transform: perspective(400px) rotateY(-90deg); opacity: 0; }
          100% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
        }
        
        @keyframes flipRotate {
          0%   { transform: perspective(400px) rotateY(90deg) rotate(45deg); opacity: 0; }
          15%  { transform: perspective(400px) rotateY(0deg)  rotate(45deg); opacity: 1; }
          70%  { transform: perspective(400px) rotateY(0deg)  rotate(45deg); opacity: 1; }
          85%  { transform: perspective(400px) rotateY(-90deg) rotate(45deg); opacity: 0; }
          100% { transform: perspective(400px) rotateY(90deg) rotate(45deg); opacity: 0; }
        }

        /* Spark Flicker */
        @keyframes sparkFlicker {
          0%   { transform: scale(1); opacity: 0.4; }
          10%  { transform: scale(1.3); opacity: 1; }
          20%  { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        
        @keyframes sparkRotate {
          0%   { transform: scale(1) rotate(45deg); opacity: 0.4; }
          10%  { transform: scale(1.3) rotate(45deg); opacity: 1; }
          20%  { transform: scale(1) rotate(45deg); opacity: 0.6; }
          100% { transform: scale(1) rotate(45deg); opacity: 0.4; }
        }

      </style>

      <rect width="100%" height="100%" fill="${themeObj.bg}" rx="8" ${border} />

      <g class="static-content">
        <text x="${GRID_MARGIN_X}" y="32" class="text title">GitHub Motion</text>
        ${!hideRank ? `
        <text x="${width - GRID_MARGIN_X - 50}" y="32" text-anchor="end" class="text subtitle">@${username} • ${year}</text>
        <rect x="${width - GRID_MARGIN_X - 40}" y="19" width="40" height="18" rx="4" fill="${rank.color}" />
        <text x="${width - GRID_MARGIN_X - 20}" y="32" text-anchor="middle" font-size="11" font-weight="bold" fill="${rank.text}">${rank.label}</text>
        ` : `
        <text x="${width - GRID_MARGIN_X}" y="32" text-anchor="end" class="text subtitle">@${username} • ${year}</text>
        `}
      </g>

      ${legendSvg}
      ${cellsSvg}

      ${hasFooter ? `
      <g class="static-content">
        ${!hideTotal ? `
        <text x="${GRID_MARGIN_X}" y="${footerY}" class="text stat-value">${stats.total}</text>
        <text x="${GRID_MARGIN_X}" y="${footerY + 15}" class="text stat-label">${t.total}</text>
        ` : ""}

        ${!hideStreaks ? `
        <text x="${GRID_MARGIN_X + 150}" y="${footerY}" class="text stat-value">${stats.maxStreak}</text>
        <text x="${GRID_MARGIN_X + 150}" y="${footerY + 15}" class="text stat-label">${t.longest}</text>
        
        <text x="${GRID_MARGIN_X + 280}" y="${footerY}" class="text stat-value">${stats.currentStreak}</text>
        <text x="${GRID_MARGIN_X + 280}" y="${footerY + 15}" class="text stat-label">${t.current}</text>
        ` : ""}
      </g>
      ` : ""}
    </svg>
  `;
}