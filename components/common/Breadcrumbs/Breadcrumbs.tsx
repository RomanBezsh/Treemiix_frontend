import Image from "next/image";
import Link from "next/link";

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full font-[var(--font-roboto)]"
    >
      <ol className="flex flex-wrap items-center gap-[12px] text-[14px] text-[#8A8A8A]">
        {/* Home link */}
        <li className="flex items-center gap-[12px]">
          <Link
            href="/"
            aria-label="Go to home page"
            className="flex h-[20px] w-[20px] items-center justify-center"
          >
            <Image
              src="/common/home_icon.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </Link>

          <Image
  src="/common/arrow_right_icon.svg"
  alt=""
  width={8}
  height={12}
  aria-hidden="true"
/>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <li
              key={`${item.title}-${index}`}
              className="flex items-center gap-[12px]"
            >
              {item.href && !isLastItem ? (
                <Link href={item.href} className="whitespace-nowrap">
                  {item.title}
                </Link>
              ) : (
                <span
                  className={
                    isLastItem
                      ? "whitespace-nowrap text-[#777777]"
                      : "whitespace-nowrap"
                  }
                  aria-current={isLastItem ? "page" : undefined}
                >
                  {item.title}
                </span>
              )}

              {!isLastItem && (
                <span aria-hidden="true" className="text-[#A3A3A3]">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}