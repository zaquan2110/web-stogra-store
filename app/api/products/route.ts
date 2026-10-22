import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: "Konfigurasi database belum tersedia." },
      { status: 503 }
    );
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, category, description, price, image_url")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Gagal mengambil katalog produk." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { products: data ?? [] },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
