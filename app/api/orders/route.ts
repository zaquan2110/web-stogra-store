import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getSupabaseAdmin() {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const customerName = String(body.customerName ?? "").trim();
    const discordUsername = String(body.discordUsername ?? "").trim();
    const productName = String(body.productName ?? "").trim();
    const productSlug = String(body.productSlug ?? "").trim();
    const notes = String(body.notes ?? "").trim();
    const quantity = Number(body.quantity ?? 1);

    if (
      !customerName ||
      !discordUsername ||
      !productName ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      return NextResponse.json(
        { error: "Data pesanan tidak valid." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json(
        { error: "Konfigurasi database server belum tersedia." },
        { status: 503 }
      );
    }

    // Harga harus diambil dari database, bukan dipercaya dari browser.
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("name, slug, price, status")
      .eq("slug", productSlug)
      .eq("status", "active")
      .maybeSingle();

    if (productError || !product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan atau tidak aktif." },
        { status: 404 }
      );
    }

    const totalPrice = Number(product.price) * quantity;
    const orderCode =
      "STG-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      randomBytes(3).toString("hex").toUpperCase();

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_code: orderCode,
        customer_name: customerName,
        discord_username: discordUsername,
        product_name: product.name,
        product_slug: product.slug,
        quantity,
        total_price: totalPrice,
        payment_method: "Manual",
        payment_status: "pending",
        order_status: "pending",
        notes: notes.slice(0, 1000),
      })
      .select("order_code, product_name, quantity, total_price, payment_status, order_status, created_at")
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: "Pesanan gagal disimpan." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Pesanan berhasil dibuat.",
        order,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Permintaan tidak dapat diproses." },
      { status: 400 }
    );
  }
}
