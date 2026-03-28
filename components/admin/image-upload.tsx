"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function ImageUpload({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  async function handleUpload(file: File) {
    try {
      setUploading(true);

      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) {
        console.error(uploadError);
        return;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      const url = data.publicUrl;
      setPreview(url);
      onUploaded(url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-pink-300 bg-pink-50 px-6 py-10 text-center hover:bg-pink-100">
        <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
          <Upload className="h-5 w-5 text-pink-600" />
        </div>
        <div className="text-sm font-medium text-pink-700">
          {uploading ? "جاري رفع الصورة..." : "ارفعي صورة المنتج"}
        </div>
        <div className="mt-1 text-xs text-stone-500">
          اضغطي لاختيار صورة من الجهاز
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      </label>

      {preview && (
        <div className="overflow-hidden rounded-[1.5rem] border border-pink-100 bg-white p-3">
          <div className="mb-2 flex items-center gap-2 text-sm text-pink-700">
            <ImageIcon className="h-4 w-4" />
            معاينة الصورة
          </div>
          <img
            src={preview}
            alt="preview"
            className="h-48 w-full rounded-2xl object-cover"
          />
        </div>
      )}
    </div>
  );
}