import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  old_price: number | null;
  image_url: string | null;
  stock: number;
  is_featured: boolean | null;
  is_best_seller: boolean | null;
  categories:
    | {
        name: string;
      }
    | {
        name: string;
      }[]
    | null;
};

function mapProduct(row: ProductRow): Product {
  const categoryName = Array.isArray(row.categories)
    ? row.categories[0]?.name ?? "بدون قسم"
    : row.categories?.name ?? "بدون قسم";

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    price: Number(row.price),
    oldPrice: row.old_price ? Number(row.old_price) : undefined,
    image:
      row.image_url ||
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    category: categoryName,
    stock: row.stock,
    featured: !!row.is_featured,
    bestSeller: !!row.is_best_seller,
    badge: row.is_best_seller
      ? "الأكثر طلبًا"
      : row.is_featured
      ? "مميز"
      : undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      old_price,
      image_url,
      stock,
      is_featured,
      is_best_seller,
      categories(name)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProducts error:", error);
    return [];
  }

  return (data as ProductRow[]).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      old_price,
      image_url,
      stock,
      is_featured,
      is_best_seller,
      categories(name)
    `
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("getProductBySlug error:", error);
    return null;
  }

  return mapProduct(data as ProductRow);
}