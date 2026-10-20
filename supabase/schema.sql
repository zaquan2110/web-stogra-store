-- STOGRA STORE DATABASE
-- Jalankan di Supabase > SQL Editor > New query

create extension if not exists pgcrypto;

-- Tabel produk
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null,
  description text not null default '',
  price numeric(12,2) not null default 0,
  image_url text,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tabel pesanan
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text unique not null,
  customer_name text not null,
  discord_username text not null,
  discord_user_id text,
  product_name text not null,
  product_slug text,
  quantity integer not null default 1 check (quantity > 0),
  total_price numeric(12,2) not null default 0,
  payment_method text not null default 'Manual',
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'waiting_confirmation', 'paid', 'cancelled')),
  order_status text not null default 'pending'
    check (order_status in ('pending', 'processing', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tabel pesan chat
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete set null,
  sender_name text not null,
  sender_type text not null
    check (sender_type in ('customer', 'admin')),
  message text not null,
  created_at timestamptz not null default now()
);

-- Index untuk mempercepat pencarian
create index if not exists products_category_idx
  on public.products(category);

create index if not exists orders_created_at_idx
  on public.orders(created_at desc);

create index if not exists orders_status_idx
  on public.orders(order_status);

create index if not exists chat_messages_order_id_idx
  on public.chat_messages(order_id);

-- Aktifkan Row Level Security
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.chat_messages enable row level security;

-- Produk aktif boleh dibaca publik
drop policy if exists "Public can view active products"
  on public.products;

create policy "Public can view active products"
on public.products
for select
to anon, authenticated
using (status = 'active');

-- Jangan membuat kebijakan publik untuk membaca pesanan atau chat.
-- Akses pesanan dan chat harus melalui backend yang terverifikasi.
