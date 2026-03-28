"use client";

import { addToCart } from "@/lib/actions/cart";
import { Product } from "@/types";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: Product }) {
  return (
    <button
      onClick={() => {
        addToCart(product);
        toast.success("تمت إضافة المنتج إلى السلة");
      }}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-700"
    >
      <Heart className="h-4 w-4 fill-pink-200" />
      <ShoppingCart className="h-4 w-4" />
      أضف إلى السلة
    </button>
  );
}