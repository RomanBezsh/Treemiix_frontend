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
      className="group flex h-[137px] w-[321px] items-center gap-[24px] rounded-[17.45px] border border-[#E5E5E5] bg-[#F8F8F8] px-[28px] shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-colors duration-200 hover:bg-[#7C9BC0]"
    >
      {/* Card icon */}
      <Image
        src={icon}
        alt=""
        width={42}
        height={42}
        aria-hidden="true"
        className="shrink-0 transition duration-200 group-hover:brightness-0 group-hover:invert"
      />

      {/* Card title */}
      <span className="text-[14px] font-normal leading-[130%] text-[#555555] transition-colors duration-200 group-hover:text-white">
        {title}
      </span>
    </Link>
  );
}