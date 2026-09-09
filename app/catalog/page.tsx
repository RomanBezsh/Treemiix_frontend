'use client';
import ActiveFiltersBar from "@/components/catalog/ActiveFiltersBar";
import { CategoryHeader } from "@/components/catalog/CategoryHeader";
import Filter from "@/components/catalog/Filter";
import Pagination from "@/components/catalog/Pagination";
import ProductCard from "@/components/catalog/ProductCard";
import { useState } from "react";

const Catalog = () => {

  const [chips, setChips] = useState([
    { id: '1', label: 'Razer' },
    { id: '2', label: 'Last 30 days' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row  ml-12.5 mr-24.25 gap-23.25">
        <Filter />
        <div className="flex flex-col justify-center ">
          <CategoryHeader title="Catalog" description="Browse our collection of products." />
          <ActiveFiltersBar
            selected={26}
            chips={chips.map((chip) => ({
              label: chip.label,
              onRemove: () => { console.log(chip.id) },
            }))}
          />
          <div className="grid grid-cols-5 gap-5 mb-10">
            {Array.from({ length: 20 }, (_, index) => {
              return (
                <ProductCard key={index} title="Product" stars={3} priceSale={555} priceOriginal={999} shipTo="Потужностан" imageSrc={""} />
              );
            })}
          </div>
          <Pagination 
            totalPages={5} 
            currentPage={currentPage} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
        </div>




      </div>
    </div>

  );
};

export default Catalog;
