import Image from "next/image";

export default function HelpSearch() {
  return (
    <section className="help-fade-up help-delay-2 mt-[38px]">
      {/* Search section title */}
      <h2 className="mb-[12px] text-[14px] font-medium leading-[130%] text-[#222222]">
        Search the help library
      </h2>

      {/* Search form */}
      <form
        action="/customer-service"
        method="get"
        className="
          group flex h-[48px] w-full items-center
          overflow-hidden rounded-[24px]
          border border-[#E1E1E1]
          bg-[#F7F7F7]
          shadow-[0_2px_5px_rgba(0,0,0,0.08)]
          transition-all duration-250 ease-out
          focus-within:border-[#7C9BC0]/50
          focus-within:bg-white
          focus-within:shadow-[0_5px_14px_rgba(0,0,0,0.10)]
        "
      >
        <input
          type="search"
          name="query"
          aria-label="Search the help library"
          placeholder="Search"
          className="
            h-full min-w-0 flex-1
            bg-transparent px-[20px]
            text-[14px] text-[#333333]
            outline-none
            placeholder:text-[#A0A0A0]
          "
        />

        {/* Search button */}
        <button
          type="submit"
          aria-label="Search"
          className="
            flex h-full w-[52px] shrink-0
            items-center justify-center
            transition-colors duration-200 ease-out
            hover:bg-[#7C9BC0]/10
            active:bg-[#7C9BC0]/20
          "
        >
          <Image
            src="/common/search_button_icon.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
            className="
              transition-transform duration-200 ease-out
              group-hover:scale-[1.03]
            "
          />
        </button>
      </form>
    </section>
  );
}