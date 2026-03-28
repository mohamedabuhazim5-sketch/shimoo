import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Category } from "@/types";

export default function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 fill-pink-200 text-pink-500" />
        <h2 className="text-3xl font-black text-pink-700">أقسام shemoo</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent" />
            </div>

            <div className="space-y-2 p-5">
              <h3 className="text-xl font-bold text-stone-900">{category.name}</h3>
              <p className="text-sm leading-7 text-stone-600">
                {category.description || "اكتشفي أجمل المنتجات والتنسيقات الخاصة بهذا القسم."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}