import { createClient } from "@/lib/supabase/server";

export type BannerItem = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  is_active: boolean | null;
  sort_order: number | null;
};

export async function getActiveBanners(): Promise<BannerItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveBanners error:", error);
    return [];
  }

  return (data || []) as BannerItem[];
}