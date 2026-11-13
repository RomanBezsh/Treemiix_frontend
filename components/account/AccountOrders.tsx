"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadError from "@/components/common/LoadError";
import { readApiError } from "@/lib/apiError";
import { formatMoney, orderStatusLabel } from "@/lib/checkout";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

interface OrderItemDto {
  id: string;
  productId?: string | null;
  productName: string;
  productPrice: number;
  productAvatarUrl?: string;
  quantity: number;
  totalPrice: number;
}

interface OrderDto {
  id: string;
  status: number | string;
  totalAmount: number;
  discountAmount: number;
  shippingAddress: string;
  receiverName: string;
  receiverPhone: string;
  createdAt: string;
  items: OrderItemDto[];
}

/** The signed-in buyer's orders (GET /orders), newest first. */
export default function AccountOrders() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "signin">("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("signin");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401) {
          if (!cancelled) setStatus("signin");
          return;
        }
        if (!res.ok) throw new Error(await readApiError(res));
        const data = await res.json();
        if (cancelled) return;
        setOrders(Array.isArray(data) ? data : []);
        setStatus("ready");
      } catch (error) {
        console.warn("Failed to load orders", error);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return (
    <section className="w-full">
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">Your Orders</h1>

      {status === "loading" && (
        <div className="flex min-h-[150px] items-center justify-center rounded-[16px] bg-[#F8F8F8] text-[15px] text-[#555555]">
          Loading your orders...
        </div>
      )}

      {status === "error" && (
        <LoadError
          what="your orders"
          onRetry={() => {
            setStatus("loading");
            setReloadKey((key) => key + 1);
          }}
        />
      )}

      {status === "signin" && (
        <div className="rounded-[16px] bg-[#F8F8F8] px-[20px] py-[36px] text-center">
          <p className="text-[18px] font-medium text-[#333333]">Sign in to see your orders</p>
          <Link href="/auth" className="mt-[12px] inline-block text-[15px] font-medium text-[#496B94] hover:underline">Sign in</Link>
        </div>
      )}

      {status === "ready" && orders.length === 0 && (
        <div className="rounded-[16px] bg-[#F8F8F8] px-[20px] py-[36px] text-center">
          <p className="text-[18px] font-medium text-[#333333]">You have no orders yet</p>
          <Link href="/catalog" className="mt-[12px] inline-block text-[15px] font-medium text-[#496B94] hover:underline">Browse products</Link>
        </div>
      )}

      {status === "ready" && orders.length > 0 && (
        <ul className="flex flex-col gap-[14px]">
          {orders.map((order) => (
            <li key={order.id} className="rounded-[16px] bg-[#F8F8F8] p-[16px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[20px]">
              <div className="flex flex-wrap items-start justify-between gap-[8px]">
                <div>
                  <p className="text-[16px] font-medium text-[#333333]">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-[13px] text-[#828282]">
                    Placed {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="rounded-full bg-blue-100 px-[10px] py-[3px] text-[12px] font-medium text-blue-800">
                    {orderStatusLabel(order.status)}
                  </span>
                  <span className="text-[17px] font-medium text-[#333333]">{formatMoney(order.totalAmount - order.discountAmount)}</span>
                </div>
              </div>

              <ul className="mt-[12px] flex flex-col gap-[6px]">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-[10px] text-[14px] text-[#333333]">
                    <span className="min-w-0">
                      {item.productId ? (
                        <Link href={`/product/${item.productId}`} className="hover:text-[#496B94]">{item.productName}</Link>
                      ) : (
                        item.productName
                      )}
                      <span className="text-[#828282]"> × {item.quantity}</span>
                    </span>
                    <span className="shrink-0">{formatMoney(item.totalPrice)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-[10px] text-[13px] text-[#828282]">
                {order.receiverName} · {order.receiverPhone} · {order.shippingAddress}
                {order.discountAmount > 0 && <> · discount {formatMoney(order.discountAmount)}</>}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
