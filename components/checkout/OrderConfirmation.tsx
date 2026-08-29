export default function OrderConfirmation() {
  return (
    <section className="w-full rounded-[20px] bg-[#F8F8F8] px-[18px] py-[22px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] sm:px-[24px] sm:py-[26px] lg:px-[28px]">
      {/* Shipping */}
      <div>
        <h2 className="text-[22px] font-normal leading-[150%] text-[#333333] sm:text-[25px]">
          Shipping to Chicago
        </h2>

        {/* Pickup */}
        <div className="mt-[16px]">
          <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
            Pickup
          </h3>

          <div className="mt-[5px] flex flex-col">
            <p className="text-[14px] font-normal leading-[150%] text-[#828282] sm:text-[16px]">
              Pick up from post office
            </p>

            <p className="text-[14px] font-normal leading-[150%] text-[#828282] sm:text-[16px]">
              St. Limeam 45
            </p>

            <p className="text-[14px] font-normal leading-[150%] text-[#828282] sm:text-[16px]">
              Pick up April 14 at 13:00 - 18:00
            </p>
          </div>
        </div>
      </div>

      {/* Recipient */}
      <div className="mt-[20px]">
        <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
          Recipient
        </h3>

        <p className="mt-[4px] text-[14px] font-normal leading-[150%] text-[#828282] sm:text-[16px]">
          Mark Daniels
        </p>
      </div>

      {/* Payment */}
      <div className="mt-[20px]">
        <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
          Payment
        </h3>

        <p className="mt-[4px] text-[14px] font-normal leading-[150%] text-[#828282] sm:text-[16px]">
          Order has been paid
        </p>
      </div>

      {/* Delivery cost */}
      <div className="mt-[20px]">
        <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
          Cost of delivery
        </h3>

        <p className="mt-[4px] text-[14px] font-normal leading-[150%] text-[#828282] sm:text-[16px]">
          Free
        </p>
      </div>
    </section>
  );
}