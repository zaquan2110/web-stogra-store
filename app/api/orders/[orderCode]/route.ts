import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Periksa status pesanan menggunakan kode pesanan.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderCode: string }> }
) {
  const { orderCode } = await params;

  if (!/^STG-[A-Z0-9]+-[A-F0-9]+$/i.test(orderCode)) {
    return NextResponse.json(
      { error: "Format kode pesanan tidak valid." },
      { status: 400 }
    );
  }

  const supabase = getAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Konfigurasi server belum tersedia." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "order_code, product_name, quantity, total_price, payment_status, order_status, created_at, updated_at"
    )
    .eq("order_code", orderCode)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "Gagal mengambil status pesanan." },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "Pesanan tidak ditemukan." },
      { status: 404 }
    );
  }

  return NextResponse.json({ order: data });
}
