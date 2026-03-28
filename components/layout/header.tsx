"use client";

import Link from "next/link";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { storeConfig } from "@/lib/data/mock-data";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/wishlist", label: "المفضلة" },
  { href: "/track-order", label: "تتبع الطلب" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
  { href: "/admin", label: "الإدارة" },
];

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const readCart = () => {
      try {
        const raw =
          localStorage.getItem("shemoo_cart") ||
          localStorage.getItem("mastour_cart");
        const items = raw ? JSON.parse(raw) : [];
        const count = Array.isArray(items)
          ? items.reduce(
              (sum: number, item: { quantity?: number }) => sum + (item.quantity || 0),
              0
            )
          : 0;
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };

    readCart();
    window.addEventListener("storage", readCart);
    window.addEventListener("cart-updated", readCart as EventListener);

    return () => {
      window.removeEventListener("storage", readCart);
      window.removeEventListener("cart-updated", readCart as EventListener);
    };
  }, []);

  const whatsappLink = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
    storeConfig.whatsappMessage
  )}`;

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black text-pink-700">
          <Heart className="h-6 w-6 fill-pink-200 text-pink-500" />
          {storeConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-stone-700 transition hover:text-pink-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={whatsappLink}
            target="_blank"
            className="rounded-full border border-pink-200 p-2 text-pink-600 hover:bg-pink-50"
          >
            <MessageCircle className="h-4 w-4" />
          </Link>

          <Link
            href="/cart"
            className="relative rounded-full bg-pink-600 p-2 text-white hover:bg-pink-700"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-pink-700 shadow">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}