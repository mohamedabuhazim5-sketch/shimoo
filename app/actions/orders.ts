"use server";

import { createClient } from "@/lib/supabase/server";

type CheckoutItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type CreateOrderPayload = {
  customerName: string;
  customerPhone: string;
  address: string;
  notes: string;
  totalPrice: number;
  items: CheckoutItem[];
};

export async function createOrder(payload: CreateOrderPayload) {
  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: payload.customerName,
      customer_phone: payload.customerPhone,
      address: payload.address,
      notes: payload.notes,
      total_price: payload.totalPrice,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) {
    console.error("Order insert error:", orderError);
    return { success: false, message: "فشل حفظ الطلب" };
  }

  const itemsPayload = payload.items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsPayload);

  if (itemsError) {
    console.error("Order items insert error:", itemsError);
    return { success: false, message: "تم حفظ الطلب لكن حدث خطأ في عناصر الطلب" };
  }

  return { success: true, orderId: order.id };
}