import { Gift, Heart, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-pink-100 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 p-8 text-white shadow-xl md:p-10">
      <div className="absolute -left-6 top-4 opacity-20">
        <Heart className="h-24 w-24 fill-white" />
      </div>
      <div className="absolute bottom-0 right-4 opacity-20">
        <Gift className="h-24 w-24" />
      </div>

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            عروض خاصة ومحدودة
          </div>

          <h2 className="text-3xl font-black md:text-4xl">
            كودات خصم ولمسات رومانسية لكل مناسبة
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-white/90 md:text-base">
            استخدمي كوبونات الخصم أثناء الطلب، واختاري أجمل صواني الخطوبة
            وورد الأفراح والبوكسات الراقية.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white/15 px-6 py-5 text-center backdrop-blur">
          <div className="text-sm">خصومات حتى</div>
          <div className="mt-2 text-4xl font-black">25%</div>
        </div>
      </div>
    </section>
  );
}