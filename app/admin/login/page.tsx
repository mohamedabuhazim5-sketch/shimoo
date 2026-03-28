import { Heart, Lock, Mail } from "lucide-react";
import { signInAdmin } from "@/app/actions/auth";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
      <div className="w-full rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
            <Heart className="h-8 w-8 fill-pink-200 text-pink-600" />
          </div>
          <h1 className="text-3xl font-black text-pink-700">دخول الإدارة</h1>
          <p className="mt-2 text-sm text-stone-500">
            لوحة إدارة متجر shemoo
          </p>
        </div>

        <form action={signInAdmin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
            <input
              name="email"
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full rounded-2xl border border-pink-200 px-12 py-3 outline-none focus:border-pink-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
            <input
              name="password"
              type="password"
              placeholder="كلمة المرور"
              className="w-full rounded-2xl border border-pink-200 px-12 py-3 outline-none focus:border-pink-400"
            />
          </div>

          <button className="w-full rounded-2xl bg-pink-600 px-5 py-3 text-sm font-medium text-white hover:bg-pink-700">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}