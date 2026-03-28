"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/product-card";
import { Product } from "@/types";
import { getWishlist } from "@/lib/actions/wishlist";

export default function WishlistPage() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const load = () => setItems(getWishlist());
    load();
    window.addEventListener("wishlist-updated", load);

    return () => {
      window.removeEventListener("wishlist-updated", load);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-l from-pink-50 to-white p-8">
        <h1 className="text-4xl font-black text-pink-700">المفضلة</h1>
        <p className="mt-2 text-stone-600">
          احفظي المنتجات التي أعجبتك للرجوع إليها لاحقًا.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[2rem] border border-pink-100 bg-white p-10 text-center text-stone-500">
          لا توجد منتجات في المفضلة حاليًا.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}