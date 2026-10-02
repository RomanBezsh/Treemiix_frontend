"use client";
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import HelpCardsGrid from "@/components/customer-service/HelpCardsGrid";
import HelpSearch from "@/components/customer-service/HelpSearch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function CustomerServicePage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/customer-service`)
      .then((res) => res.json())
      .then(setTopics)
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1200px] px-[24px] pt-[40px] pb-[70px] lg:pl-[80px] lg:pr-[40px]">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ title: "Customer Service" }]} />

        {/* Page introduction */}
        <section className="mt-[28px] mb-[36px]">
          <h1 className="text-[24px] font-medium leading-[130%] text-[#222222]">
            We're here to help, Jerry
          </h1>

          <p className="mt-[6px] text-[14px] font-normal leading-[130%] text-[#555555]">
            We'll walk you through fixing most things here, or connect you to someone if you need more help.
          </p>
        </section>

        {/* Help topics */}
        <section>
          <p className="mb-[20px] text-[14px] font-medium leading-[130%] text-[#222222]">
            What would you like help with today? You can quickly take care of most things here, or connect with us when needed.
          </p>
          <HelpCardsGrid />
        </section>

        {/* Help library search */}
        <HelpSearch />
      </div>
    </main>
  );
}