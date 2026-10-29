import { DollarSign, Eye, Package, Star, TrendingDown, TrendingUp } from "lucide-react";
import type { SellerStat } from "@/data/sellerDashboardData";

const icons: Record<string, typeof DollarSign> = {
  sales: DollarSign,
  orders: Package,
  views: Eye,
  rating: Star,
};

interface SellerStatsCardsProps {
  stats: SellerStat[];
}

export default function SellerStatsCards({ stats }: SellerStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-[16px] min-[480px]:grid-cols-2 xl:grid-cols-4 xl:gap-[20px]">
      {stats.map((stat, index) => {
        const Icon = icons[stat.key] ?? DollarSign;
        const isPositive = stat.change >= 0;

        return (
          <div
            key={stat.key}
            className={`tm-fade-up ${index > 0 ? `tm-delay-${Math.min(index, 4)}` : ""}`}
          >
            <div className="flex h-full flex-col gap-[14px] rounded-[20px] bg-[#F8F8F8] p-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:-translate-y-[4px]">
              <div className="flex items-center justify-between gap-[10px]">
                <p className="text-[14px] font-medium leading-[130%] text-[#555555] lg:text-[15px]">
                  {stat.title}
                </p>
                <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#6A7DBE_0%,#87618D_100%)] text-white">
                  <Icon size={18} aria-hidden="true" />
                </span>
              </div>

              <p className="text-[28px] font-black leading-[120%] text-[#333333] lg:text-[32px]">
                {stat.value}
              </p>

              <p className="flex items-center gap-[6px] text-[13px] leading-[130%] text-[#777777]">
                <span
                  className={`flex items-center gap-[2px] font-medium ${
                    isPositive ? "text-emerald-600" : "text-[#FF825A]"
                  }`}
                >
                  {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                {stat.hint}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
