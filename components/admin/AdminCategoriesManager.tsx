"use client";

import React, { useState } from "react";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}

interface AdminCategoriesManagerProps {
  categories: CategoryItem[];
  onAddCategory: (category: { name: string; slug: string; sortOrder: number; isActive: boolean }) => void;
  onDeleteCategory: (id: string) => void;
}

export default function AdminCategoriesManager({
  categories,
  onAddCategory,
  onDeleteCategory,
}: AdminCategoriesManagerProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddCategory({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      sortOrder: parseInt(sortOrder, 10) || 0,
      isActive,
    });
    setName("");
    setSlug("");
    setSortOrder("0");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Add Category Form */}
      <div className="rounded-[20px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h3 className="text-[18px] font-semibold text-[#333333] mb-4">Add Category</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#555] mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none bg-white"
              placeholder="e.g. Electronics"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#555] mb-1">Slug</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none bg-white"
              placeholder="electronics"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#555] mb-1">Sort Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 border rounded-[10px] text-[14px] outline-none bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="catActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF825A]"
            />
            <label htmlFor="catActive" className="text-[13px] font-medium text-[#555]">Active</label>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-[12px] bg-gradient-to-br from-[#FFDB5A] to-[#FF825A] text-white font-medium text-[14px] shadow"
          >
            Create Category
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="lg:col-span-2 rounded-[20px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h3 className="text-[18px] font-semibold text-[#333333] mb-4">Existing Categories</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E0E0] text-[13px] font-medium text-[#777777]">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEFEF] text-[14px] text-[#333333]">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#777]">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F0F2F5]">
                    <td className="py-3 px-4 font-medium">{c.name}</td>
                    <td className="py-3 px-4 text-[#666] font-mono text-[12px]">{c.slug}</td>
                    <td className="py-3 px-4">{c.sortOrder}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[12px] font-medium ${c.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}>
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onDeleteCategory(c.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-[8px] text-[12px] hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
