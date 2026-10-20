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

function isAuthorized(request: NextRequest) {
  const expected = process.env.ADMIN_API_SECRET;
  const provided = request.headers.get("x-admin-secret");

  return Boolean(expected && provided && provided === expected);
}

// Daftar pesanan untuk admin yang sudah terautentikasi.
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Akses ditolak." },
      { status: 401 }
    );
  }

  const supabase = getAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Konfigurasi database server belum tersedia." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "order_code, customer_name, discord_username, product_name, quantity, total_price, payment_status, order_status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data pesanan." },
      { status: 500 }
    );
  }

  return NextResponse.json({ orders: data ?? [] });
}

// Ubah status pesanan.
export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Akses ditolak." },
      { status: 401 }
    );
  }

  let body: {
    orderCode?: string;
    orderStatus?: string;
    paymentStatus?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  const orderCode = String(body.orderCode ?? "").trim();
  const allowedOrderStatuses = [
    "pending",
    "processing",
    "completed",
    "cancelled",
  ];
  const allowedPaymentStatuses = [
    "pending",
    "waiting_confirmation",
    "paid",
    "cancelled",
  ];

  if (
    !orderCode ||
    (!allowedOrderStatuses.includes(String(body.orderStatus ?? "")) &&
      !allowedPaymentStatuses.includes(String(body.paymentStatus ?? "")))
  ) {
    return NextResponse.json(
      { error: "Data perubahan status tidak valid." },
      { status: 400 }
    );
  }

  const updates: Record<string, string> = {};

  if (body.orderStatus) {
    if (!allowedOrderStatuses.includes(body.orderStatus)) {
      return NextResponse.json(
        { error: "Status pesanan tidak valid." },
        { status: 400 }
      );
    }

    updates.order_status = body.orderStatus;
  }

  if (body.paymentStatus) {
    if (!allowedPaymentStatuses.includes(body.paymentStatus)) {
      return NextResponse.json(
        { error: "Status pembayaran tidak valid." },
        { status: 400 }
      );
    }

    updates.payment_status = body.paymentStatus;
  }

  updates.updated_at = new Date().toISOString();

  const supabase = getAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Konfigurasi database server belum tersedia." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("order_code", orderCode)
    .select("order_code, order_status, payment_status, updated_at")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "Gagal memperbarui status pesanan." },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "Pesanan tidak ditemukan." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Status pesanan berhasil diperbarui.",
    order: data,
  });
}
