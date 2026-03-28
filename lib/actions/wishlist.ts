"use client";

import { Product } from "@/types";

const WISHLIST_KEY = "shemoo_wishlist";

function safeParseWishlist(raw: string | null): Product[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getWishlist(): Product[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(WISHLIST_KEY);
  return safeParseWishlist(raw);
}

export function isInWishlist(productId: string) {
  return getWishlist().some((item) => item.id === productId);
}

export function toggleWishlist(product: Product) {
  const wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);

  const updated = exists
    ? wishlist.filter((item) => item.id !== product.id)
    : [...wishlist, product];

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("wishlist-updated"));
}
