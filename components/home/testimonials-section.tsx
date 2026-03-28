import { Heart, Star } from "lucide-react";

const testimonials = [
  {
    name: "سارة",
    text: "التفاصيل كانت جميلة جدًا والمنتج وصل بشكل راقٍ فعلًا، حسّيت إنهم مهتمين بكل لمسة.",
  },
  {
    name: "مريم",
    text: "الستايل بناتي جدًا وشيك، وطلبت عبر واتساب وكان التعامل سهل وسريع.",
  },
  {
    name: "آية",
    text: "أجمل حاجة إن المنتجات شكلها مختلف وناعم ومناسبة جدًا للخطوبة والفرح.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 fill-pink-200 text-pink-500" />
        <h2 className="text-3xl font-black text-pink-700">آراء عميلاتنا</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-1 text-pink-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-pink-200" />
              ))}
            </div>

            <p className="leading-8 text-stone-600">{item.text}</p>

            <div className="mt-5 font-bold text-pink-700">{item.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}