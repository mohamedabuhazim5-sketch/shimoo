import { Gift, Heart, Sparkles, Truck } from "lucide-react";

const items = [
  { icon: Heart, title: "ستايل رومانسي", subtitle: "تفاصيل ناعمة لكل مناسبة" },
  { icon: Gift, title: "هدايا مميزة", subtitle: "بوكسات وتجهيزات فخمة" },
  { icon: Sparkles, title: "تنسيقات خاصة", subtitle: "خطوبة وفرح بلمسة جميلة" },
  { icon: Truck, title: "سهولة الطلب", subtitle: "واتساب + متجر + تتبع" },
];

export default function LuxuryStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-pink-50 p-3">
              <Icon className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-black text-pink-700">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-stone-600">{item.subtitle}</p>
          </div>
        );
      })}
    </section>
  );
}