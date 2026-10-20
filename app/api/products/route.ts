import { NextResponse } from "next/server";

const products = [
  {
    slug: "advanced-combat-system",
    name: "Advanced Combat System",
    category: "Scripts",
    description: "Sistem combat modular untuk Roblox Studio.",
    price: 75000,
  },
  {
    slug: "modern-inventory-ui",
    name: "Modern Inventory UI",
    category: "UI",
    description: "Antarmuka inventory modern.",
    price: 45000,
  },
  {
    slug: "city-roleplay-map",
    name: "City Roleplay Map",
    category: "Maps",
    description: "Map kota untuk game roleplay Roblox.",
    price: 120000,
  },
  {
    slug: "game-assets-pack",
    name: "Game Assets Pack",
    category: "Assets",
    description: "Kumpulan aset pengembangan game.",
    price: 35000,
  },
  {
    slug: "studio-development",
    name: "Studio Development",
    category: "Services",
    description: "Layanan pengembangan sesuai kebutuhan.",
    price: 0,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    products,
  });
}
