// src/lib/motion-card.ts
import { UserContributionData } from "./github";
import { THEMES } from "./themes";

export type AnimationType = "snake" | "rain" | "matrix" | "grow";
export type ShapeType = "square" | "circle" | "heart" | "diamond";

interface Options {
  username: string;
  year: number;
  theme?: string;
  animation?: AnimationType;
  shape?: ShapeType;
}

function calculateStats(data: UserContributionData) {
  let total = 0; let currentStreak = 0; let maxStreak = 0; let tempStreak = 0;
  const allDays = data.weeks.flatMap(w => w.contributionDays);
  allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const today = new Date().toISOString().split('T')[0];
  const validDays = allDays.filter(d => d.date <= today);
  validDays.forEach(day => {
    total += day.contributionCount;
    if (day.contributionCount > 0) tempStreak++; else { maxStreak = Math.max(maxStreak, tempStreak); tempStreak = 0; }
  });
  maxStreak = Math.max(maxStreak, tempStreak);
  const reversed = [...validDays].reverse();
  for (const day of reversed) { if (day.contributionCount > 0) currentStreak++; else break; }
  return { total, maxStreak, currentStreak };
}

export function generateMotionCard(data: UserContributionData, options: Options): string {
  const {
    username,
    year,
    theme = "dark",
    animation = "snake",
    shape = "square",
  } = options;
  
  const themeObj = THEMES[theme] || THEMES["dark"];
  const stats = calculateStats(data);

  // Размери
  const CELL_SIZE = 10;
  const CELL_GAP = 3;
  const GRID_MARGIN_X = 20;
  const GRID_MARGIN_Y = 50; 
  const weeksCount = data.weeks.length;
  const gridWidth = weeksCount * (CELL_SIZE + CELL_GAP);
  const width = GRID_MARGIN_X * 2 + gridWidth;
  const height = GRID_MARGIN_Y + (7 * (CELL_SIZE + CELL_GAP)) + 40 + 50;
  const footerY = height - 50;

  let content = "";
  let dayCounter = 0;

  data.weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day) => {
      dayCounter++;
      
      const level = Math.min(day.contributionCount, 4);
      const fill = themeObj.levels[level];
      const x = GRID_MARGIN_X + weekIndex * (CELL_SIZE + CELL_GAP);
      const y = GRID_MARGIN_Y + day.weekday * (CELL_SIZE + CELL_GAP);

      // --- LOGIC: Chose Animation ---
      let delay = 0;
      let styleAnim = "dropAndFade"; // Default

      switch (animation) {
        case "snake": delay = dayCounter * 0.015; break;
        case "rain": delay = (weekIndex * 0.1) + (day.weekday * 0.05); break;
        case "matrix": delay = Math.random() * 3; break;
        case "grow": delay = (weekIndex * 0.05) + ((6 - day.weekday) * 0.1); break;
      }

      if (shape === "diamond") {
        if (animation === "grow") {
          styleAnim = "growRotateUp";
        } else {
          styleAnim = "dropRotateAndFade";
        }
      } 
      else if (animation === "grow") {
        styleAnim = "growUp";
      } 
      else if (shape === "heart" || shape === "circle") {
        styleAnim = "dropAndSway";
      }

      const style = `opacity: 0; animation: ${styleAnim} 10s infinite; animation-delay: ${delay}s; transform-origin: center; transform-box: fill-box;`;

      // --- RENDER ---
      content += `<g transform="translate(${x}, ${y})">`;

      if (shape === "circle") {
        const r = CELL_SIZE / 2;
        content += `<circle cx="${r}" cy="${r}" r="${r}" fill="${fill}" style="${style}" />`;
      } 
      else if (shape === "heart") {
        content += `<path 
          d="M5 9.5l-0.7-0.6C2.5 7.2 1 5.8 1 4.2 1 2.8 2.1 1.7 3.5 1.7c0.8 0 1.5 0.4 2 1 0.5-0.6 1.2-1 2-1 1.4 0 2.5 1.1 2.5 2.5 0 1.6-1.5 3-3.3 4.7L5 9.5z" 
          fill="${fill}" 
          style="${style}" 
        />`;
      }
      else if (shape === "diamond") {
        content += `<rect 
          x="1.5" y="1.5" width="7" height="7" 
          fill="${fill}" rx="1" 
          style="${style}" 
        />`;
      }
      else {
        content += `<rect 
          width="${CELL_SIZE}" height="${CELL_SIZE}" 
          fill="${fill}" rx="2" 
          style="${style}" 
        />`;
      }

      content += `</g>`;
    });
  });

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

        @keyframes dropAndFade {
          0% { transform: translateY(-300px); opacity: 0; }
          15% { transform: translateY(0); opacity: 1; }
          75% { transform: translateY(0); opacity: 1; }
          85% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(-300px); opacity: 0; }
        }

        @keyframes dropAndSway {
          0% { transform: translateY(-300px) translateX(0); opacity: 0; }
          10% { transform: translateY(-150px) translateX(-5px); opacity: 0.5; }
          15% { transform: translateY(0) translateX(0); opacity: 1; }
          30% { transform: translateY(0) translateX(1px); }
          50% { transform: translateY(0) translateX(-1px); }
          70% { transform: translateY(0) translateX(1px); }
          75% { transform: translateY(0) translateX(0); opacity: 1; }
          85% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(-300px); opacity: 0; }
        }

        @keyframes dropRotateAndFade {
          0% { transform: translateY(-300px) rotate(45deg); opacity: 0; }
          15% { transform: translateY(0) rotate(45deg); opacity: 1; }
          75% { transform: translateY(0) rotate(45deg); opacity: 1; }
          85% { transform: translateY(20px) rotate(45deg); opacity: 0; }
          100% { transform: translateY(-300px) rotate(45deg); opacity: 0; }
        }

        @keyframes growUp {
          0% { transform: translateY(100px) scaleY(0); opacity: 0; }
          20% { transform: translateY(0) scaleY(1); opacity: 1; }
          75% { transform: translateY(0) scaleY(1); opacity: 1; }
          85% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes growRotateUp {
          0% { transform: translateY(100px) scale(0) rotate(45deg); opacity: 0; }
          20% { transform: translateY(0) scale(1) rotate(45deg); opacity: 1; }
          75% { transform: translateY(0) scale(1) rotate(45deg); opacity: 1; }
          85% { opacity: 0; }
          100% { opacity: 0; }
        }
      </style>

      <rect width="100%" height="100%" fill="${themeObj.bg}" rx="8" stroke="${themeObj.levels[1]}" stroke-opacity="0.2" />

      <g class="static-content">
        <text x="${GRID_MARGIN_X}" y="32" class="text title">GitHub Motion</text>
        <text x="${width - GRID_MARGIN_X}" y="32" text-anchor="end" class="text subtitle">@${username} • ${year}</text>
      </g>

      ${content}

      <g class="static-content">
        <text x="${GRID_MARGIN_X}" y="${footerY}" class="text stat-value">${stats.total}</text>
        <text x="${GRID_MARGIN_X}" y="${footerY + 15}" class="text stat-label">Total</text>

        <text x="${GRID_MARGIN_X + 150}" y="${footerY}" class="text stat-value">${stats.maxStreak}</text>
        <text x="${GRID_MARGIN_X + 150}" y="${footerY + 15}" class="text stat-label">Longest Streak</text>
        
        <text x="${GRID_MARGIN_X + 280}" y="${footerY}" class="text stat-value">${stats.currentStreak}</text>
        <text x="${GRID_MARGIN_X + 280}" y="${footerY + 15}" class="text stat-label">Current Streak</text>
      </g>
    </svg>
  `;
}