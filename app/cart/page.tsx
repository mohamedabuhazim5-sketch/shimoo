"use client";

import { useEffect, useMemo, useState } from "react";
import { CartItem, getCart, removeFromCart, updateCartQuantity } from "@/lib/actions/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const refresh = () => setItems(getCart());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-pink-700">السلة</h1>
        <p className="mt-2 text-stone-600">راجعي منتجاتك قبل إتمام الطلب.</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          السلة فارغة حاليًا.
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-pink-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-stone-500">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        updateCartQuantity(item.id, Number(e.target.value));
                        refresh();
                      }}
                      className="w-20 rounded-xl border border-pink-300 px-3 py-2"
                    />
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        refresh();
                      }}
                      className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-pink-700">ملخص الطلب</h2>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span>الإجمالي</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block rounded-2xl bg-pink-600 px-5 py-3 text-center text-sm font-medium text-white"
            >
              متابعة إلى إتمام الطلب
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}