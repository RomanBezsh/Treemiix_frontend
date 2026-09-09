import type { HorizontalProductCardProps } from "../components/home/HorizontalProductCard";
import type { PopularCategoryTileProps } from "../components/home/PopularCategoryTile";

type Product = {
  id: string;
  title: string;
  imageSrc: string;
  price: number;
};

type CategoryQuadItem = {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
};

export const nikeSaleItems: CategoryQuadItem[] = [
  { id: "nike-1", title: "Air Max 270", imageSrc: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", href: "/catalog/nike/air-max-270" },
  { id: "nike-2", title: "Revolution 6", imageSrc: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80", href: "/catalog/nike/revolution-6" },
  { id: "nike-3", title: "Court Vision Low", imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80", href: "/catalog/nike/court-vision" },
  { id: "nike-4", title: "Air Force 1 '07", imageSrc: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&q=80", href: "/catalog/nike/air-force-1" },
];

export const popularProductsData: HorizontalProductCardProps[] = [
  { imageSrc: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", title: 'Tablet Samsung Galaxy Tab A7 Lite 8,7" LTE 3/32Gb Gray', price: 530 },
  { imageSrc: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80", title: "Smartphone Xiaomi 11T 8/128Gb Celestial Blue", price: 530 },
  { imageSrc: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80", title: "Gaming Headset HyperX Cloud Alpha (HX-HSCA-RD/EE)", price: 530, isLastItem: true },
];

export const popularCategoriesData: PopularCategoryTileProps[] = [
  { category: "Wrist Watch", imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", href: "/catalog/watches" },
  { category: "Home decor", imageSrc: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80", href: "/catalog/home-decor" },
  { category: "Notebook", imageSrc: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80", href: "/catalog/notebooks" },
];

export const homeDecorUnder20Products: Product[] = [
  { id: "home-decor-1", title: "Ceramic Vase", imageSrc: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&q=80", price: 14.99 },
  { id: "home-decor-2", title: "Scented Candle", imageSrc: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80", price: 12.5 },
  { id: "home-decor-3", title: "Wooden Photo Frame", imageSrc: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80", price: 18 },
  { id: "home-decor-4", title: "Decorative Pillow", imageSrc: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&q=80", price: 19.99 },
  { id: "home-decor-5", title: "Table Lamp", imageSrc: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", price: 17.5 },
];

export const carouselCardProducts: Product[] = [
  { id: "carousel-card-1", title: "Wine cabinet Philco PW24FD", imageSrc: "https://images.unsplash.com/photo-1594488687126-7d3d1f5e071e?w=500&q=80", price: 250 },
  { id: "carousel-card-2", title: "Internet Router TP-Link Archer C80", imageSrc: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80", price: 65 },
  { id: "carousel-card-3", title: "Monitor Samsung S24R358FZ", imageSrc: "https://images.unsplash.com/photo-1527443224154-c4a3942d3cfc?w=500&q=80", price: 350 },
  { id: "carousel-card-4", title: "Microphone HyperX QuadCast", imageSrc: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80", price: 160 },
];

export const recentlyViewedProducts: Product[] = [
  { id: "rv-1", title: "Tablet Xiaomi Mi Pad 5 6/256Gb", imageSrc: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", price: 349.99 },
  { id: "rv-2", title: "Iron Philips GC4938/20", imageSrc: "https://images.unsplash.com/photo-1596728046462-7f67a21a60d8?w=500&q=80", price: 89.00 },
  { id: "rv-3", title: "Table music lamp Xiaomi MIDIAN", imageSrc: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", price: 45.50 },
  { id: "rv-4", title: "Razer Death Adder Essential", imageSrc: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80", price: 29.99 },
  { id: "rv-5", title: "Gembird MUSG-301", imageSrc: "https://images.unsplash.com/photo-1527443224154-c4a3942d3cfc?w=500&q=80", price: 15.00 },
  { id: "rv-6", title: "Smart TV LG 4K", imageSrc: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80", price: 499.00 },
];
