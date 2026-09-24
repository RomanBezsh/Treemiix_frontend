const ProductPromotions = () => {
  return (
    <section
      className="
        mb-[70px] w-full max-w-[1690px]
        px-[16px]
        sm:px-[24px]
        lg:mb-[148px]
        lg:px-[40px]
      "
    >
      <h2
        className="
          mb-[24px]
          text-[21px] font-semibold leading-[130%] text-[#333333]
          sm:text-2xl
          lg:mb-[40px]
        "
      >
        Special offers and product promotions
      </h2>

      <div className="flex flex-col gap-[22px]">
        {/* Promotion 1 */}
        <div
          className="
            flex flex-col items-start gap-[12px]
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-[20px]
          "
        >
          <p className="min-w-0 flex-1 text-[14px] leading-[150%] text-[#333333] sm:text-[16px]">
            Create your FREE Business account to save up
            to 10% with Business-only prices and free
            shipping
          </p>

          <button
            type="button"
            className="
              min-h-[32px] w-full shrink-0
              rounded-[20px]
              bg-[#F8F8F8]
              px-[16px]
              text-[13px] text-[#496B94]
              shadow-[0_2px_4px_#00000033]
              transition-all duration-200
              hover:-translate-y-[2px]
              hover:shadow-[0_5px_10px_rgba(0,0,0,0.12)]
              active:translate-y-0
              active:scale-[0.97]
              sm:w-auto
              sm:min-w-[122px]
              sm:text-sm
            "
          >
            Register today
          </button>
        </div>

        {/* Promotion 2 */}
        <div
          className="
            flex flex-col items-start gap-[12px]
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-[20px]
          "
        >
          <p className="min-w-0 flex-1 text-[14px] leading-[150%] text-[#333333] sm:text-[16px]">
            Your cost could be $49.99 instead of $99.99!
            Get a $50 Amazon Gift Card instantly upon
            approval for the Amazon Rewards Visa Card
          </p>

          <button
            type="button"
            className="
              min-h-[32px] w-full shrink-0
              rounded-[20px]
              bg-[#F8F8F8]
              px-[16px]
              text-[13px] text-[#496B94]
              shadow-[0_2px_4px_#00000033]
              transition-all duration-200
              hover:-translate-y-[2px]
              hover:shadow-[0_5px_10px_rgba(0,0,0,0.12)]
              active:translate-y-0
              active:scale-[0.97]
              sm:w-auto
              sm:min-w-[122px]
              sm:text-sm
            "
          >
            Apply now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPromotions;