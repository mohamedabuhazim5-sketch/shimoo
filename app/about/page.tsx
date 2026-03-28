import { Heart, Sparkles, Gift } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <div className="rounded-[2.5rem] border border-pink-100 bg-gradient-to-l from-pink-100 via-rose-50 to-white p-10 shadow-sm">
        <h1 className="text-4xl font-black text-pink-700">من نحن</h1>
        <p className="mt-4 max-w-3xl leading-8 text-stone-600">
          shemoo هو متجر متخصص في صواني الخطوبة وورد الأفراح ومستلزمات العروسة
          والهدايا الخاصة بالمناسبات، بهدف تقديم تفاصيل ناعمة ورومانسية تكمّل
          أجمل لحظاتك.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <Heart className="mb-4 h-8 w-8 fill-pink-200 text-pink-500" />
          <h2 className="text-xl font-black text-pink-700">رسالتنا</h2>
          <p className="mt-3 leading-8 text-stone-600">
            تقديم منتجات أنيقة بستايل بناتي ورومانسي يناسب الخطوبة والفرح.
          </p>
        </div>

        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <Sparkles className="mb-4 h-8 w-8 text-pink-500" />
          <h2 className="text-xl font-black text-pink-700">تميزنا</h2>
          <p className="mt-3 leading-8 text-stone-600">
            نهتم بالتفاصيل الصغيرة التي تجعل كل منتج يبدو خاصًا ومميزًا.
          </p>
        </div>

        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <Gift className="mb-4 h-8 w-8 text-pink-500" />
          <h2 className="text-xl font-black text-pink-700">ما نقدمه</h2>
          <p className="mt-3 leading-8 text-stone-600">
            صواني، ورد، بوكسات، تجهيزات، ولمسات أنيقة لكل مناسبة مميزة.
          </p>
        </div>
      </div>
    </div>
  );
}