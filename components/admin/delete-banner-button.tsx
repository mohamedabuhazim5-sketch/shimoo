"use client";

import { useTransition } from "react";
import { deleteBanner } from "@/app/actions/admin";
import { toast } from "sonner";

export default function DeleteBannerButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        const confirmed = window.confirm("هل أنت متأكد من حذف هذا البانر؟");
        if (!confirmed) return;

        const formData = new FormData();
        formData.set("id", id);

        startTransition(async () => {
          const result = await deleteBanner(formData);

          if (!result.success) {
            toast.error(result.message || "فشل حذف البانر");
            return;
          }

          toast.success("تم حذف البانر");
        });
      }}
      className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {isPending ? "جاري الحذف..." : "حذف البانر"}
    </button>
  );
}