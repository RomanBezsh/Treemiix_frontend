"use client";

import { useRouter } from "next/navigation";
import SimpleProductCard from "@/components/catalog/SimpleProductCard";
import Carousel from "@/components/common/Carousel";

interface SalesSectionProps {
  items: {
    id: string;
    title: string;
    imageSrc: string;
    price: number;
    rating: number;
  }[];
  /** Layout classes of the section wrapper (order and margins on the home page). */
  className?: string;
  /** Carousel item widths, see Carousel.itemClassName. */
  itemClassName?: string;
}

export default function SalesSection({ items, className = "mb-10", itemClassName }: SalesSectionProps) {
  const router = useRouter();

  if (items.length === 0) return null;

  return (
    <div className={className}>
      <Carousel title="Sales" href="/catalog?sale=1" width="max-w-[1534px]" itemClassName={itemClassName}>
        {items.map((product, index) => (
          <SimpleProductCard
            key={index}
            id={String(product.id)}
            title={product.title}
            imageSrc={product.imageSrc}
            price={product.price}
            rating={product.rating}
            onClick={() => router.push(`/product/${product.id}`)}
          />
        ))}
      </Carousel>
    </div>
  );
}
