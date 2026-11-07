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
}

export default function SalesSection({ items }: SalesSectionProps) {
  const router = useRouter();

  return (
    <div className="mb-10">
      <Carousel title="Sales" href="/catalog?sale=1" width="max-w-[1534px]">
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
