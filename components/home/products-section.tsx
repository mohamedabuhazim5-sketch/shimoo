import ProductCard from "@/components/products/product-card";
import { Product } from "@/types";

export default function ProductsSection({
  products,
}: {
  products: Product[];
}) {
  const featuredProducts = products.filter((p) => p.featured);
  const bestSellerProducts = products.filter((p) => p.bestSeller);

  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <h2 className="text-3xl font-black text-pink-700">منتجات مميزة</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-pink-700">الأكثر طلبًا</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bestSellerProducts.map((product) => (
            <ProductCard key={`best-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}