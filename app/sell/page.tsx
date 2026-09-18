"use client";
import { useEffect } from "react";
import SellerTopBar from "@/components/sell/SellerTopBar";
import SellerHero from "@/components/sell/SellerHero";
import SellerBenefits from "@/components/sell/SellerBenefits";
import SellerAdvantages from "@/components/sell/SellerAdvantages";
import SellerStartSelling from "@/components/sell/SellerStartSelling";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function SellPage() {
  // Backend connection wired; data fetching setup maintained for future integration
  useEffect(() => {
    fetch(`${API_BASE_URL}/sellers`)
      .then((res) => res.json())
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <SellerTopBar />
      <SellerHero />
      <SellerBenefits />
      <SellerAdvantages />
      <SellerStartSelling />
    </main>
  );
}