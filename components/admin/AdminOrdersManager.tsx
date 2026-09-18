"use client";

import React, { useState } from "react";

export interface OrderItem {
  id: string;
  receiverName: string;
  receiverPhone: string;
  shippingAddress: string;
  status: string;
  totalAmount?: number;
  createdAt?: string;
}

interface AdminOrdersManagerProps {
  orders: OrderItem[];
  onUpdateStatus: (id: string, newStatus: string) => void;
}

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersManager({
  orders,
  onUpdateStatus,
}: AdminOrdersManagerProps) {
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      o.receiverName.toLowerCase().includes(search.toLowerCase()) ||
      o.receiverPhone.includes(search) ||
      o.shippingAddress.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-[20px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-[22px] font-semibold text-[#333333]">Order Management</h2>
        <input
          type="search"
          placeholder="Search by recipient or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-[12px] border border-[#DDD] bg-white text-[14px] text-[#333] outline-none w-full sm:w-[280px]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E0E0E0] text-[13px] font-medium text-[#777777]">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Recipient</th>
              <th className="py-3 px-4">Phone & Address</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEFEF] text-[14px] text-[#333333]">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#777]">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-[#F0F2F5]">
                  <td className="py-3 px-4 font-mono text-[12px] text-[#555]">
                    {o.id.substring(0, 8)}...
                  </td>
                  <td className="py-3 px-4 font-medium">{o.receiverName}</td>
                  <td className="py-3 px-4 text-[#555]">
                    <div>{o.receiverPhone}</div>
                    <div className="text-[12px] text-[#888] truncate max-w-[200px]">{o.shippingAddress}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-blue-100 text-blue-800">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => onUpdateStatus(o.id, e.target.value)}
                      className="px-3 py-1.5 rounded-[8px] border bg-white text-[13px] outline-none font-medium text-[#333]"
                    >
                      {ORDER_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
