import Link from "next/link";
import { Plus, Store } from "lucide-react";

interface SellerDashboardTopBarProps {
  storeName: string;
  onAddProduct: () => void;
}

const navItems = [
  { title: "Overview", href: "#overview" },
  { title: "Orders", href: "#orders" },
  { title: "Products", href: "#products" },
];

export default function SellerDashboardTopBar({ storeName, onAddProduct }: SellerDashboardTopBarProps) {
  return (
    <section className="w-full bg-[#F8F8F8CC] font-[var(--font-roboto)]">
      <div className="tm-fade-down mx-auto flex w-full max-w-[1440px] flex-col gap-[18px] px-[20px] py-[20px] sm:px-[32px] lg:px-[80px] lg:py-[24px]">
        <div className="flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
          {/* Store */}
          <div className="flex min-w-0 items-center gap-[14px]">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[3px] border-[#F3C75F] bg-white lg:h-[60px] lg:w-[60px]">
              <Store size={26} className="text-[#7C9BC0]" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-medium leading-[130%] text-[#7C9BC0] lg:text-[14px]">
                Seller Central
              </p>
              <h1 className="truncate text-[24px] font-black leading-[130%] text-[#333333]/80 sm:text-[28px] lg:text-[34px]">
                {storeName}
              </h1>
            </div>
          </div>

          {/* Add product */}
          <button
            type="button"
            onClick={onAddProduct}
            className="
              flex h-[46px] w-fit shrink-0 items-center justify-center gap-[8px]
              rounded-[12px]
              bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]
              px-[22px]
              text-[16px] font-medium leading-[120%] text-white
              transition-all duration-200 ease-out
              hover:-translate-y-[2px]
              hover:shadow-[0_8px_18px_rgba(255,130,90,0.28)]
              active:translate-y-0
              active:scale-[0.97]
              lg:h-[52px]
              lg:rounded-[14px]
              lg:px-[28px]
              lg:text-[18px]
            "
          >
            <Plus size={20} aria-hidden="true" />
            Add a product
          </button>
        </div>

        {/* Section navigation */}
        <nav className="flex gap-[8px] overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-[38px] shrink-0 items-center rounded-[12px] bg-white px-[16px] text-[14px] font-medium text-[#555555] shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#EEEEEE] hover:text-[#333333]"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
