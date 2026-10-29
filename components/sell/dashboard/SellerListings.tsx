import Image from "next/image";
import Link from "next/link";
import { ImageOff, Pencil } from "lucide-react";
import type { SellerListing } from "@/data/sellerDashboardData";

interface SellerListingsProps {
  listings: SellerListing[];
  isLive: boolean;
  isLoading: boolean;
}

const LOW_STOCK = 5;

function StockLabel({ stock }: { stock: number }) {
  if (stock <= 0) {
    return <span className="text-[13px] font-medium text-[#FF825A]">Out of stock</span>;
  }
  if (stock <= LOW_STOCK) {
    return <span className="text-[13px] font-medium text-[#E0A21F]">Low stock: {stock}</span>;
  }
  return <span className="text-[13px] text-[#777777]">In stock: {stock}</span>;
}

export default function SellerListings({ listings, isLive, isLoading }: SellerListingsProps) {
  return (
    <div className="rounded-[20px] bg-[#F8F8F8] p-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] lg:p-[28px]">
      <div className="flex flex-wrap items-center justify-between gap-[10px]">
        <h2 className="text-[20px] font-medium leading-[130%] text-[#333333] lg:text-[22px]">
          Your products <span className="text-[#777777]">({listings.length})</span>
        </h2>
        {!isLoading && !isLive && (
          <span className="rounded-full bg-[#EEEEEE] px-[10px] py-[4px] text-[12px] text-[#777777]">
            Demo products
          </span>
        )}
      </div>

      {isLoading ? (
        <p className="mt-[18px] text-[14px] text-[#555555]">Loading products...</p>
      ) : (
        <ul className="mt-[18px] grid grid-cols-1 gap-[14px] sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((item) => {
            const hasDiscount = typeof item.oldCost === "number" && item.oldCost > item.price;
            const content = (
              <>
                <div className="relative flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#F3F3F3]">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="80px"
                      unoptimized
                      className="object-contain p-[6px]"
                    />
                  ) : (
                    <ImageOff size={24} className="text-[#BBBBBB]" aria-hidden="true" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-[14px] font-medium leading-[135%] text-[#333333]">
                    {item.name}
                  </p>
                  {item.isLocal && (
                    <span className="mt-[4px] inline-flex rounded-full bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[8px] py-[1px] text-[11px] font-medium text-white">
                      New · not saved
                    </span>
                  )}
                  {item.sku && <p className="mt-[2px] text-[12px] text-[#999999]">SKU: {item.sku}</p>}
                  <p className="mt-[4px] flex items-baseline gap-[6px]">
                    <span className="text-[16px] font-medium text-[#333333]">${item.price.toFixed(2)}</span>
                    {hasDiscount && (
                      <span className="text-[12px] text-[#999999] line-through">${item.oldCost!.toFixed(2)}</span>
                    )}
                  </p>
                  <StockLabel stock={item.stock} />
                </div>
              </>
            );

            return (
              <li key={item.id} className="group relative">
                {isLive && !item.isLocal ? (
                  <Link
                    href={`/product/${item.id}`}
                    className="flex h-full gap-[12px] rounded-[14px] bg-white p-[12px] tm-lift"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="flex h-full gap-[12px] rounded-[14px] bg-white p-[12px]">{content}</div>
                )}

                <button
                  type="button"
                  title="Editing will be available when seller accounts are supported"
                  aria-label={`Edit ${item.name}`}
                  className="absolute right-[10px] top-[10px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#F8F8F8] text-[#7C9BC0] opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <Pencil size={14} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
