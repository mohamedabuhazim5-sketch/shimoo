"use client";

import { useTransition } from "react";
import { deleteCategory } from "@/app/actions/admin";
import { toast } from "sonner";

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        const confirmed = window.confirm("هل أنت متأكد من حذف هذا القسم؟");
        if (!confirmed) return;

        const formData = new FormData();
        formData.set("id", id);

        startTransition(async () => {
          const result = await deleteCategory(formData);

          if (!result.success) {
            toast.error(result.message || "فشل حذف القسم");
            return;
          }

          toast.success("تم حذف القسم");
        });
      }}
      className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {isPending ? "جاري الحذف..." : "حذف القسم"}
    </button>
  );
}