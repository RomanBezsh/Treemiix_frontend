import CartItem from "./CartItem";

export type CartProduct = {
  id: string;
  productId?: string;
  title: string;
  image?: string;
  price: number;
  quantity: number;
  selected: boolean;
  inStock?: boolean;
};

type CartItemsListProps = {
  items: CartProduct[];
  onSelect: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CartItemsList({
  items,
  onSelect,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="cart-scale-in flex min-h-[160px] w-full items-center justify-center rounded-[14px] bg-[#F8F8F8]">
        <p className="text-[16px] font-normal leading-[150%] text-[#333333]">
          Your shopping cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-[14px]">
      {/* Cart items */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className="cart-fade-up"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <CartItem
            {...item}
            onSelect={onSelect}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}