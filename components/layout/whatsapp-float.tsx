import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import { storeConfig } from "@/lib/data/mock-data";

export default function WhatsAppFloat() {
  const whatsappLink = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
    storeConfig.whatsappMessage
  )}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-pink-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-pink-700"
    >
      <Heart className="h-4 w-4 fill-pink-200" />
      <MessageCircle className="h-5 w-5" />
      واتساب
    </Link>
  );
}