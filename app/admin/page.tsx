import { createBanner, createCategory } from "@/app/actions/admin";
import { signOutAdmin } from "@/app/actions/auth";
import DeleteBannerButton from "@/components/admin/delete-banner-button";
import DeleteCategoryButton from "@/components/admin/delete-category-button";
import DeleteProductButton from "@/components/admin/delete-product-button";
import EditProductForm from "@/components/admin/edit-product-form";
import ProductForm from "@/components/admin/product-form";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    { data: categories },
    { data: products },
    { data: orders },
    { data: userData },
    { data: banners },
  ] = await Promise.all([
    supabase.from("categories").select("id, name").order("created_at", { ascending: false }),
    supabase
      .from("products")
      .select("id, name, description, price, old_price, stock, image_url, is_featured, is_best_seller")
      .order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("id, customer_name, customer_phone, total_price, status, created_at")
      .order("created_at", { ascending: false }),
    supabase.auth.getUser(),
    supabase.from("banners").select("*").order("sort_order", { ascending: true }),
  ]);

  const user = userData.user;

  return (
    <div className="space-y-10">
      <div className="rounded-[2.5rem] border border-pink-100 bg-gradient-to-l from-pink-100 via-rose-50 to-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-pink-700">لوحة إدارة shemoo</h1>
            <p className="mt-2 text-stone-600">
              إدارة المنتجات والطلبات والأقسام بواجهة أنيقة ورومانسية.
            </p>
            {user?.email && (
              <p className="mt-2 text-sm text-pink-700">
                مسجل الدخول: {user.email}
              </p>
            )}
          </div>

          <form action={signOutAdmin}>
            <button className="rounded-2xl border border-pink-200 bg-white px-5 py-3 text-sm font-medium text-pink-700 hover:bg-pink-50">
              تسجيل الخروج
            </button>
          </form>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <div className="text-sm text-stone-500">عدد الأقسام</div>
          <div className="mt-2 text-3xl font-black text-pink-700">
            {categories?.length ?? 0}
          </div>
        </div>

        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <div className="text-sm text-stone-500">عدد المنتجات</div>
          <div className="mt-2 text-3xl font-black text-pink-700">
            {products?.length ?? 0}
          </div>
        </div>

        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <div className="text-sm text-stone-500">عدد الطلبات</div>
          <div className="mt-2 text-3xl font-black text-pink-700">
            {orders?.length ?? 0}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          action={createCategory}
          className="space-y-4 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-black text-pink-700">إضافة قسم جديد</h2>

          <input
            name="name"
            placeholder="اسم القسم"
            className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
          />

          <input
            name="imageUrl"
            placeholder="رابط صورة القسم"
            className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
          />

          <button className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700">
            حفظ القسم
          </button>
        </form>

        <ProductForm categories={categories ?? []} />
      </div>

      <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-pink-700">الأقسام الحالية</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-2xl border border-pink-100 p-4"
            >
              <div className="font-bold text-stone-900">{category.name}</div>
              <DeleteCategoryButton id={category.id} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          action={createBanner}
          className="space-y-4 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-black text-pink-700">إضافة بانر جديد</h2>

          <input
            name="title"
            placeholder="عنوان البانر"
            className="w-full rounded-2xl border border-pink-200 px-4 py-3"
          />

          <textarea
            name="subtitle"
            placeholder="وصف البانر"
            className="min-h-24 w-full rounded-2xl border border-pink-200 px-4 py-3"
          />

          <input
            name="imageUrl"
            placeholder="رابط صورة البانر"
            className="w-full rounded-2xl border border-pink-200 px-4 py-3"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="buttonText"
              placeholder="نص الزر"
              className="w-full rounded-2xl border border-pink-200 px-4 py-3"
            />
            <input
              name="buttonLink"
              placeholder="رابط الزر"
              className="w-full rounded-2xl border border-pink-200 px-4 py-3"
            />
          </div>

          <div className="flex items-center gap-4">
            <input
              name="sortOrder"
              type="number"
              placeholder="الترتيب"
              className="w-40 rounded-2xl border border-pink-200 px-4 py-3"
            />
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" name="isActive" defaultChecked />
              بانر نشط
            </label>
          </div>

          <button className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700">
            حفظ البانر
          </button>
        </form>

        <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-pink-700">البانرات الحالية</h2>

          <div className="mt-6 space-y-4">
            {banners?.map((banner) => (
              <div
                key={banner.id}
                className="rounded-2xl border border-pink-100 p-4"
              >
                <div className="font-bold text-stone-900">{banner.title}</div>
                <div className="mt-1 text-sm text-stone-500">{banner.subtitle}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-700">
                    الترتيب: {banner.sort_order}
                  </span>
                  <DeleteBannerButton id={banner.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-pink-700">المنتجات الحالية</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products?.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-pink-100 p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    product.image_url ||
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={product.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <div className="font-bold text-stone-900">{product.name}</div>
                  <div className="text-sm text-stone-500">
                    السعر: {formatPrice(product.price)}
                  </div>
                  <div className="text-sm text-stone-500">
                    المخزون: {product.stock}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <EditProductForm product={product} />
                <DeleteProductButton id={product.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-pink-700">الطلبات الأخيرة</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
            <thead>
              <tr className="text-right text-sm text-stone-500">
                <th className="px-4">رقم الطلب</th>
                <th className="px-4">الاسم</th>
                <th className="px-4">الهاتف</th>
                <th className="px-4">الإجمالي</th>
                <th className="px-4">الحالة</th>
                <th className="px-4">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="rounded-2xl bg-pink-50/50 text-sm">
                  <td className="rounded-r-2xl px-4 py-4 font-medium text-pink-700">
                    <a href={`/admin/orders/${order.id}`} className="hover:underline">
                      {order.id.slice(0, 8)}
                    </a>
                  </td>
                  <td className="px-4 py-4">{order.customer_name}</td>
                  <td className="px-4 py-4">{order.customer_phone}</td>
                  <td className="px-4 py-4">{formatPrice(order.total_price)}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-white px-3 py-1 text-pink-700 shadow-sm">
                      {order.status}
                    </span>
                  </td>
                  <td className="rounded-l-2xl px-4 py-4">
                    {new Date(order.created_at).toLocaleDateString("ar-EG")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}