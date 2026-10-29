import type { SellerSalesPoint } from "@/data/sellerDashboardData";

interface SellerSalesChartProps {
  data: SellerSalesPoint[];
}

const formatMoney = (value: number) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default function SellerSalesChart({ data }: SellerSalesChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1);
  const total = data.reduce((sum, point) => sum + point.value, 0);

  return (
    <div className="flex h-full flex-col rounded-[20px] bg-[#F8F8F8] p-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] lg:p-[28px]">
      <div className="flex flex-wrap items-end justify-between gap-[10px]">
        <div>
          <h2 className="text-[20px] font-medium leading-[130%] text-[#333333] lg:text-[22px]">
            Sales this week
          </h2>
          <p className="mt-[4px] text-[13px] text-[#777777]">Ordered product sales, last 7 days</p>
        </div>
        <p className="bg-[linear-gradient(90deg,#6A7DBE_0%,#87618D_100%)] bg-clip-text text-[26px] font-black leading-[120%] text-transparent lg:text-[30px]">
          {formatMoney(total)}
        </p>
      </div>

      {/* Bars */}
      <div className="mt-[24px] flex h-[220px] flex-1 items-end gap-[8px] sm:gap-[14px]">
        {data.map((point) => (
          <div key={point.label} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-[8px]">
            <span className="text-[11px] font-medium text-[#555555] opacity-0 transition-opacity group-hover:opacity-100 sm:text-[12px]">
              {formatMoney(point.value)}
            </span>
            <div
              className="w-full max-w-[56px] rounded-t-[10px] bg-[linear-gradient(180deg,#FFDB5A_0%,#FF825A_100%)] transition-all duration-300 ease-out group-hover:opacity-85 group-hover:shadow-[0_6px_14px_rgba(255,130,90,0.28)]"
              style={{ height: `${Math.max((point.value / max) * 100, 4)}%` }}
              aria-label={`${point.label}: ${formatMoney(point.value)}`}
            />
            <span className="text-[12px] text-[#777777] sm:text-[13px]">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
