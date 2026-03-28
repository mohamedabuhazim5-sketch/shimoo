import { createClient } from "@/lib/supabase/server";

export type CouponResult = {
  valid: boolean;
  message: string;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
};

export async function validateCoupon(code: string): Promise<CouponResult> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return { valid: false, message: "أدخلي كود الخصم" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", normalized)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return { valid: false, message: "كود الخصم غير صالح" };
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { valid: false, message: "كود الخصم منتهي" };
  }

  return {
    valid: true,
    message: "تم تطبيق كود الخصم",
    discountType: data.discount_type,
    discountValue: Number(data.discount_value),
  };
}