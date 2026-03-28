"use client";

import { Product } from "@/types";

const CART_KEY = "shemoo_cart";

export type CartItem = Product & { quantity: number };

function emitCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}

function safeParseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw =
    localStorage.getItem(CART_KEY) || localStorage.getItem("mastour_cart");
  return safeParseCart(raw);
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  emitCartUpdated();
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter((item) => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  emitCartUpdated();
}

export function updateCartQuantity(productId: string, quantity: number) {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart().map((item) =>
    item.id === productId ? { ...item, quantity } : item
  );
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  emitCartUpdated();
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  emitCartUpdated();
}
