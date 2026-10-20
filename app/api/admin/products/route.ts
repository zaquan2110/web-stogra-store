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

// Ambil daftar produk, termasuk yang nonaktif.
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
      { error: "Konfigurasi database belum tersedia." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json(
      { error: "Gagal mengambil produk." },
      { status: 500 }
    );
  }

  return NextResponse.json({ products: data ?? [] });
}

// Tambahkan produk baru.
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Akses ditolak." },
      { status: 401 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Format data tidak valid." },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const slug = String(body.slug ?? "").trim().toLowerCase();
  const category = String(body.category ?? "").trim();
  const description = String(body.description ?? "").trim();
  const price = Number(body.price);
  const imageUrl = String(body.image_url ?? "").trim();

  if (
    name.length < 2 ||
    name.length > 120 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    slug.length > 120 ||
    category.length < 2 ||
    category.length > 60 ||
    description.length > 5000 ||
    !Number.isFinite(price) ||
    price < 0 ||
    price > 1_000_000_000
  ) {
    return NextResponse.json(
      { error: "Nama, slug, kategori, deskripsi, atau harga tidak valid." },
      { status: 400 }
    );
  }

  if (imageUrl) {
    try {
      const parsed = new URL(imageUrl);

      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        throw new Error("Invalid image URL");
      }
    } catch {
      return NextResponse.json(
        { error: "URL gambar tidak valid." },
        { status: 400 }
      );
    }
  }

  const supabase = getAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Konfigurasi database belum tersedia." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      slug,
      category,
      description,
      price,
      image_url: imageUrl || null,
      status: "active",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      {
        error:
          error.code === "23505"
            ? "Slug produk sudah digunakan."
            : "Produk gagal disimpan.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Produk berhasil ditambahkan.", product: data },
    { status: 201 }
  );
}

// Edit produk atau aktifkan/nonaktifkan produk.
export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Akses ditolak." },
      { status: 401 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Format data tidak valid." },
      { status: 400 }
    );
  }

  const id = String(body.id ?? "").trim();

  if (!id) {
    return NextResponse.json(
      { error: "ID produk wajib diisi." },
      { status: 400 }
    );
  }

  const updates: Record<string, string | number | boolean | null> = {};

  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { error: "Nama produk tidak valid." },
        { status: 400 }
      );
    }
    updates.name = name;
  }

  if (body.slug !== undefined) {
    const slug = String(body.slug).trim().toLowerCase();
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      slug.length > 120
    ) {
      return NextResponse.json(
        { error: "Slug tidak valid." },
        { status: 400 }
      );
    }
    updates.slug = slug;
  }

  if (body.category !== undefined) {
    const category = String(body.category).trim();
    if (category.length < 2 || category.length > 60) {
      return NextResponse.json(
        { error: "Kategori tidak valid." },
        { status: 400 }
      );
    }
    updates.category = category;
  }

  if (body.description !== undefined) {
    const description = String(body.description).trim();
    if (description.length >
