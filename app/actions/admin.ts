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

export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "");
  const imageUrl = String(formData.get("imageUrl") || "");

  if (!name) {
    return { success: false, message: "اسم القسم مطلوب" };
  }

  const slug = slugify(name);

  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    image_url: imageUrl || null,
  });

  if (error) {
    console.error(error);
    return { success: false, message: "فشل إنشاء القسم" };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/products");

  return { success: true };
}

export async function deleteCategory(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");

  if (!id) {
    return { success: false, message: "معرف القسم غير موجود" };
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error(error);
    return { success: false, message: "فشل حذف القسم" };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/products");

  return { success: true };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "");
  const description = String(formData.get("description") || "");
  const price = Number(formData.get("price") || 0);
  const oldPriceValue = String(formData.get("oldPrice") || "");
  const oldPrice = oldPriceValue ? Number(oldPriceValue) : null;
  const imageUrl = String(formData.get("imageUrl") || "");
  const stock = Number(formData.get("stock") || 0);
  const categoryId = String(formData.get("categoryId") || "");
  const featured = formData.get("featured") === "on";
  const bestSeller = formData.get("bestSeller") === "on";

  if (!name || !categoryId || !price) {
    return { success: false, message: "أكملي البيانات المطلوبة" };
  }

  const slug = slugify(name);

  const { error } = await supabase.from("products").insert({
    name,
    slug,
    description,
    price,
    old_price: oldPrice,
    image_url: imageUrl || null,
    stock,
    category_id: categoryId,
    is_featured: featured,
    is_best_seller: bestSeller,
  });

  if (error) {
    console.error(error);
    return { success: false, message: "فشل إضافة المنتج" };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/products");

  return { success: true };
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const description = String(formData.get("description") || "");
  const price = Number(formData.get("price") || 0);
  const oldPriceValue = String(formData.get("oldPrice") || "");
  const oldPrice = oldPriceValue ? Number(oldPriceValue) : null;
  const imageUrl = String(formData.get("imageUrl") || "");
  const stock = Number(formData.get("stock") || 0);
  const featured = formData.get("featured") === "on";
  const bestSeller = formData.get("bestSeller") === "on";

  if (!id || !name || !price) {
    return { success: false, message: "بيانات غير مكتملة" };
  }

  const slug = slugify(name);

  const { error } = await supabase
    .from("products")
    .update({
      name,
      slug,
      description,
      price,
      old_price: oldPrice,
      image_url: imageUrl || null,
      stock,
      is_featured: featured,
      is_best_seller: bestSeller,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { success: false, message: "فشل تعديل المنتج" };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/products");

  return { success: true };
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    return { success: false, message: "معرف المنتج غير موجود" };
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    return { success: false, message: "فشل حذف المنتج" };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/products");

  return { success: true };
}

export async function updateOrderStatus(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (!id || !status) {
    return { success: false, message: "بيانات غير مكتملة" };
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { success: false, message: "فشل تحديث حالة الطلب" };
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${id}`);

  return { success: true };
}

export async function createBanner(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") || "");
  const subtitle = String(formData.get("subtitle") || "");
  const imageUrl = String(formData.get("imageUrl") || "");
  const buttonText = String(formData.get("buttonText") || "تسوق الآن");
  const buttonLink = String(formData.get("buttonLink") || "/products");
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const isActive = formData.get("isActive") === "on";

  if (!title) {
    return { success: false, message: "عنوان البانر مطلوب" };
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
    return { success: false, message: "فشل إضافة البانر" };
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}

export async function deleteBanner(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");

  if (!id) {
    return { success: false, message: "معرف البانر غير موجود" };
  }

  const { error } = await supabase.from("banners").delete().eq("id", id);

  if (error) {
    console.error(error);
    return { success: false, message: "فشل حذف البانر" };
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}