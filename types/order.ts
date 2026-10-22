export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "waiting_confirmation"
  | "paid"
  | "cancelled";

export type Order = {
  id?: string;
  order_code: string;
  customer_name: string;
  discord_username: string;
  discord_user_id?: string | null;
  product_name: string;
  product_slug?: string | null;
  quantity: number;
  total_price: number;
  payment_method: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  notes?: string | null;
  created_at: string;
  updated_at?: string;
};

export type CreateOrderInput = {
  customerName: string;
  discordUsername: string;
  productName: string;
  productSlug: string;
  quantity: number;
  notes?: string;
};
