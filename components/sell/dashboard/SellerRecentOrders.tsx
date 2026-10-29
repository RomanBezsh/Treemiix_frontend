import type { SellerOrder, SellerOrderStatus } from "@/data/sellerDashboardData";

const statusStyles: Record<SellerOrderStatus, string> = {
  Pending: "bg-[#FFF4E5] text-[#E0701F]",
  Processing: "bg-[#EEF2FA] text-[#6A7DBE]",
  Shipped: "bg-[#F3ECF6] text-[#87618D]",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-[#EEEEEE] text-[#777777]",
};

interface SellerRecentOrdersProps {
  orders: SellerOrder[];
}

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

function StatusBadge({ status }: { status: SellerOrderStatus }) {
  return (
    <span className={`inline-flex h-[26px] items-center rounded-full px-[10px] text-[12px] font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

export default function SellerRecentOrders({ orders }: SellerRecentOrdersProps) {
  return (
    <div className="rounded-[20px] bg-[#F8F8F8] p-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] lg:p-[28px]">
      <h2 className="text-[20px] font-medium leading-[130%] text-[#333333] lg:text-[22px]">
        Recent orders
      </h2>

      {/* Mobile cards */}
      <ul className="mt-[18px] flex flex-col gap-[12px] md:hidden">
        {orders.map((order) => (
          <li key={order.id} className="rounded-[14px] bg-white p-[14px]">
            <div className="flex items-center justify-between gap-[10px]">
              <span className="text-[14px] font-medium text-[#333333]">{order.number}</span>
              <StatusBadge status={order.status} />
            </div>
            <p className="mt-[8px] text-[14px] text-[#333333]">
              {order.product} × {order.quantity}
            </p>
            <div className="mt-[6px] flex items-center justify-between text-[13px] text-[#777777]">
              <span>
                {order.customer} · {order.date}
              </span>
              <span className="font-medium text-[#333333]">{formatMoney(order.total)}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop table */}
      <div className="mt-[18px] hidden overflow-hidden rounded-[14px] bg-white md:block">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-[#EEEEEE] text-[13px] text-[#777777]">
            <tr>
              <th className="px-[16px] py-[12px] font-medium">Order</th>
              <th className="px-[16px] py-[12px] font-medium">Date</th>
              <th className="px-[16px] py-[12px] font-medium">Customer</th>
              <th className="px-[16px] py-[12px] font-medium">Product</th>
              <th className="px-[16px] py-[12px] text-right font-medium">Total</th>
              <th className="px-[16px] py-[12px] font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-[#F3F3F3] text-[#333333] transition-colors last:border-0 hover:bg-[#FAFAFA]">
                <td className="px-[16px] py-[12px] font-medium">{order.number}</td>
                <td className="px-[16px] py-[12px] text-[#777777]">{order.date}</td>
                <td className="px-[16px] py-[12px]">{order.customer}</td>
                <td className="px-[16px] py-[12px]">
                  {order.product} <span className="text-[#777777]">× {order.quantity}</span>
                </td>
                <td className="px-[16px] py-[12px] text-right font-medium">{formatMoney(order.total)}</td>
                <td className="px-[16px] py-[12px]">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
