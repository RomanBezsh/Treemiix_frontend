"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldCost?: number | null;
  stock: number;
  description: string;
  sku?: string;
  categoryId: string;
  sellerId: string;
  imageUrl?: string;
  images?: string[];
  videos?: string[];
}

export default function AdminProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/products/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Product not found." : "Unable to load product details.");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setError("");
      })
      .catch((requestError: unknown) => {
        setProduct(null);
        setError(requestError instanceof Error ? requestError.message : "Unable to load product details.");
      })
      .finally(() => setLoading(false));

    // Fetch videos for this product from the product videos endpoint
    fetch(`${API_BASE_URL}/productvideos/byproduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // data could be an array of video objects or just URLs
        if (Array.isArray(data)) {
          setVideos(data);
        }
      })
      .catch(() => setVideos([]));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[18px] text-[#555]">Loading product detail...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[18px] text-[#555]">{error || "Product not found."}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#EFEFEF] min-h-screen font-[var(--font-roboto)]">
      <div className="max-w-[1400px] mx-auto">
<h1 className="text-[28px] font-bold text-[#333333] mb-6">
              Product Detail: {product ? product.name : "Product Details"}
            </h1>

        {/* Product Image & Videos Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Main Image */}
          <div>
            <h2 className="text-[18px] font-medium text-[#555] mb-4">Product Image</h2>
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-[12px] object-cover mb-4"
              />
            )}
            {/* Image gallery thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`${product.name} gallery ${idx}`}
                    width={100}
                    height={100}
                    className="rounded-[8px] object-cover cursor-pointer transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Videos Carousel */}
          <div>
            <h2 className="text-[18px] font-medium text-[#555] mb-4">YouTube / Product Videos</h2>
            {product.slug && product.slug.length > 0 && (
              <div className="space-y-4">
                {videos.length === 0 && (
                  <p className="text-[14px] text-[#777]">
                    No videos found for this product. Add video URLs in the admin panel.
                  </p>
                )}
                {videos.map((videoItem, idx) => {
                  const video = typeof videoItem === 'string' ? videoItem : videoItem?.path || String(videoItem);
                  // If video is a YouTube URL, embed it; otherwise show as link
                  const youtubeId = video.includes("youtube.com") 
                    ? video.split("v=")[1]?.split("&")[0] 
                    : video.includes("youtu.be") 
                      ? video.split("youtu.be/")[1]?.split("?")[0] 
                      : null;
                  
                  return (
                    <div key={idx} className="bg-white rounded-[12px] p-4 shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
                      {/* YouTube Embed would go here if we had player component */}
                      {youtubeId && (
                        <div 
                          className="h-48 rounded-[8px] bg-[#000] flex items-center justify-center text-[14px] text-[#777]"
                          style={{ position: 'relative' }}
                        >
                          <img 
                            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                            alt="YouTube preview"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <span className="relative z-10">YouTube Video</span>
                        </div>
                      )}
                      {!youtubeId && (
                        <div className="h-48 bg-[#EFEFEF] rounded-[8px] flex items-center justify-center text-[12px] text-[#777]">
                          <span>{typeof video === 'string' ? (video.substring(0, 50) + (video.length > 50 ? "..." : "")) : "Video"}</span>
                        </div>
                      )}
                      <p className="text-[11px] text-[#555] mt-2">{typeof video === 'string' ? video : JSON.stringify(video)}</p>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="pt-6 bg-white rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="text-[20px] font-semibold text-[#333333] mb-4">Product Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[14px] text-[#555] mb-2">SKU</p>
              <p className="font-medium text-[#555]">{product.sku || "N/A"}</p>
            </div>
            <div>
              <p className="text-[14px] text-[#555] mb-2">Price</p>
              <p className="font-bold text-[#FF825A]">${Number(product.price ?? 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[14px] text-[#555] mb-2">Old Cost</p>
              <p className="text-[#666]">${Number(product.oldCost ?? 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[14px] text-[#555] mb-2">Stock</p>
              <p className={`font-medium ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                {product.stock} in stock
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#555] mb-2">Category</p>
              <p className="text-[#555]">{product.categoryId || "General"}</p>
            </div>
            <div>
              <p className="text-[14px] text-[#555] mb-2">Seller</p>
              <p className="text-[#555]">{product.sellerId || "N/A"}</p>
            </div>
          </div>

          <p className="mt-6 text-[14px] text-[#555] leading-relaxed">
            {product.description ? (
              product.description
            ) : "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}
