import Image from "next/image";

export interface Product {
  id: string;
  title: string;
  imageSrc: string;
  price: number;
}


const SimpleProductCard = ({ id, title, imageSrc, price }: Product) => {
  return (
    <div className="flex flex-col w-67.5 h-93.75 ">
      <div className="relative flex items-center justify-center w-[270px] h-[270px] bg-[#F8F8F8] shadow-[0_2px_4px_0px_#00000033] rounded-[20px] mb-[18px] p-4">
        <Image
          src={imageSrc}
          alt={title}
          width={232}
          height={210}
          className="max-h-full w-auto object-contain"
        />
      </div>
      <p className="text-[18px] text-[#333333]">{title}</p>
      <p className="text-4xl font-light text-[#2D2D2D]">
        <span className="text-[18px] inline-block align-top font-light">$</span>
        {price.toFixed(2)}
      </p>
    </div>
  );
};


export default SimpleProductCard;