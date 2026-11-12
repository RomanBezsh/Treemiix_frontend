"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import {
  importMediaUrl,
  MAX_IMAGE_BYTES,
  MAX_IMAGE_KB,
  uploadMediaFile,
} from "@/lib/media";

interface ProductMediaFieldsProps {
  /** Image URLs; the first one is the main image. */
  images: string[];
  onChange: (images: string[]) => void;
}

/** Product photo editor: upload files, add by URL, remove. The first image is "Main". */
export default function ProductMediaFields({ images, onChange }: ProductMediaFieldsProps) {
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const files = input.files ? Array.from(input.files) : [];
    if (files.length === 0) return;

    const oversized = files.filter((f) => f.size > MAX_IMAGE_BYTES);
    if (oversized.length > 0) {
      alert(
        `Каждое изображение не должно превышать ${MAX_IMAGE_KB} КБ. ` +
          `Слишком большие файлы: ${oversized.map((f) => f.name).join(", ")}. ` +
          `Рекомендуемый размер: 600×600 пикселей, JPEG, до 500 КБ.`,
      );
      input.value = "";
      return;
    }

    setUploading(true);
    const uploaded: string[] = [];
    for (const file of files) {
      try {
        uploaded.push(await uploadMediaFile(file));
      } catch (error) {
        console.error("Upload failed:", error);
        alert(`Failed to upload ${file.name}: ${error instanceof Error ? error.message : "Network error"}`);
      }
    }
    setUploading(false);
    if (uploaded.length > 0) onChange([...images, ...uploaded]);
    input.value = "";
  };

  const handleAddUrl = async () => {
    const url = urlInput.trim();
    if (!url) return;
    setUrlInput("");

    // Same as before: if the backend cannot copy the file, keep the original URL.
    let saved = url;
    try {
      saved = await importMediaUrl(url);
    } catch (error) {
      console.error("Import failed:", error);
      alert(`Failed to import URL: ${error instanceof Error ? error.message : "Network error"}`);
    }
    onChange([...images, saved]);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-[#F4F6F9] rounded-[14px] space-y-3 border border-[#E2E8F0]">
      <h4 className="text-[14px] font-semibold text-[#333]">🖼️ Product Images &amp; Galleries</h4>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-[12px] font-medium text-[#555] mb-1">Add Image via URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 min-w-0 px-3 py-1.5 border rounded-[8px] text-[13px] outline-none bg-white"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-1.5 bg-[#49516D] text-white rounded-[8px] text-[13px] font-medium"
            >
              Add URL
            </button>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-[12px] font-medium text-[#555] mb-1">Upload Image File(s)</label>
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFiles}
              disabled={uploading}
              className="sr-only"
            />
            <div className="w-full px-4 py-2.5 border-2 border-dashed border-[#DDD] rounded-[10px] text-center text-[13px] text-[#555] hover:border-[#FF825A] hover:bg-[#FFF8F0] transition-colors cursor-pointer">
              {uploading ? (
                "Uploading…"
              ) : (
                <>
                  <span className="font-medium text-[#FF825A]">Choose images</span> or drag & drop
                </>
              )}
            </div>
            <p className="text-[11px] text-[#888] mt-1 text-center">
              Max {MAX_IMAGE_KB} KB per file. Recommended: 600×600 px, JPEG.
            </p>
          </label>
        </div>
      </div>

      {images.length > 0 && (
        <div className="pt-2">
          <p className="block text-[12px] font-medium text-[#555] mb-2">
            Current Images ({images.length}) - Click &apos;×&apos; to remove
          </p>
          <div className="flex flex-wrap gap-3">
            {images.map((imgUrl, index) => (
              <div
                key={`${imgUrl}-${index}`}
                className="relative group w-16 h-16 rounded-[10px] border bg-white overflow-hidden shadow-sm flex items-center justify-center"
              >
                <Image src={imgUrl} alt={`gallery ${index}`} width={64} height={64} className="object-contain w-full h-full p-1" />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[11px] font-bold shadow opacity-80 group-hover:opacity-100 hover:scale-110 transition"
                  title="Remove image"
                >
                  ×
                </button>
                {index === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] text-center font-medium py-0.5">
                    Main
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
