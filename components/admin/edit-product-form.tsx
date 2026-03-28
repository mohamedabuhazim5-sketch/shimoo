"use client";

import { useState, useTransition } from "react";
import { updateProduct } from "@/app/actions/admin";
import { toast } from "sonner";

type ProductItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  old_price: number | null;
  stock: number;
  image_url: string | null;
  is_featured: boolean | null;
  is_best_seller: boolean | null;
};

export default function EditProductForm({
  product,
}: {
  product: ProductItem;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-pink-200 px-4 py-2 text-sm text-pink-700 hover:bg-pink-50"
      >
        تعديل
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-pink-700">تعديل المنتج</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-pink-50 px-3 py-1 text-sm text-pink-700"
              >
                إغلاق
              </button>
            </div>

            <form
              action={(formData) => {
                startTransition(async () => {
                  const result = await updateProduct(formData);

                  if (!result.success) {
                    toast.error(result.message || "فشل تعديل المنتج");
                    return;
                  }

                  toast.success("تم تعديل المنتج");
                  setOpen(false);
                });
              }}
              className="space-y-4"
            >
              <input type="hidden" name="id" value={product.id} />

              <input
                name="name"
                defaultValue={product.name}
                placeholder="اسم المنتج"
                className="w-full rounded-2xl border border-pink-200 px-4 py-3"
              />

              <textarea
                name="description"
                defaultValue={product.description || ""}
                placeholder="وصف المنتج"
                className="min-h-28 w-full rounded-2xl border border-pink-200 px-4 py-3"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="price"
                  type="number"
                  defaultValue={product.price}
                  placeholder="السعر"
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3"
                />
                <input
                  name="oldPrice"
                  type="number"
                  defaultValue={product.old_price || ""}
                  placeholder="السعر قبل الخصم"
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="stock"
                  type="number"
                  defaultValue={product.stock}
                  placeholder="المخزون"
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3"
                />
                <input
                  name="imageUrl"
                  defaultValue={product.image_url || ""}
                  placeholder="رابط الصورة"
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3"
                />
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-stone-700">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={!!product.is_featured}
                  />
                  منتج مميز
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="bestSeller"
                    defaultChecked={!!product.is_best_seller}
                  />
                  الأكثر طلبًا
                </label>
              </div>

              <button
                disabled={isPending}
                className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-60"
              >
                {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}