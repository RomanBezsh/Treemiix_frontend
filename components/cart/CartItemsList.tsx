import CartItem from "./CartItem";

export type CartProduct = {
  id: number;
  title: string;
  image?: string;
  price: number;
  quantity: number;
  selected: boolean;
  inStock?: boolean;
};

type CartItemsListProps = {
  items: CartProduct[];
  onSelect: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
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
      <div className="flex min-h-[160px] w-full items-center justify-center rounded-[14px] bg-[#F8F8F8]">
        <p className="text-[16px] font-normal leading-[150%] text-[#333333]">
          Your shopping cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-[14px]">
      {/* Cart items */}
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onSelect={onSelect}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}