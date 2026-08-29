"use client";

import { useState } from "react";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import CartItemsList, {
  type CartProduct,
} from "@/components/cart/CartItemsList";
import CartSummary from "@/components/cart/CartSummary";
import RecentlyViewed from "@/components/cart/RecentlyViewed";

const initialCartItems: CartProduct[] = [
  {
    id: 1,
    title:
      "Notebook ASUS TUF Gaming F15 FX506LH-HN153 (90NR03U1-M08940) Fortress Gray + mouse Asus TUF M5",
    price: 1500,
    quantity: 1,
    selected: false,
    inStock: true,
  },
  {
    id: 2,
    title: "Razer Kraken X Lite (Black)",
    price: 920,
    quantity: 1,
    selected: false,
    inStock: true,
  },
  {
    id: 3,
    title: "Razer Kraken Multi Platform (Green)",
    price: 250,
    quantity: 1,
    selected: false,
    inStock: true,
  },
  {
    id: 4,
    title: '4" Glue Sticks by ArtMinds',
    price: 3.5,
    quantity: 8,
    selected: false,
    inStock: true,
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartProduct[]>(initialCartItems);

  const allSelected =
    items.length > 0 && items.every((item) => item.selected);

  const selectedItemsCount = items.reduce(
    (total, item) => total + (item.selected ? item.quantity : 0),
    0,
  );

  const toggleItem = (id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
            }
          : item,
      ),
    );
  };

  const toggleAll = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        selected: !allSelected,
      })),
    );
  };

  const increaseQuantity = (id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const deleteItem = (id: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1440px] px-[20px] pb-[90px] pt-[24px] sm:px-[32px] lg:px-[40px]">
        {/* Breadcrumbs */}
      <Breadcrumbs
  items={[
    {
      title: "Cart",
    },
  ]}
/>

        {/* Cart header */}
        <div className="mt-[22px] flex items-end justify-between gap-[24px]">
          <div>
            <h1 className="text-[30px] font-normal leading-[150%] text-[#333333]">
              Shopping Cart
            </h1>

            <p className="mt-[2px] text-[16px] font-normal leading-[150%] text-[#333333]">
              {selectedItemsCount === 0
                ? "No items selected."
                : `${selectedItemsCount} ${
                    selectedItemsCount === 1 ? "item" : "items"
                  } selected.`}
            </p>
          </div>

          {/* Select all */}
          {items.length > 0 && (
            <button
              type="button"
              onClick={toggleAll}
              className="flex shrink-0 items-center gap-[8px] text-[16px] font-normal leading-[150%] text-[#333333]"
            >
              <span>Select all items</span>

              <ImageCheckbox checked={allSelected} />
            </button>
          )}
        </div>

        {/* Cart content */}
        <div className="mt-[24px] grid grid-cols-1 gap-[32px] lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          {/* Items */}
          <CartItemsList
            items={items}
            onSelect={toggleItem}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onDelete={deleteItem}
          />

          {/* Sidebar */}
          <div className="flex flex-col gap-[24px]">
            <CartSummary items={items} />

            <RecentlyViewed />
          </div>
        </div>
      </div>
    </main>
  );
}

function ImageCheckbox({ checked }: { checked: boolean }) {
  return (
    <img
      src={
        checked
          ? "/account/lists/checkbox_checked_icon.svg"
          : "/account/lists/checkbox_empty_icon.svg"
      }
      alt=""
      aria-hidden="true"
      className="h-[20px] w-[20px]"
    />
  );
}