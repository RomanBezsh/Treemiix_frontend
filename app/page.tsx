import CategoryCard from "@/components/home/CategoryCard";
import HeroBanner from "@/components/home/HeroBanner";
import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
      <img className="w-full object-cover" src="/background/main.jpg" alt="Logo" />

      <div className="relative z-10 -mt-43">
        <CategoryCard
          title="Category 1"
          imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
          href="/category1"
        />
        <HeroBanner />
        <PromoBanner />
      </div>
    </div>
  );
}
