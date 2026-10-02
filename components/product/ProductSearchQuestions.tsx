import Image from "next/image";

const ProductSearchQuestions = () => {
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
      <h2 className="mb-[8px] text-[21px] font-semibold leading-[130%] text-[#333333] sm:text-2xl">
        Have a question?
      </h2>

      <p className="mb-[20px] text-[14px] leading-[150%] text-[#828282] sm:mb-[27px] sm:text-[16px]">
        Find answers in product info, Q&amp;As, reviews
      </p>

      <div className="relative w-full max-w-[930px]">
        <Image
          className="
            absolute left-[18px] top-1/2
            h-[20px] w-[20px]
            -translate-y-1/2
            sm:left-[24px]
            sm:h-[24px] sm:w-[24px]
          "
          src="/product/loupe.svg"
          width={24}
          height={23}
          alt=""
          aria-hidden="true"
        />

        <input
          type="text"
          className="
            h-[44px] w-full
            rounded-[26px]
            border border-transparent
            bg-[#F8F8F8]
            pl-[50px] pr-[18px]
            text-[14px] text-[#333333]
            outline-none
            transition-all duration-200
            placeholder:text-[#B3B3B3]
            focus:border-[#7C9BC0]
            focus:bg-white
            focus:shadow-[0_4px_12px_rgba(124,155,192,0.14)]
            sm:pl-[63px]
            sm:text-lg
          "
          placeholder="Type your question or keyword"
        />
      </div>
    </section>
  );
};

export default ProductSearchQuestions;