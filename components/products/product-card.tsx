import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "./add-to-cart-button";
import WishlistButton from "./wishlist-button";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="relative block h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-pink-700 shadow">
              {product.badge}
            </span>
          )}
        </Link>

        <div className="absolute left-3 top-3">
          <WishlistButton product={product} />
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2 text-xs text-pink-600">
          <Heart className="h-3.5 w-3.5 fill-pink-200" />
          {product.category}
        </div>

        <Link href={`/product/${product.slug}`} className="block text-lg font-bold text-stone-900">
          {product.name}
        </Link>

        <p className="line-clamp-2 text-sm text-stone-600">{product.description}</p>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-pink-700">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-stone-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}