"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function slugify(value: string) {
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]+/gi, "")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");

  return `${cleaned}-${Date.now()}`;
}

export async function createCategory(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const name = String(formData.get("name") || "");
  const imageUrl = String(formData.get("imageUrl") || "");

  if (!name) {
    throw new Error("اسم القسم مطلوب");
  }

  const slug = slugify(name);

  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    image_url: imageUrl || null,
  });

  if (error) {
    console.error(error);
    throw new Error("فشل إنشاء القسم");
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/products");
}

export async function createBanner(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const title = String(formData.get("title") || "");
  const subtitle = String(formData.get("subtitle") || "");
  const imageUrl = String(formData.get("imageUrl") || "");
  const buttonText = String(formData.get("buttonText") || "تسوق الآن");
  const buttonLink = String(formData.get("buttonLink") || "/products");
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const isActive = formData.get("isActive") === "on";

  if (!title) {
    throw new Error("عنوان البانر مطلوب");
  }

  const { error } = await supabase.from("banners").insert({
    title,
    subtitle,
    image_url: imageUrl || null,
    button_text: buttonText,
    button_link: buttonLink,
    sort_order: sortOrder,
    is_active: isActive,
  });

  if (error) {
    console.error(error);
    throw new Error("فشل إضافة البانر");
  }

  revalidatePath("/");
  revalidatePath("/admin");
}