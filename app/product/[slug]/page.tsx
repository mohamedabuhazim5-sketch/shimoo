import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, Sparkles } from "lucide-react";
import { storeConfig } from "@/lib/data/mock-data";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/products/add-to-cart-button";
import { getProductBySlug } from "@/lib/data/products";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const whatsappLink = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
    `مرحبًا، أريد طلب المنتج: ${product.name} من متجر shemoo`
  )}`;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative h-[500px] overflow-hidden rounded-[2.5rem] border border-pink-100 bg-white shadow-sm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm text-pink-700">
          <Heart className="h-4 w-4 fill-pink-200" />
          {product.category}
        </div>

        <h1 className="text-4xl font-black leading-tight text-stone-900">
          {product.name}
        </h1>

        <p className="leading-8 text-stone-600">{product.description}</p>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-black text-pink-700">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-lg text-stone-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-l from-pink-50 to-white p-5">
          <div className="mb-2 flex items-center gap-2 text-pink-700">
            <Sparkles className="h-4 w-4" />
            لمسة خاصة من shemoo
          </div>
          <p className="leading-8 text-stone-700">
            لأن فرحتك تستحق أجمل التفاصيل، صممنا هذا المنتج بلمسة ناعمة
            تضيف سحرًا خاصًا ليومك المميز.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <AddToCartButton product={product} />
          <a
            href={whatsappLink}
            target="_blank"
            className="rounded-2xl border border-pink-200 bg-white px-5 py-3 text-sm font-medium text-pink-700 hover:bg-pink-50"
          >
            اطلب عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
}