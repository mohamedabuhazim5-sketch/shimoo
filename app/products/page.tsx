import ProductCard from "@/components/products/product-card";
import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;
  const searchQuery = params.q?.toLowerCase().trim() || "";

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  let filteredProducts = selectedCategory
    ? products.filter((product) => {
        const category = categories.find((c) => c.name === product.category);
        return category?.slug === selectedCategory;
      })
    : products;

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );
  }

  const currentCategory = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-l from-pink-50 to-white p-8">
        <h1 className="text-4xl font-black text-pink-700">
          {currentCategory ? currentCategory.name : "كل المنتجات"}
        </h1>
        <p className="mt-2 text-stone-600">
          اختاري من أجمل تجهيزات الخطوبة والفرح بستايل ناعم ومميز.
        </p>

        <form className="mt-6">
          <input
            name="q"
            defaultValue={params.q || ""}
            placeholder="ابحثي عن منتج..."
            className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none focus:border-pink-400"
          />
          {selectedCategory && (
            <input type="hidden" name="category" value={selectedCategory} />
          )}
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-[2rem] border border-pink-100 bg-white p-10 text-center text-stone-500">
          لا توجد منتجات مطابقة حاليًا.
        </div>
      )}
    </div>
  );
}