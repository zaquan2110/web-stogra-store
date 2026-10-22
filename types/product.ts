export type ProductStatus = "active" | "inactive";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
};

export type ProductInput = {
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url?: string | null;
};

export type ProductApiResponse = {
  products: Product[];
  error?: string;
};
