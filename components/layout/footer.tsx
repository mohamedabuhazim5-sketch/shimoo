import Link from "next/link";
import { storeConfig } from "@/lib/data/mock-data";

export default function Footer() {
  const whatsappLink = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
    storeConfig.whatsappMessage
  )}`;

  return (
    <footer className="mt-20 border-t border-pink-100 bg-pink-50/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-black text-pink-700">{storeConfig.name}</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            كل تفاصيل الخطوبة والفرح في مكان واحد، بلمسة رومانسية ناعمة
            وتنسيقات مميزة تناسب أجمل لحظاتك.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-stone-900">روابط سريعة</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
            <Link href="/">الرئيسية</Link>
            <Link href="/products">المنتجات</Link>
            <Link href="/wishlist">المفضلة</Link>
            <Link href="/track-order">تتبع الطلب</Link>
            <Link href="/about">من نحن</Link>
            <Link href="/contact">تواصل معنا</Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-stone-900">تواصل معنا</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
            <a href={whatsappLink} target="_blank">
              واتساب: 01515351143
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}