interface DealsPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const baseClass = `
  tm-press
  flex h-[46px] w-[46px] shrink-0 items-center justify-center
  rounded-[14px] bg-[#FAFAFA]
  text-[18px] font-medium leading-[144%] text-[#828282]
  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
  disabled:cursor-default disabled:opacity-40
  sm:h-[58px] sm:w-[58px] sm:rounded-[17px] sm:text-[21px]
  lg:h-[76px] lg:w-[76px] lg:rounded-[20px] lg:text-[24px]
`;

// Page numbers with ellipses: 1 … 4 5 6 … 20
function getPages(page: number, totalPages: number): (number | "dots")[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages: (number | "dots")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) pages.push("dots");
  for (let current = start; current <= end; current++) pages.push(current);
  if (end < totalPages - 1) pages.push("dots");
  pages.push(totalPages);
  return pages;
}

export default function DealsPagination({ page, totalPages, onChange }: DealsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Deals pagination" className="mt-[40px] flex items-center justify-center gap-[4px] sm:gap-[6px] lg:gap-[8px]">
      <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)} className={baseClass}>
        ‹
      </button>

      {getPages(page, totalPages).map((item, index) =>
        item === "dots" ? (
          <span key={`dots-${index}`} aria-hidden="true" className={baseClass.replace("tm-press", "")}>
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            onClick={() => onChange(item)}
            className={`${baseClass} ${item === page ? "border-[3px] border-[#D6D6D6]/30 text-[#333333] lg:border-[4px]" : ""}`}
          >
            {item}
          </button>
        ),
      )}

      <button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => onChange(page + 1)} className={baseClass}>
        ›
      </button>
    </nav>
  );
}
