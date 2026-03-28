"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { isInWishlist, toggleWishlist } from "@/lib/actions/wishlist";

export default function WishlistButton({ product }: { product: Product }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isInWishlist(product.id));
  }, [product.id]);

  return (
    <button
      onClick={() => {
        toggleWishlist(product);
        setActive(!active);
      }}
      className={`rounded-full p-2 transition ${
        active ? "bg-pink-100 text-pink-600" : "bg-white/90 text-stone-500"
      }`}
    >
      <Heart className={`h-4 w-4 ${active ? "fill-pink-300" : ""}`} />
    </button>
  );
}