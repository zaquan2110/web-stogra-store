
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json(
    { error: "Akses ditolak. Autentikasi admin diperlukan." },
    { status: 401 }
  );
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Konfigurasi server belum lengkap.");
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.ADMIN_API_SECRET;
  const supplied = request.headers.get("x-admin-secret");

  if (!secret || !supplied) return false;

  return supplied === secret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, order_code, customer_name, customer_contact, product_name, quantity, total_price, order_status, payment_status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Admin orders GET failed:", error.message);
      return NextResponse.json(
        { error: "Gagal mengambil data pesanan." },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders: data ?? [] });
  } catch (error) {
    console.error("Admin orders configuration error:", error);
    return NextResponse.json(
      { error: "Konfigurasi server bermasalah." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const body = await request.json();
    const orderCode =
      typeof body.orderCode === "string" ? body.orderCode.trim() : "";
    const orderStatus =
      typeof body.orderStatus === "string" ? body.orderStatus : undefined;
    const paymentStatus =
      typeof body.paymentStatus === "string" ? body.paymentStatus : undefined;

    const allowedOrderStatuses = [
      "pending",
      "processing",
      "completed",
      "cancelled",
    ];

    const allowedPaymentStatuses = [
      "pending",
      "paid",
      "failed",
      "refunded",
    ];

    if (
      !orderCode ||
      (!orderStatus && !paymentStatus) ||
      (orderStatus && !allowedOrderStatuses.includes(orderStatus)) ||
      (paymentStatus && !allowedPaymentStatuses.includes(paymentStatus))
    ) {
      return NextResponse.json(
        { error: "Data perubahan pesanan tidak valid." },
        { status: 400 }
      );
    }

    const updates: Record<string, string> = {};

    if (orderStatus) updates.order_status = orderStatus;
    if (paymentStatus) updates.payment_status = paymentStatus;

    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("orders")
      .update(updates)
      .eq("order_code", orderCode)
      .select("id, order_code, order_status, payment_status")
      .maybeSingle();

    if (error) {
      console.error("Admin orders PATCH failed:", error.message);
      return NextResponse.json(
        { error: "Gagal memperbarui pesanan." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("Admin orders PATCH error:", error);
    return NextResponse.json(
      { error: "Permintaan tidak valid atau terjadi kesalahan server." },
      { status: 400 }
    );
  }
}
