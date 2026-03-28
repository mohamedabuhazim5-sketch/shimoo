import Link from "next/link";
import OrderStatusForm from "@/components/admin/order-status-form";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  if (!order) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        الطلب غير موجود
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/admin"
        className="inline-block rounded-2xl border border-pink-200 px-4 py-2 text-sm text-pink-700 hover:bg-pink-50"
      >
        رجوع للوحة الإدارة
      </Link>

      <div className="rounded-[2rem] border border-pink-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black text-pink-700">
          تفاصيل الطلب #{order.id.slice(0, 8)}
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-pink-50 p-4">
            <div className="text-sm text-stone-500">اسم العميل</div>
            <div className="mt-1 font-bold text-stone-900">{order.customer_name}</div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-4">
            <div className="text-sm text-stone-500">الهاتف</div>
            <div className="mt-1 font-bold text-stone-900">{order.customer_phone}</div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-4">
            <div className="text-sm text-stone-500">العنوان</div>
            <div className="mt-1 font-bold text-stone-900">{order.address || "-"}</div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-4">
            <div className="text-sm text-stone-500">الإجمالي</div>
            <div className="mt-1 font-bold text-pink-700">
              {formatPrice(order.total_price)}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 text-sm text-stone-500">ملاحظات</div>
          <div className="rounded-2xl bg-pink-50 p-4 text-stone-700">
            {order.notes || "لا توجد ملاحظات"}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 text-sm text-stone-500">حالة الطلب</div>
          <OrderStatusForm orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="rounded-[2rem] border border-pink-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black text-pink-700">عناصر الطلب</h2>

        <div className="mt-6 space-y-4">
          {items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-pink-100 p-4"
            >
              <div>
                <div className="font-bold text-stone-900">{item.product_name}</div>
                <div className="text-sm text-stone-500">
                  الكمية: {item.quantity}
                </div>
              </div>

              <div className="font-bold text-pink-700">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}