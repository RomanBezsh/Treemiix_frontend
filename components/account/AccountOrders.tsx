"use client";

import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function AccountOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/orders`, {
          headers: token ? { "Authorization": `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setOrders(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch orders from backend", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Your Orders (Live Backend)
      </h1>

      {/* Orders panel */}
      <div className="min-h-[150px] rounded-[20px] bg-[#F8F8F8] px-[36px] py-[28px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        {loading ? (
          <p className="text-[14px] text-[#555]">Loading orders from backend...</p>
        ) : orders.length === 0 ? (
          <p className="text-[14px] font-normal leading-[150%] text-[#555555]">
            0 orders placed in recent history. (Connected to Treemiix Backend API)
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div key={order.id || idx} className="p-4 bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm flex justify-between items-center">
                <div>
                  <div className="font-semibold text-[15px] text-[#333]">Order #{order.id?.substring(0, 8)}</div>
                  <div className="text-[13px] text-[#666]">Recipient: {order.receiverName} | Phone: {order.receiverPhone}</div>
                  <div className="text-[12px] text-[#888]">Address: {order.shippingAddress}</div>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-blue-100 text-blue-800">
                    {order.status || "Processing"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
