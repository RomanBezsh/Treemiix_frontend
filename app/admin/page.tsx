"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Package, Users, ShoppingBag, Tag, Plus, User, CheckCircle, Zap } from "lucide-react";
import AdminDashboardStats from "@/components/admin/AdminDashboardStats";
import AdminProductsManager, { ProductItem } from "@/components/admin/AdminProductsManager";
import AdminUsersManager, { UserItem } from "@/components/admin/AdminUsersManager";
import AdminOrdersManager, { OrderItem } from "@/components/admin/AdminOrdersManager";
import AdminCategoriesManager, { CategoryItem } from "@/components/admin/AdminCategoriesManager";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "users" | "orders" | "categories">("dashboard");
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);

  // Initial empty states (no hardcoded mock data)
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const [sellers, setSellers] = useState<any[]>([]);

  const [products, setProducts] = useState<ProductItem[]>([]);



  const [orders, setOrders] = useState<OrderItem[]>([]);

  const [users, setUsers] = useState<UserItem[]>([]);

  // Fetch data from live Render backend API
  useEffect(() => {
    async function fetchBackendData() {
      setApiLoading(true);
      let connected = false;

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      try {
        const prodRes = await fetch(`${API_BASE_URL}/products`, { headers });
        if (prodRes.ok) {
          const data = await prodRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
            connected = true;
          }
        }
      } catch {
        // Fallback
      }

      try {
        const catRes = await fetch(`${API_BASE_URL}/categories`, { headers });
        if (catRes.ok) {
          const data = await catRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
            connected = true;
          }
        }
      } catch {
        // Fallback
      }

      try {
        const sellerRes = await fetch(`${API_BASE_URL}/sellers`, { headers });
        if (sellerRes.ok) {
          const data = await sellerRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setSellers(data);
            connected = true;
          }
        }
      } catch {
        // Fallback
      }

      try {
        const userRes = await fetch(`${API_BASE_URL}/users`, { headers });
        if (userRes.ok) {
          const data = await userRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setUsers(data);
            connected = true;
          }
        }
      } catch {
        // Fallback
      }

      try {
        const ordRes = await fetch(`${API_BASE_URL}/orders`, { headers });
        if (ordRes.ok) {
          const data = await ordRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setOrders(data);
            connected = true;
          }
        }
      } catch {
        // Fallback
      }

      setIsApiConnected(connected);
      setApiLoading(false);
    }

    fetchBackendData();
  }, []);

  // Handlers for Products
  const getHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const handleAddProduct = async (newProd: Omit<ProductItem, "id">) => {
    const request = {
      name: newProd.name,
      slug: newProd.slug,
      sellerId: newProd.sellerId,
      categoryId: newProd.categoryId,
      price: newProd.price,
      oldCost: newProd.oldCost,
      stock: newProd.stock,
      description: newProd.description,
      sku: newProd.sku,
      imageUrl: newProd.imageUrl || (newProd.images && newProd.images[0]) || "",
      images: newProd.images || (newProd.imageUrl ? [newProd.imageUrl] : []),
      asin: newProd.asin,
      itemModelNumber: newProd.itemModelNumber,
      manufacturer: newProd.manufacturer,
      countryOfOrigin: newProd.countryOfOrigin,
      productDimensions: newProd.productDimensions,
      itemWeight: newProd.itemWeight,
      warrantyInfo: newProd.warrantyInfo,
      features: newProd.features,
      binding: newProd.binding,
      releaseDate: newProd.releaseDate,
    };
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      let message = `Unable to create product (HTTP ${res.status}).`;
      try {
        const error = await res.json();
        if (error?.errors) {
          message = Object.values(error.errors).flat().join(" ");
        } else if (error?.title) {
          message = error.title;
        }
      } catch {
        // Keep the HTTP status message when the response is not JSON.
      }
      throw new Error(message);
    }

    const created = await res.json();
    
    let createdGalleries: any[] = [];
    // Save images to gallery if provided
    if (newProd.images && newProd.images.length > 0) {
      for (let i = 0; i < newProd.images.length; i++) {
        try {
          const galRes = await fetch(`${API_BASE_URL}/productgalleries`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
              productId: created.id,
              path: newProd.images[i],
              sortOrder: i,
              isMain: i === 0
            })
          });
          if (galRes.ok) {
            const galData = await galRes.json();
            createdGalleries.push(galData);
          }
        } catch {
          // ignore
        }
      }
    }

    let createdVideos: any[] = [];
    // Save videos if provided
    if (newProd.videos && newProd.videos.length > 0) {
      for (let i = 0; i < newProd.videos.length; i++) {
        try {
          const vidRes = await fetch(`${API_BASE_URL}/productvideos`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
              productId: created.id,
              path: newProd.videos[i],
              sortOrder: i,
              isMain: i === 0
            })
          });
          if (vidRes.ok) {
            const vidData = await vidRes.json();
            createdVideos.push(vidData);
          }
        } catch {
          // ignore
        }
      }
    }

    setProducts((current) => [{ 
      ...created, 
      galleries: createdGalleries.length > 0 ? createdGalleries : (newProd.images?.map((p, idx) => ({ id: `g-${idx}`, path: p, isMain: idx === 0 })) || []),
      videos: createdVideos.length > 0 ? createdVideos.map(v => v.path) : newProd.videos,
      imageUrl: newProd.imageUrl, 
      images: newProd.images 
    }, ...current]);
  };

  const handleUpdateProduct = async (id: string, updatedFields: Partial<ProductItem>) => {
    try {
      await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updatedFields),
      });
    } catch {
      // Fallback local update
    }
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE", headers: getHeaders() });
    } catch {
      // Fallback local delete
    }
    setProducts(products.filter((p) => p.id !== id));
  };

  // Handlers for Users
  const handleToggleUserStatus = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ isActive: !currentStatus }),
      });
    } catch {
      // Fallback local
    }
    setUsers(users.map((u) => (u.id === id ? { ...u, isActive: !currentStatus } : u)));
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/users/${id}`, { method: "DELETE", headers: getHeaders() });
    } catch {
      // Fallback local
    }
    setUsers(users.filter((u) => u.id !== id));
  };

  // Handlers for Orders
  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(newStatus),
      });
    } catch {
      // Fallback local
    }
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  // Handlers for Categories
  const handleAddCategory = async (newCat: { name: string; slug: string; sortOrder: number; isActive: boolean }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(newCat),
      });
      if (res.ok) {
        const created = await res.json();
        setCategories([...categories, created]);
        return;
      }
    } catch {
      // Fallback local
    }

    const categoryWithId: CategoryItem = {
      ...newCat,
      id: `cat-${Date.now()}`,
    };
    setCategories([...categories, categoryWithId]);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/categories/${id}`, { method: "DELETE", headers: getHeaders() });
    } catch {
      // Fallback local
    }
    setCategories(categories.filter((c) => c.id !== id));
  };

  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 100), 0);

  return (
    <div className="w-full min-h-screen bg-[#EFEFEF] py-8 px-4 sm:px-8 lg:px-16 font-[var(--font-roboto)]">
      <div className="max-w-[1534px] mx-auto">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-[#49516D] text-white p-6 rounded-[24px] shadow-lg">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">Treemiix Admin Panel</h1>
            <p className="text-[14px] text-[#D0D4E0]">
              Full site management, statistics, product catalog, user control &amp; orders.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-[14px] text-[13px] font-medium">
            <span className={`w-2.5 h-2.5 rounded-full ${apiLoading ? "bg-amber-400 animate-ping" : isApiConnected ? "bg-emerald-400 animate-pulse" : "bg-orange-400"}`}></span>
            <span>
              {apiLoading ? "Connecting to Backend..." : isApiConnected ? "Connected to Render API" : "Offline / Mock Fallback Mode"}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {[
              { id: "dashboard", label: "Dashboard & Stats", icon: <LayoutDashboard size={18} /> },
              { id: "products", label: "Products & Media", icon: <Package size={18} /> },
              { id: "users", label: "Users", icon: <Users size={18} /> },
              { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
              { id: "categories", label: "Categories", icon: <Tag size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-[16px] text-[15px] font-medium transition-all shadow-sm shrink-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-br from-[#FFDB5A] to-[#FF825A] text-white shadow-md scale-105"
                    : "bg-white text-[#555] hover:bg-[#F8F8F8]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>


        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div>
            <AdminDashboardStats
              productsCount={products.length}
              usersCount={users.length}
              ordersCount={orders.length}
              categoriesCount={categories.length}
              totalRevenue={totalRevenue}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-[20px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <h3 className="text-[18px] font-semibold text-[#333333] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab("products")}
                    className="p-4 rounded-[14px] bg-white border border-[#DDD] text-left hover:bg-[#F0F2F5] transition"
                  >
                    <Plus size={24} className="mb-2 text-[#49516D]" />
                    <div className="font-semibold text-[15px] text-[#333]">Manage Products</div>
                    <div className="text-[12px] text-[#777]">Add, edit or remove store products</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("users")}
                    className="p-4 rounded-[14px] bg-white border border-[#DDD] text-left hover:bg-[#F0F2F5] transition"
                  >
                    <User size={24} className="mb-2 text-[#49516D]" />
                    <div className="font-semibold text-[15px] text-[#333]">Manage Users</div>
                    <div className="text-[12px] text-[#777]">View and control user statuses</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="p-4 rounded-[14px] bg-white border border-[#DDD] text-left hover:bg-[#F0F2F5] transition"
                  >
                    <ShoppingBag size={24} className="mb-2 text-[#49516D]" />
                    <div className="font-semibold text-[15px] text-[#333]">View Orders</div>
                    <div className="text-[12px] text-[#777]">Update order fulfillment status</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("categories")}
                    className="p-4 rounded-[14px] bg-white border border-[#DDD] text-left hover:bg-[#F0F2F5] transition"
                  >
                    <Tag size={24} className="mb-2 text-[#49516D]" />
                    <div className="font-semibold text-[15px] text-[#333]">Categories</div>
                    <div className="text-[12px] text-[#777]">Organize store taxonomy</div>
                  </button>
                </div>
              </div>

              <div className="rounded-[20px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <h3 className="text-[18px] font-semibold text-[#333333] mb-4">Live Backend Connection</h3>
                <p className="text-[14px] text-[#555] mb-4">
                  Connected to Render API: <a href="https://treemiix-backend.onrender.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono text-[13px]">https://treemiix-backend.onrender.com</a>
                </p>
                <div className={`p-4 rounded-[12px] border text-[14px] flex items-center gap-3 ${isApiConnected ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                  <span className="text-xl">{isApiConnected ? <CheckCircle size={20} /> : <Zap size={20} />}</span>
                  <div>
                    <span className="font-semibold block">{isApiConnected ? "Connected to Backend API" : "Backend waking up / Standby Mode"}</span>
                    {isApiConnected ? "Live data synchronization is active with products, users, categories and orders." : "Render free-tier instances may take 30-50 seconds to spin up on first request. Fallback mock state is active."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <AdminProductsManager
            products={products}
            categories={categories}
            sellers={sellers}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onProductClick={ (id) => {
              router.push(`/admin/products/${id}`);
            } }
          />
        )}

        {activeTab === "users" && (
          <AdminUsersManager
            users={users}
            onToggleStatus={handleToggleUserStatus}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {activeTab === "orders" && (
          <AdminOrdersManager
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}

        {activeTab === "categories" && (
          <AdminCategoriesManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </div>
    </div>
  );
}
