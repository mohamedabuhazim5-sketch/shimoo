import { Heart } from "lucide-react";

export default function WhyUsSection() {
  const items = [
    "تصميمات رومانسية ولمسات بناتية ناعمة",
    "تجهيزات مميزة للخطوبة والفرح",
    "خدمة سريعة وسهلة عبر واتساب",
    "منتجات مناسبة للهدايا والمناسبات الخاصة",
  ];

  return (
    <section className="rounded-[2rem] bg-pink-50 p-8 md:p-12">
      <h2 className="text-3xl font-black text-pink-700">لماذا تختارين shemoo؟</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-stone-700 shadow-sm"
          >
            <Heart className="h-4 w-4 fill-pink-200 text-pink-500" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}