import Image from "next/image";
import Link from "next/link";



const PopularCategoriesSection = () => {
  return (
    <div className="flex flex-col w-164.75 h-158.75">
      <div className="flex flex-row justify-between items-center mb-7">
        <h2 className="text-2xl font-semibold text-[#333333]">Most popular categories of the week</h2>
        <Link className="flex flex-row items-center" href={href}>
          <span className="text-[#333333] text-[13px] mr-2.25">More</span>
          <Image
            src="/home/vector.svg"
            alt="vector"
            width={22}
            height={8}
          />
        </Link>
      </div>

    </div>
  );
}
