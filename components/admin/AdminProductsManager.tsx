"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface ProductItem {
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
  asin?: string;
  itemModelNumber?: string;
  manufacturer?: string;
  countryOfOrigin?: string;
  productDimensions?: string;
  itemWeight?: string;
  warrantyInfo?: string;
  features?: string;
  binding?: string;
  releaseDate?: string;
}

interface AdminProductsManagerProps {
  products: ProductItem[];
  categories: { id: string; name: string }[];
  sellers: { id: string; storeName: string }[];
  onAddProduct: (product: Omit<ProductItem, "id">) => Promise<void>;
  onUpdateProduct: (id: string, product: Partial<ProductItem>) => void;
  onDeleteProduct: (id: string) => void;
  onProductClick?: (id: string) => void;
}

export default function AdminProductsManager({
  products,
  categories,
  sellers,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onProductClick,
}: AdminProductsManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("49.99");
  const [oldCost, setOldCost] = useState("");
  const [stock, setStock] = useState("10");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  
  // New fields
  const [asin, setAsin] = useState("");
  const [itemModelNumber, setItemModelNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [productDimensions, setProductDimensions] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [warrantyInfo, setWarrantyInfo] = useState("");
  const [features, setFeatures] = useState("");
  const [binding, setBinding] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [sellerId, setSellerId] = useState(sellers[0]?.id || "");

  // Media state (lists of image URLs/paths and video URLs/paths)
  const [imageList, setImageList] = useState<string[]>([]);
  const [videoList, setVideoList] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setPrice("49.99");
    setOldCost("");
    setStock("10");
    setDescription("");
    setSku("");
    setCategoryId(categories[0]?.id || "");
    setSellerId(sellers[0]?.id || "");
    setImageList([]);
    setVideoList([]);
    setSubmitError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingId(p.id);
    setName(p.name);
    setSlug(p.slug);
    setPrice(p.price.toString());
    setOldCost(p.oldCost ? p.oldCost.toString() : "");
    setStock(p.stock.toString());
    setDescription(p.description);
    setSku(p.sku || "");
    setAsin(p.asin || "");
    setItemModelNumber(p.itemModelNumber || "");
    setManufacturer(p.manufacturer || "");
    setCountryOfOrigin(p.countryOfOrigin || "");
    setProductDimensions(p.productDimensions || "");
    setItemWeight(p.itemWeight || "");
    setWarrantyInfo(p.warrantyInfo || "");
    setFeatures(p.features || "");
    setBinding(p.binding || "");
    setReleaseDate(p.releaseDate || "");

    setCategoryId(p.categoryId || categories[0]?.id || "");
    setSellerId(p.sellerId || sellers[0]?.id || "");
    setImageList(p.images && p.images.length > 0 ? p.images : p.imageUrl ? [p.imageUrl] : []);
    setVideoList(p.videos || []);
    setSubmitError("");
    setIsModalOpen(true);
  };

  // Handle file uploads for images
  const handleImageFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls: string[] = [];
      Array.from(e.target.files).forEach((file) => {
        const objectUrl = URL.createObjectURL(file);
        newUrls.push(objectUrl);
      });
      setImageList((prev) => [...prev, ...newUrls]);
    }
  };

  // Handle file uploads for videos
  const handleVideoFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls: string[] = [];
      Array.from(e.target.files).forEach((file) => {
        const objectUrl = URL.createObjectURL(file);
        newUrls.push(objectUrl);
      });
      setVideoList((prev) => [...prev, ...newUrls]);
    }
  };

  const handleAddImageUrl = () => {
    if (urlInput.trim()) {
      setImageList((prev) => [...prev, urlInput.trim()]);
      setUrlInput("");
    }
  };

  const handleAddVideoUrl = () => {
    if (videoUrlInput.trim()) {
      setVideoList((prev) => [...prev, videoUrlInput.trim()]);
      setVideoUrlInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = (index: number) => {
    setVideoList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const finalImages = imageList;

    const productData = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      price: parseFloat(price) || 0,
      oldCost: oldCost ? parseFloat(oldCost) : null,
      stock: parseInt(stock, 10) || 0,
      description,
      sku: sku || `SKU-${Math.floor(Math.random() * 100000)}`,
      asin,
      itemModelNumber,
      manufacturer,
      countryOfOrigin,
      productDimensions,
      itemWeight,
      warrantyInfo,
      features,
      binding,
      releaseDate,
      categoryId: categoryId || categories[0]?.id || "00000000-0000-0000-0000-000000000001",
      sellerId: sellerId || sellers[0]?.id || "00000000-0000-0000-0000-000000000001",
      imageUrl: finalImages[0],
      images: finalImages,
      videos: videoList,
    };

    if (editingId) {
      onUpdateProduct(editingId, productData);
      setIsModalOpen(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddProduct(productData);
      setIsModalOpen(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to create product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[20px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-[22px] font-semibold text-[#333333]">Product Management (Files &amp; URLs Media Editor)</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search products or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-[12px] border border-[#DDD] bg-white text-[14px] text-[#333] outline-none w-full sm:w-[280px]"
          />
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2 rounded-[14px] bg-gradient-to-br from-[#FFDB5A] to-[#FF825A] text-white font-medium text-[14px] shadow hover:opacity-90 whitespace-nowrap"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E0E0E0] text-[13px] font-medium text-[#777777]">
              <th className="py-3 px-4">Media</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEFEF] text-[14px] text-[#333333]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#777]">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId)?.name || "General";
                const img = p.imageUrl || p.images?.[0] || (p.galleries && p.galleries[0]?.path) || (p.productGalleries && p.productGalleries[0]?.path) || "";
                const videoCount = p.videos?.length || 0;
                const imageCount = p.images?.length || 1;
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-[#F0F2F5]"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-[8px] bg-white border border-[#DDD] overflow-hidden flex items-center justify-center relative shrink-0">
                          {img ? (
                            <Image src={img} alt={p.name} width={40} height={40} className="object-contain" />
                          ) : (
                            <span className="text-[10px] text-[#999]">No img</span>
                          )}
                        </div>
                        <div className="flex flex-col text-[10px] text-[#555]">
                          <span>🖼️ {imageCount} imgs</span>
                          {videoCount > 0 && <span className="text-blue-600 font-medium">📹 {videoCount} vids</span>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium max-w-[220px] truncate">{p.name}</td>
                    <td className="py-3 px-4 font-mono text-[12px] text-[#666]">{p.sku || "N/A"}</td>
                    <td className="py-3 px-4 font-bold text-[#FF825A]">${p.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${p.stock > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#555]">{cat}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(p);
                        }}
                        className="px-3 py-1 bg-[#49516D] text-white rounded-[8px] text-[12px] hover:bg-[#394058]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProduct(p.id);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded-[8px] text-[12px] hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add / Edit Product with Interactive File & URL Media Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[750px] rounded-[20px] bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-[20px] font-bold text-[#333333] mb-4">
              {editingId ? "Edit Product & Media Files/URLs" : "Add New Product & Media Files/URLs"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none"
                  placeholder="e.g. Wireless Gaming Mouse"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none"
                    placeholder="wireless-gaming-mouse"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">SKU</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none"
                    placeholder="SKU-12345"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Old Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={oldCost}
                    onChange={(e) => setOldCost(e.target.value)}
                    className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Seller</label>
                  <select
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none bg-white"
                  >
                    {sellers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.storeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* IMAGES MANAGEMENT (Files & URLs with 'X' remove buttons) */}
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
                        className="flex-1 px-3 py-1.5 border rounded-[8px] text-[13px] outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-4 py-1.5 bg-[#49516D] text-white rounded-[8px] text-[13px] font-medium"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-[12px] font-medium text-[#555] mb-1">Upload Image File(s)</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageFilesUpload}
                      className="w-full text-[13px] text-[#555] file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:text-[13px] file:font-medium file:bg-[#FF825A] file:text-white hover:file:opacity-90 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Thumbnail Preview Grid with 'X' removal buttons */}
                {imageList.length > 0 && (
                  <div className="pt-2">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <label className="block text-[12px] font-medium text-[#555] mb-2">Current Images ({imageList.length}) - Click '×' to remove</label>
                    <div className="flex flex-wrap gap-3">
                      {imageList.map((imgUrl, index) => (
                        <div key={index} className="relative group w-16 h-16 rounded-[10px] border bg-white overflow-hidden shadow-sm flex items-center justify-center">
                          <Image src={imgUrl} alt={`gallery ${index}`} width={64} height={64} className="object-contain w-full h-full p-1" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
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

              {/* VIDEOS MANAGEMENT (Files & URLs with 'X' remove buttons) */}
              <div className="p-4 bg-[#F4F6F9] rounded-[14px] space-y-3 border border-[#E2E8F0]">
                <h4 className="text-[14px] font-semibold text-[#333]">📹 Product Videos</h4>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-[12px] font-medium text-[#555] mb-1">Add Video via URL</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={videoUrlInput}
                        onChange={(e) => setVideoUrlInput(e.target.value)}
                        placeholder="https://example.com/video.mp4"
                        className="flex-1 px-3 py-1.5 border rounded-[8px] text-[13px] outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddVideoUrl}
                        className="px-4 py-1.5 bg-[#49516D] text-white rounded-[8px] text-[13px] font-medium"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-[12px] font-medium text-[#555] mb-1">Upload Video File(s)</label>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={handleVideoFilesUpload}
                      className="w-full text-[13px] text-[#555] file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:text-[13px] file:font-medium file:bg-[#FF825A] file:text-white hover:file:opacity-90 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Video List Preview with 'X' removal buttons */}
                {videoList.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <label className="block text-[12px] font-medium text-[#555]">Attached Videos ({videoList.length})</label>
                    <div className="space-y-1.5">
                      {videoList.map((vid, index) => (
                        <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded-[8px] border text-[13px] shadow-sm">
                          <span className="truncate max-w-[500px] text-[#333] font-mono text-[12px]">📹 {vid}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveVideo(index)}
                            className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold hover:bg-red-600 hover:text-white transition"
                            title="Remove video"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">ASIN</label>
                  <input type="text" value={asin} onChange={(e) => setAsin(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Model Number</label>
                  <input type="text" value={itemModelNumber} onChange={(e) => setItemModelNumber(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Manufacturer</label>
                  <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
                 <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Country</label>
                  <input type="text" value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
                 <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Dimensions</label>
                  <input type="text" value={productDimensions} onChange={(e) => setProductDimensions(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Weight</label>
                  <input type="text" value={itemWeight} onChange={(e) => setItemWeight(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
                 <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Binding</label>
                  <input type="text" value={binding} onChange={(e) => setBinding(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
                 <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Release Date</label>
                  <input type="text" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
              </div>
              <div>
                  <label className="block text-[13px] font-medium text-[#555] mb-1">Warranty Info</label>
                  <input type="text" value={warrantyInfo} onChange={(e) => setWarrantyInfo(e.target.value)} className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none" />
                </div>
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none"
                  placeholder="Product detailed description..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                {submitError && <p role="alert" className="mr-auto self-center text-sm text-red-600">{submitError}</p>}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-[10px] bg-gray-200 text-[#333] text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-[10px] bg-gradient-to-br from-[#FFDB5A] to-[#FF825A] text-white font-medium text-[14px]"
                >
                  {isSubmitting ? "Creating..." : editingId ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
