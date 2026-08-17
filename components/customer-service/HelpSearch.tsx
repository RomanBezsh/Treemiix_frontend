import Image from "next/image";

export default function HelpSearch() {
  return (
    <section className="mt-[38px]">
      {/* Search section title */}
      <h2 className="mb-[12px] text-[14px] font-medium leading-[130%] text-[#222222]">
        Search the help library
      </h2>

      {/* Search form */}
      <form
        action="/customer-service"
        method="get"
        className="flex h-[48px] w-full items-center overflow-hidden rounded-[24px] border border-[#E1E1E1] bg-[#F7F7F7] shadow-[0_2px_5px_rgba(0,0,0,0.08)]"
      >
        <input
          type="search"
          name="query"
          aria-label="Search the help library"
          className="h-full min-w-0 flex-1 bg-transparent px-[20px] text-[14px] text-[#333333] outline-none"
        />

        {/* Search button */}
        <button
          type="submit"
          aria-label="Search"
          className="flex h-full w-[52px] shrink-0 items-center justify-center"
        >
          <Image
            src="/common/search_button_icon.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </form>
    </section>
  );
}