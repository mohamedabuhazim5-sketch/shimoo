import CategoriesSection from "@/components/home/categories-section";
import LuxuryHero from "@/components/home/luxury-hero";
import LuxuryStats from "@/components/home/luxury-stats";
import ProductsSection from "@/components/home/products-section";
import PromoBanner from "@/components/home/promo-banner";
import TestimonialsSection from "@/components/home/testimonials-section";
import WhyUsSection from "@/components/home/why-us-section";
import { getActiveBanners } from "@/lib/data/banners";
import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

export default async function HomePage() {
  const [categories, products, banners] = await Promise.all([
    getCategories(),
    getProducts(),
    getActiveBanners(),
  ]);

  return (
    <div className="space-y-16">
      <LuxuryHero banners={banners} />
      <LuxuryStats />
      <CategoriesSection categories={categories} />
      <PromoBanner />
      <ProductsSection products={products} />
      <WhyUsSection />
      <TestimonialsSection />
    </div>
  );
}