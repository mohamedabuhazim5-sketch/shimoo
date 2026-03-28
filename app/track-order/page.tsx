"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<null | {
    found: boolean;
    customer_name?: string;
    customer_phone?: string;
    status?: string;
    total_price?: number;
    created_at?: string;
    address?: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  async function handleTrack() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/track-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, phone }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-[2.5rem] border border-pink-100 bg-gradient-to-l from-pink-100 via-rose-50 to-white p-8 shadow-sm">
        <h1 className="text-4xl font-black text-pink-700">تتبع الطلب</h1>
        <p className="mt-2 text-stone-600">
          أدخلي رقم الطلب ورقم الهاتف لمتابعة حالة طلبك.
        </p>
      </div>

      <div className="space-y-4 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="رقم الطلب"
          className="w-full rounded-2xl border border-pink-200 px-4 py-3"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="رقم الهاتف"
          className="w-full rounded-2xl border border-pink-200 px-4 py-3"
        />

        <button
          onClick={handleTrack}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-60"
        >
          <Search className="h-4 w-4" />
          {loading ? "جاري البحث..." : "تتبع الطلب"}
        </button>
      </div>

      {result && result.found && (
        <div className="space-y-4 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <div className="rounded-2xl bg-pink-50 p-4">
            <div className="text-sm text-stone-500">اسم العميل</div>
            <div className="mt-1 font-bold text-stone-900">{result.customer_name}</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-pink-50 p-4">
              <div className="text-sm text-stone-500">الحالة</div>
              <div className="mt-1 font-bold text-pink-700">{result.status}</div>
            </div>

            <div className="rounded-2xl bg-pink-50 p-4">
              <div className="text-sm text-stone-500">الإجمالي</div>
              <div className="mt-1 font-bold text-stone-900">
                {result.total_price} جنيه
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-4">
            <div className="text-sm text-stone-500">العنوان</div>
            <div className="mt-1 font-bold text-stone-900">{result.address || "-"}</div>
          </div>
        </div>
      )}

      {result && !result.found && (
        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 text-center text-stone-600 shadow-sm">
          لم يتم العثور على طلب مطابق.
        </div>
      )}
    </div>
  );
}