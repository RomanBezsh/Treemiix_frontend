// Demo data for the seller dashboard (/sell/dashboard).
// The backend has no seller accounts or seller-scoped orders yet,
// so stats, sales and orders below are placeholders.

export type SellerOrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface SellerStat {
  key: string;
  title: string;
  value: string;
  change: number; // % vs previous period
  hint: string;
}

export interface SellerSalesPoint {
  label: string;
  value: number;
}

export interface SellerOrder {
  id: string;
  number: string;
  customer: string;
  product: string;
  quantity: number;
  total: number;
  status: SellerOrderStatus;
  date: string;
}

export interface SellerTask {
  id: string;
  title: string;
  description: string;
  tone: "warning" | "info" | "success";
}

export interface SellerListing {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  oldCost?: number | null;
  stock: number;
  rating?: number;
  sku?: string;
  isLocal?: boolean; // added in the form, not saved to the backend
  videos?: string[]; // YouTube URLs, saved via POST /productvideos (path) like in the admin panel
}

export interface SellerCategory {
  id: string;
  name: string;
}

// Same fields as ProductItem in components/admin/AdminProductsManager.tsx (POST /products)
export interface SellerProductFormValues {
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  price: string;
  oldCost: string;
  stock: string;
  description: string;
  features: string; // one feature per line
  asin: string;
  manufacturer: string;
  itemModelNumber: string;
  countryOfOrigin: string;
  productDimensions: string;
  itemWeight: string;
  warrantyInfo: string;
  binding: string;
  releaseDate: string;
}

export const sellerFallbackCategories: SellerCategory[] = [
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home-kitchen", name: "Home & Kitchen" },
  { id: "books", name: "Books" },
  { id: "sports", name: "Sports & Outdoors" },
];

export const sellerStats: SellerStat[] = [
  { key: "sales", title: "Sales today", value: "$1,284.50", change: 12.4, hint: "vs yesterday" },
  { key: "orders", title: "Open orders", value: "18", change: 5.1, hint: "need shipping" },
  { key: "views", title: "Page views", value: "3,942", change: -3.2, hint: "last 7 days" },
  { key: "rating", title: "Seller rating", value: "4.8", change: 0.6, hint: "212 reviews" },
];

export const sellerSalesByDay: SellerSalesPoint[] = [
  { label: "Mon", value: 820 },
  { label: "Tue", value: 1140 },
  { label: "Wed", value: 960 },
  { label: "Thu", value: 1420 },
  { label: "Fri", value: 1680 },
  { label: "Sat", value: 1310 },
  { label: "Sun", value: 1284 },
];

export const sellerRecentOrders: SellerOrder[] = [
  { id: "o1", number: "#TM-10482", customer: "Olivia Brown", product: "Wireless Headphones", quantity: 1, total: 89.99, status: "Pending", date: "Oct 28, 2026" },
  { id: "o2", number: "#TM-10479", customer: "Liam Smith", product: "Smart Watch Series 5", quantity: 2, total: 398.0, status: "Processing", date: "Oct 28, 2026" },
  { id: "o3", number: "#TM-10471", customer: "Emma Wilson", product: "Bluetooth Speaker", quantity: 1, total: 49.5, status: "Shipped", date: "Oct 27, 2026" },
  { id: "o4", number: "#TM-10466", customer: "Noah Davis", product: "USB-C Charger 65W", quantity: 3, total: 104.97, status: "Delivered", date: "Oct 26, 2026" },
  { id: "o5", number: "#TM-10460", customer: "Ava Johnson", product: "Laptop Stand", quantity: 1, total: 39.99, status: "Cancelled", date: "Oct 25, 2026" },
];

export const sellerTasks: SellerTask[] = [
  { id: "t1", title: "3 orders to ship today", description: "Confirm shipment before 6:00 PM to keep your on-time rate.", tone: "warning" },
  { id: "t2", title: "2 products are low in stock", description: "Restock to avoid losing the Buy Box.", tone: "info" },
  { id: "t3", title: "Account health is good", description: "No policy violations in the last 90 days.", tone: "success" },
];

export const sellerFallbackListings: SellerListing[] = [
  { id: "l1", name: "Wireless Headphones", imageUrl: "", price: 89.99, oldCost: 119.99, stock: 42, rating: 4.6, sku: "WH-001" },
  { id: "l2", name: "Smart Watch Series 5", imageUrl: "", price: 199.0, stock: 3, rating: 4.4, sku: "SW-005" },
  { id: "l3", name: "Bluetooth Speaker", imageUrl: "", price: 49.5, stock: 0, rating: 4.2, sku: "BS-210" },
  { id: "l4", name: "USB-C Charger 65W", imageUrl: "", price: 34.99, stock: 120, rating: 4.8, sku: "CH-065" },
];
