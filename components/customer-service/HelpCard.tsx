import Image from "next/image";
import Link from "next/link";

type HelpCardProps = {
  title: string;
  icon: string;
  href: string;
};

export default function HelpCard({
  title,
  icon,
  href,
}: HelpCardProps) {
  return (
    <Link
      href={href}
      className="
        group flex h-[137px] w-[321px]
        items-center gap-[24px]
        rounded-[17.45px]
        border border-[#E5E5E5]
        bg-[#F8F8F8]
        px-[28px]
        shadow-[0_2px_6px_rgba(0,0,0,0.08)]
        transition-all duration-250 ease-out
        hover:-translate-y-[5px]
        hover:scale-[1.015]
        hover:bg-[#7C9BC0]
        hover:shadow-[0_10px_22px_rgba(0,0,0,0.12)]
        active:translate-y-0
        active:scale-[0.98]
      "
    >
      {/* Card icon */}
      <Image
        src={icon}
        alt=""
        width={42}
        height={42}
        aria-hidden="true"
        className="
          shrink-0
          transition-all duration-200 ease-out
          group-hover:scale-[1.08]
          group-hover:brightness-0
          group-hover:invert
        "
      />

      {/* Card title */}
      <span
        className="
          text-[14px] font-normal leading-[130%] text-[#555555]
          transition-all duration-200 ease-out
          group-hover:translate-x-[2px]
          group-hover:text-white
        "
      >
        {title}
      </span>
    </Link>
  );
}