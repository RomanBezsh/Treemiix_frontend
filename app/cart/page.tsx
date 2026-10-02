"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import CartItemsList, {
  type CartProduct,
} from "@/components/cart/CartItemsList";
import CartSummary from "@/components/cart/CartSummary";
import RecentlyViewed, {
  type RecentItem,
} from "@/components/cart/RecentlyViewed";
import { clearAuthSession } from "@/lib/authSession";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";

type BackendCartItem = {
  id: string;
  productId?: string;
  price: number;
  quantity: number;
  product?: {
    name?: string;
    stock?: number;
    galleries?: { path?: string; isMain?: boolean }[];
  };
};

const mapBackendItem = (item: BackendCartItem): CartProduct => {
  const galleries = item.product?.galleries || [];
  const mainGallery =
    galleries.find((g) => g.isMain) || galleries[0];

  return {
    id: item.id,
    productId: item.productId,
    title: item.product?.name || "Product",
    image: mainGallery?.path || undefined,
    price: Number(item.price) || 0,
    quantity: item.quantity,
    selected: false,
    inStock: (item.product?.stock ?? 1) > 0,
  };
};

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartProduct[]>([]);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (!token) return;

    const loadCart = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const cartRes = await fetch(
          `${API_BASE_URL}/carts/my`,
          { headers },
        );
        if (cartRes.status === 401) {
          clearAuthSession();
          return;
        }
        if (!cartRes.ok) return;

        const cart = await cartRes.json();
        if (!cart?.id) return;

        const itemsRes = await fetch(
          `${API_BASE_URL}/cartitems/bycart/${cart.id}`,
          { headers },
        );
        if (!itemsRes.ok) return;

        const data = await itemsRes.json();
        if (Array.isArray(data)) {
          setItems(data.map(mapBackendItem));
        }
      } catch (e) {
        console.error("Error loading cart", e);
      }
    };

    loadCart();
  }, []);

  const addRecentToCart = async (
    item: RecentItem,
  ): Promise<boolean> => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth");
      return false;
    }

    try {
      const authHeaders = {
        Authorization: `Bearer ${token}`,
      };

      let cartId: string | null = null;

      const cartRes = await fetch(
        `${API_BASE_URL}/carts/my`,
        { headers: authHeaders },
      );

      if (cartRes.status === 401) {
        router.push("/auth");
        return false;
      }

      if (cartRes.ok) {
        const cart = await cartRes.json();
        cartId = cart?.id || null;
      } else if (cartRes.status === 404) {
        const createRes = await fetch(
          `${API_BASE_URL}/carts`,
          {
            method: "POST",
            headers: authHeaders,
          },
        );
        if (createRes.status === 401) {
          router.push("/auth");
          return false;
        }
        if (createRes.ok) {
          const created = await createRes.json();
          cartId = created?.id || null;
        }
      }

      if (!cartId) return false;

      const addRes = await fetch(
        `${API_BASE_URL}/cartitems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cartId,
            productId: item.id,
            quantity: 1,
          }),
        },
      );

      if (addRes.status === 401) {
        router.push("/auth");
        return false;
      }

      if (!addRes.ok) return false;

      const created = await addRes.json();

      if (created?.id) {
        setItems((currentItems) => {
          if (
            currentItems.some(
              (cartItem) => cartItem.productId === item.id,
            )
          ) {
            return currentItems;
          }

          return [
            ...currentItems,
            {
              id: String(created.id),
              productId: item.id,
              title: item.title,
              image: item.imageSrc,
              price: Number(created.price ?? item.price ?? 0),
              quantity: Number(created.quantity) || 1,
              selected: false,
              inStock: true,
            },
          ];
        });
      }

      window.dispatchEvent(
        new CustomEvent("cart-updated"),
      );

      return true;
    } catch (e) {
      console.error("Error adding to cart", e);
      return false;
    }
  };

  const persistQuantity = async (
    id: string,
    quantity: number,
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/cartitems/${id}?quantity=${quantity}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        window.dispatchEvent(
          new CustomEvent("cart-updated"),
        );
      }
    } catch (e) {
      console.error("Error updating quantity", e);
    }
  };

  const persistDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/cartitems/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        window.dispatchEvent(
          new CustomEvent("cart-updated"),
        );
      }
    } catch (e) {
      console.error("Error deleting item", e);
    }
  };

  const allSelected =
    items.length > 0 && items.every((item) => item.selected);

  const selectedItemsCount = items.reduce(
    (total, item) => total + (item.selected ? item.quantity : 0),
    0,
  );

  const toggleItem = (id: string) => {
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

  const increaseQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;

        const quantity = item.quantity + 1;
        void persistQuantity(id, quantity);
        return { ...item, quantity };
      }),
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;

        const quantity = Math.max(1, item.quantity - 1);
        if (quantity === item.quantity) return item;

        void persistQuantity(id, quantity);
        return { ...item, quantity };
      }),
    );
  };

  const deleteItem = (id: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
    void persistDelete(id);
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

            <RecentlyViewed
              excludedProductIds={items
                .map((item) => item.productId)
                .filter((id): id is string => Boolean(id))}
              onAddToCart={addRecentToCart}
            />
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
