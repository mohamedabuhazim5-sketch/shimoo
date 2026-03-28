"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { CartItem, clearCart, getCart } from "@/lib/actions/cart";
import { formatPrice } from "@/lib/utils";
import { storeConfig } from "@/lib/data/mock-data";
import { toast } from "sonner";
import { createOrder } from "@/app/actions/orders";
import { applyCoupon } from "@/app/actions/coupons";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState("");
  const [isPending, startTransition] = useTransition();
  const [couponPending, startCouponTransition] = useTransition();

  useEffect(() => {
    setItems(getCart());
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const total = Math.max(subtotal - discount, 0);

  const handleApplyCoupon = () => {
    startCouponTransition(async () => {
      const result = await applyCoupon(coupon);

      if (!result.valid) {
        setDiscount(0);
        setDiscountLabel("");
        toast.error(result.message);
        return;
      }

      let calculatedDiscount = 0;

      if (result.discountType === "percentage") {
        calculatedDiscount = subtotal * ((result.discountValue || 0) / 100);
        setDiscountLabel(`خصم ${result.discountValue}%`);
      } else {
        calculatedDiscount = result.discountValue || 0;
        setDiscountLabel(`خصم ${result.discountValue} جنيه`);
      }

      setDiscount(calculatedDiscount);
      toast.success(result.message);
    });
  };

  const handleCheckout = () => {
    if (!name || !phone || !address || items.length === 0) {
      toast.error("من فضلك املئي البيانات المطلوبة أولًا");
      return;
    }

    startTransition(async () => {
      const result = await createOrder({
        customerName: name,
        customerPhone: phone,
        address,
        notes,
        totalPrice: total,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      if (!result.success) {
        toast.error(result.message || "حدث خطأ أثناء حفظ الطلب");
        return;
      }

      const productsText = items
        .map(
          (item) =>
            `- ${item.name} × ${item.quantity} = ${item.price * item.quantity} جنيه`
        )
        .join("\n");

      const message = `طلب جديد من متجر shemoo
رقم الطلب: ${result.orderId}
الاسم: ${name}
الهاتف: ${phone}
العنوان: ${address}
ملاحظات: ${notes || "لا يوجد"}
${discount > 0 ? `الخصم: ${discountLabel}\n` : ""}
المنتجات:
${productsText}

الإجمالي النهائي: ${total} جنيه`;

      const link = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(link, "_blank");

      clearCart();
      setItems([]);
      setName("");
      setPhone("");
      setAddress("");
      setNotes("");
      setCoupon("");
      setDiscount(0);
      setDiscountLabel("");

      toast.success("تم حفظ الطلب وإرساله عبر واتساب");
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-l from-pink-50 to-white p-8">
        <h1 className="text-4xl font-black text-pink-700">إتمام الطلب</h1>
        <p className="mt-2 text-stone-600">
          املئي بياناتك لإرسال الطلب وحفظه في المتجر.
        </p>
      </div>

      <div className="grid gap-4">
        <input
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-2xl border border-pink-200 px-4 py-3"
        />
        <input
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-2xl border border-pink-200 px-4 py-3"
        />
        <input
          placeholder="العنوان"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-2xl border border-pink-200 px-4 py-3"
        />
        <textarea
          placeholder="ملاحظات إضافية"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-32 rounded-2xl border border-pink-200 px-4 py-3"
        />
      </div>

      <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-pink-700">كود الخصم</h2>

        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            placeholder="أدخلي كوبون الخصم"
            className="flex-1 rounded-2xl border border-pink-200 px-4 py-3"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={couponPending}
            className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-60"
          >
            {couponPending ? "جاري التطبيق..." : "تطبيق الكوبون"}
          </button>
        </div>

        {discount > 0 && (
          <div className="mt-4 rounded-2xl bg-pink-50 p-4 text-sm text-pink-700">
            تم تطبيق الخصم: {discountLabel}
          </div>
        )}
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-pink-700">ملخص الطلب</h2>

        <div className="mt-4 space-y-2 text-sm text-stone-700">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-pink-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-stone-600">الإجمالي قبل الخصم</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex items-center justify-between text-pink-700">
              <span>{discountLabel}</span>
              <span>- {formatPrice(discount)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-medium">الإجمالي النهائي</span>
            <span className="text-lg font-black text-pink-700">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isPending}
          className="mt-6 w-full rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-60"
        >
          {isPending ? "جاري تأكيد الطلب..." : "تأكيد الطلب"}
        </button>
      </div>
    </div>
  );
}