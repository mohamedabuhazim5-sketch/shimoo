import { Heart } from "lucide-react";
import { storeConfig } from "@/lib/data/mock-data";

export default function ContactPage() {
  const whatsappLink = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
    storeConfig.whatsappMessage
  )}`;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-black text-pink-700">تواصل معنا</h1>
        <p className="mt-2 text-stone-600">
          يسعدنا تجهيز طلباتك والرد على كل استفساراتك الخاصة بالخطوبة والفرح.
        </p>
      </div>

      <div className="space-y-4 rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 text-pink-600">
          <Heart className="h-4 w-4 fill-pink-200" />
          من أول الخطوبة لليلة الفرح… shemoo معاكِ
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          className="block rounded-2xl border border-pink-100 p-4 text-stone-700"
        >
          واتساب: 01515351143
        </a>
      </div>
    </div>
  );
}