import WishlistCard from "./WishlistCard";

export default function AccountLists() {
  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Your Lists & Favorites
      </h1>

      {/* Wishlist */}
      <WishlistCard />
    </section>
  );
}