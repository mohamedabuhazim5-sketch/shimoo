import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const orderId = String(body.orderId || "").trim();
  const phone = String(body.phone || "").trim();

  if (!orderId || !phone) {
    return NextResponse.json({ found: false, message: "بيانات غير مكتملة" });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("id, customer_name, customer_phone, status, total_price, created_at, address")
    .eq("customer_phone", phone)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return NextResponse.json({ found: false, message: "تعذر الوصول إلى الطلب" });
  }

  const matchedOrder = data.find((order) =>
    String(order.id).toLowerCase().startsWith(orderId.toLowerCase())
  );

  if (!matchedOrder) {
    return NextResponse.json({ found: false, message: "لم يتم العثور على طلب مطابق" });
  }

  return NextResponse.json({
    found: true,
    customer_name: matchedOrder.customer_name,
    customer_phone: matchedOrder.customer_phone,
    status: matchedOrder.status,
    total_price: matchedOrder.total_price,
    created_at: matchedOrder.created_at,
    address: matchedOrder.address,
  });
}
