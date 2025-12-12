// src/app/api/github-motion/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchContributions } from "@/lib/github";
import { generateMotionCard, AnimationType, ShapeType } from "@/lib/motion-card";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const username = searchParams.get("username");
  const yearParam = searchParams.get("year");
  const theme = searchParams.get("theme") || "dark";
  const locale = searchParams.get("locale") || "en";
  
  // Border
  const borderWidthParam = searchParams.get("border_width");
  const borderWidth = borderWidthParam ? parseInt(borderWidthParam) : 2;

  
  // Animation Param (Добавени са новите)
  const animationParam = searchParams.get("animation") as string;
  let animation: AnimationType = "snake";
  if (["snake", "rain", "matrix", "grow", "wave", "pulsar", "glow", "flip", "spark"].includes(animationParam)) {
    animation = animationParam as AnimationType;
  }

  // Shape Param
  const shapeParam = searchParams.get("shape") as string;
  let shape: ShapeType = "square";
  if (["square", "circle", "heart", "diamond"].includes(shapeParam)) {
    shape = shapeParam as ShapeType;
  }

  // Booleans
  const hideTotal = searchParams.get("hide_total") === "true";
  const hideStreaks = searchParams.get("hide_streaks") === "true";
  const hideRank = searchParams.get("hide_rank") === "true";
  const showLegend = searchParams.get("show_legend") === "true";

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();
  const data = await fetchContributions(username, year);

  if (!data) {
    return NextResponse.json({ error: "Data fetch failed" }, { status: 404 });
  }

  const svg = generateMotionCard(data, { 
    username, year, theme, animation, shape, locale,
    hideTotal, hideStreaks, hideRank, showLegend, borderWidth,
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}