import Image from "next/image";
import { CalendarDays, Package, Star } from "lucide-react";

export interface SellerStore {
  id: string;
  storeName: string;
  storeSlug?: string;
  logoUrl?: string | null;
  description?: string | null;
  rating?: number;
  createdAt?: string;
}

interface SellerStoreHeaderProps {
  seller: SellerStore;
  productsCount: number;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "S";

const formatSince = (date?: string) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export default function SellerStoreHeader({ seller, productsCount }: SellerStoreHeaderProps) {
  const rating = Math.max(0, Math.min(5, Number(seller.rating) || 0));
  const since = formatSince(seller.createdAt);

  return (
    <section className="tm-fade-down overflow-hidden rounded-[20px] bg-[#F8F8F8] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
      {/* Cover */}
      <div className="h-[110px] bg-[linear-gradient(107.53deg,#7E8CBD_34.61%,#CE9AD7_106.51%)] sm:h-[150px]" />

      <div className="flex flex-col gap-[18px] px-[20px] pb-[24px] sm:flex-row sm:items-end sm:gap-[24px] sm:px-[32px] lg:px-[40px]">
        {/* Logo */}
        <div className="-mt-[48px] flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[4px] border-[#F3C75F] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] sm:-mt-[56px] sm:h-[112px] sm:w-[112px]">
          {seller.logoUrl ? (
            <Image
              src={seller.logoUrl}
              alt={seller.storeName}
              width={112}
              height={112}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="bg-[linear-gradient(90deg,#6A7DBE_0%,#87618D_100%)] bg-clip-text text-[34px] font-black text-transparent sm:text-[40px]">
              {getInitials(seller.storeName)}
            </span>
          )}
        </div>

        {/* Name and meta */}
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-[#7C9BC0]">TreeMiix seller</p>
          <h1 className="break-words text-[26px] font-black leading-[120%] text-[#333333] sm:text-[32px] lg:text-[36px]">
            {seller.storeName}
          </h1>

          <div className="mt-[10px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[14px] text-[#555555]">
            <span className="flex items-center gap-[6px]" aria-label={`Rating ${rating.toFixed(1)} out of 5`}>
              <span className="flex gap-[2px]">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={16}
                    aria-hidden="true"
                    className={index < Math.round(rating) ? "fill-[#FFA95A] text-[#FFA95A]" : "text-[#D6D6D6]"}
                  />
                ))}
              </span>
              {rating > 0 ? rating.toFixed(1) : "No ratings yet"}
            </span>

            <span className="flex items-center gap-[6px]">
              <Package size={16} aria-hidden="true" className="text-[#7C9BC0]" />
              {productsCount} {productsCount === 1 ? "product" : "products"}
            </span>

            {since && (
              <span className="flex items-center gap-[6px]">
                <CalendarDays size={16} aria-hidden="true" className="text-[#7C9BC0]" />
                Selling since {since}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="border-t border-[#EFEFEF] px-[20px] py-[18px] sm:px-[32px] lg:px-[40px]">
        <h2 className="text-[16px] font-medium text-[#333333]">About the store</h2>
        <p className="mt-[6px] max-w-[900px] text-[14px] leading-[150%] text-[#555555] sm:text-[15px]">
          {seller.description?.trim() ||
            `${seller.storeName} sells on TreeMiix. Browse their products below — every order is protected by TreeMiix buyer guarantees.`}
        </p>
      </div>
    </section>
  );
}
