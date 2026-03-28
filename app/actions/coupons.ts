"use server";

import { validateCoupon } from "@/lib/data/coupons";

export async function applyCoupon(code: string) {
  return await validateCoupon(code);
}