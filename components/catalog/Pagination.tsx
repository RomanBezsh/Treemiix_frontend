import Image from "next/image";

const Pagination = () => {
  return (
    <div className="flex flex-row gap-1.5">
      <PaginationControl isPrevious />
      <PaginationControl page={1} />
      <PaginationControl page={2} />
      <PaginationControl page={3} />
      <PaginationControl isPrevious={false} />
    </div>
  );
};

interface PaginationControlProps {
  isPrevious?: boolean;
  page?: number;
}

const PaginationControl = ({ isPrevious, page }: PaginationControlProps) => {


  return (
    <button className="w-19 h-19 bg-[#F8F8F8] shadow-[0px_2px_4px_#00000033] flex items-center justify-center rounded-[20px]">
      {isPrevious != null && (
        <Image
          className={isPrevious ? "rotate-180" : ""}
          src="/home/carousel_chewron.svg"
          alt="carousel chevron"
          width={12}
          height={26}
        />
      )}
      {page != null && (
        <span className="text-[#828282] text-2xl font-medium">
          {page}
        </span>
      )}
    </button>
  );
};



export default Pagination;
