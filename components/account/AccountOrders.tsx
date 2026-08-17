export default function AccountOrders() {
  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Your Orders
      </h1>

      {/* Orders panel */}
      <div className="min-h-[92px] rounded-[20px] bg-[#F8F8F8] px-[36px] py-[28px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        <p className="text-[14px] font-normal leading-[150%] text-[#555555]">
          0 orders placed in ...
        </p>
      </div>
    </section>
  );
}