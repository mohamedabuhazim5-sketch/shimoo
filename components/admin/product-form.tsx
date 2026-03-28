"use client";

import { useState, useTransition } from "react";
import { createProduct } from "@/app/actions/admin";
import ImageUpload from "./image-upload";
import { toast } from "sonner";

type CategoryItem = {
  id: string;
  name: string;
};

export default function ProductForm({
  categories,
}: {
  categories: CategoryItem[];
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        formData.set("imageUrl", imageUrl);

        startTransition(async () => {
          const result = await createProduct(formData);

          if (!result.success) {
            toast.error(result.message || "فشل إضافة المنتج");
            return;
          }

          toast.success("تمت إضافة المنتج بنجاح");
        });
      }}
      className="space-y-4 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-black text-pink-700">إضافة منتج جديد</h2>

      <input
        name="name"
        placeholder="اسم المنتج"
        className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
      />

      <textarea
        name="description"
        placeholder="وصف المنتج"
        className="min-h-28 w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="price"
          type="number"
          placeholder="السعر"
          className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
        />
        <input
          name="oldPrice"
          type="number"
          placeholder="السعر قبل الخصم"
          className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="stock"
          type="number"
          placeholder="المخزون"
          className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
        />

        <select
          name="categoryId"
          className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
          defaultValue=""
        >
          <option value="" disabled>
            اختاري القسم
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUpload onUploaded={setImageUrl} />

      <div className="flex flex-wrap gap-6 text-sm text-stone-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" />
          منتج مميز
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="bestSeller" />
          الأكثر طلبًا
        </label>
      </div>

      <button
        disabled={isPending}
        className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-60"
      >
        {isPending ? "جاري الحفظ..." : "حفظ المنتج"}
      </button>
    </form>
  );
}