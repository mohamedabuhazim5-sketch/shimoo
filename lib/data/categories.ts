import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
};

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, image_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getCategories error:", error);
    return [];
  }

  return (data as CategoryRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    image:
      row.image_url ||
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    description: "",
  }));
}