import SellerAdvantages from "@/components/sell/SellerAdvantages";
import SellerBenefits from "@/components/sell/SellerBenefits";
import SellerHero from "@/components/sell/SellerHero";
import SellerStartSelling from "@/components/sell/SellerStartSelling";
import SellerTopBar from "@/components/sell/SellerTopBar";

export default function SellPage() {
  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      {/* Top bar */}
      <SellerTopBar />

      {/* Hero */}
      <SellerHero />

      {/* Benefits */}
      <SellerBenefits />

      {/* Advantages */}
      <SellerAdvantages />

      {/* Start selling */}
      <SellerStartSelling />
    </main>
  );
}