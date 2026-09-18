"use client";

import { Package, Users, ShoppingBag, Tag, DollarSign } from "lucide-react";

interface AdminDashboardStatsProps {
  productsCount: number;
  usersCount: number;
  ordersCount: number;
  categoriesCount: number;
  totalRevenue: number;
}

export default function AdminDashboardStats({
  productsCount,
  usersCount,
  ordersCount,
  categoriesCount,
  totalRevenue,
}: AdminDashboardStatsProps) {
  const stats = [
    { title: "Total Products", value: productsCount, icon: <Package size={24} className="text-[#49516D]" /> },
    { title: "Total Users", value: usersCount, icon: <Users size={24} className="text-[#FF825A]" /> },
    { title: "Total Orders", value: ordersCount, icon: <ShoppingBag size={24} className="text-[#333333]" /> },
    { title: "Categories", value: categoriesCount, icon: <Tag size={24} className="text-[#555555]" /> },
    { title: "Estimated Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} className="text-[#FFDB5A]" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-[20px] bg-white p-6 shadow-sm border border-[#EFEFEF] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-medium text-[#777777]">{stat.title}</span>
            {stat.icon}
          </div>
          <div className="text-[28px] font-bold text-[#333333] tracking-tight">
            {stat.value}
          </div>
          <div className="mt-2 text-[12px] text-emerald-600 font-medium flex items-center gap-1">
            <span>● Live</span>
          </div>
        </div>
      ))}
    </div>
  );
}
