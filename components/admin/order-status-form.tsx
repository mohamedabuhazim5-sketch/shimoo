"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/admin";
import { toast } from "sonner";

const statuses = ["pending", "confirmed", "shipped", "done", "cancelled"];

export default function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const result = await updateOrderStatus(formData);

          if (!result.success) {
            toast.error(result.message || "فشل تحديث الحالة");
            return;
          }

          toast.success("تم تحديث حالة الطلب");
        });
      }}
      className="flex flex-wrap items-center gap-3"
    >
      <input type="hidden" name="id" value={orderId} />

      <select
        name="status"
        defaultValue={currentStatus}
        className="rounded-2xl border border-pink-200 px-4 py-3"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        disabled={isPending}
        className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-60"
      >
        {isPending ? "جاري الحفظ..." : "حفظ الحالة"}
      </button>
    </form>
  );
}