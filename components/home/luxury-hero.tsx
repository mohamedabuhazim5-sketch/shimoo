"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import type { BannerItem } from "@/lib/data/banners";

export default function LuxuryHero({
  banners,
}: {
  banners: BannerItem[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) {
    return (
      <section className="rounded-[2.5rem] border border-pink-100 bg-gradient-to-l from-pink-100 via-rose-50 to-white p-10 md:p-16">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-pink-700 shadow">
            <Sparkles className="h-4 w-4" />
            لمسة حب لكل مناسبة مميزة
          </span>
          <h1 className="text-4xl font-black leading-tight text-stone-900 md:text-6xl">
            لأن فرحتك تستحق
            <span className="block text-pink-600">أجمل التفاصيل</span>
          </h1>
          <p className="text-lg leading-8 text-stone-600">
            shemoo يقدم لك صواني الخطوبة وورد الأفراح والهدايا والتنسيقات
            الرومانسية بستايل ناعم وفخم.
          </p>
          <Link
            href="/products"
            className="inline-flex rounded-2xl bg-pink-600 px-6 py-3 text-sm font-medium text-white hover:bg-pink-700"
          >
            تسوق الآن
          </Link>
        </div>
      </section>
    );
  }

  const banner = banners[index];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-pink-100 shadow-lg">
      <div
        className="relative min-h-[520px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(20,20,20,0.30), rgba(20,20,20,0.30)), url(${banner.image_url})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-pink-900/30 via-transparent to-rose-900/20" />

        <div className="relative flex min-h-[520px] items-center px-6 py-12 md:px-12">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              <Heart className="h-4 w-4 fill-pink-200 text-pink-200" />
              shemoo
            </span>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              {banner.title}
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-white/90">
              {banner.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={banner.button_link || "/products"}
                className="rounded-2xl bg-pink-600 px-6 py-3 text-sm font-medium text-white hover:bg-pink-700"
              >
                {banner.button_text || "تسوق الآن"}
              </Link>

              <Link
                href="/track-order"
                className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
              >
                تتبع الطلب
              </Link>
            </div>
          </div>
        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}