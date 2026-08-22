'use client';
import ActiveFiltersBar from "@/components/catalog/ActiveFiltersBar";
import { CategoryHeader } from "@/components/catalog/CategoryHeader";
import ProductCard from "@/components/catalog/ProductCard";
import { useState } from "react";


const Catalog = () => {

  const [chips, setChips] = useState([
    { id: '1', label: 'Razer' },
    { id: '2', label: 'Last 30 days' },
  ]);


  return (
    <div className="">
      <CategoryHeader title="Catalog" description="Browse our collection of products." />
      <ActiveFiltersBar
        selected={26}
        chips={chips.map((chip) => ({
          label: chip.label,
          onRemove: () => { console.log(chip.id) },
        }))}
      />
      <ProductCard title="Product" stars={3} priceSale={555} priceOriginal={999} shipTo="Потужностан" />
    </div>
  );
};

export default Catalog;
