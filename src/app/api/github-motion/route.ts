// src/app/api/github-motion/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchContributions } from "@/lib/github";
import { generateMotionCard, AnimationType, ShapeType } from "@/lib/motion-card"; // <-- Update imports

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const username = searchParams.get("username");
  const yearParam = searchParams.get("year");
  const theme = searchParams.get("theme") || "dark";
  
  // Animation Param
  const animationParam = searchParams.get("animation") as string;
  let animation: AnimationType = "snake";
  if (["snake", "rain", "matrix", "grow"].includes(animationParam)) {
    animation = animationParam as AnimationType;
  }

  // Shape Param (НОВО)
  const shapeParam = searchParams.get("shape") as string;
  let shape: ShapeType = "square";
  if (["square", "circle", "heart", "diamond"].includes(shapeParam)) {
    shape = shapeParam as ShapeType;
  }

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();
  const data = await fetchContributions(username, year);

  if (!data) {
    return NextResponse.json({ error: "Data fetch failed" }, { status: 404 });
  }

  // Подаваме shape надолу
  const svg = generateMotionCard(data, { username, year, theme, animation, shape });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}