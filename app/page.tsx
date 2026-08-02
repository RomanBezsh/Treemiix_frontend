import CategoryCard from "@/components/home/CategoryCard";
import CategoryQuadCard from "@/components/home/CategoryQuadCard";
import HeroBanner from "@/components/home/HeroBanner";
import PromoBanner from "@/components/home/PromoBanner";






const nikeSaleItems = [
  {
    id: "nike-1",
    title: "Air Max 270",
    imageSrc: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    href: "/catalog/nike/air-max-270",
  },
  {
    id: "nike-2",
    title: "Revolution 6",
    imageSrc: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80",
    href: "/catalog/nike/revolution-6",
  },
  {
    id: "nike-3",
    title: "Court Vision Low",
    imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
    href: "/catalog/nike/court-vision",
  },
  {
    id: "nike-4",
    title: "Air Force 1 '07",
    imageSrc: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&q=80",
    href: "/catalog/nike/air-force-1",
  },
];



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
        <CategoryQuadCard
          title="Sale Nike"
          moreHref="/catalog/nike"
          items={nikeSaleItems}
        />
      </div>
    </div>
  );
}
