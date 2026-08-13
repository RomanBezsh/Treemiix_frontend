import Image from "next/image";
import Link from "next/link";

interface ProductCarouselSectionProps {
  title: string;
  href: string;
  products?: Product[];
}

export interface Product {
  id: string;
  title: string;
  imageSrc: string;
  price: number;
}



const ProductCard = ({ id, title, imageSrc, price }: Product) => {



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


const Carousel = ({ title, href, products }: ProductCarouselSectionProps) => {
  return (
    <div className="flex flex-col w-[1534px] h-[431px]">
      <div className="flex flex-row justify-between items-center mb-7">
        <h2 className="text-2xl font-semibold text-[#333333]">{title}</h2>
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

      <div className="flex flex-row gap-8.75 items-center justify-center">
        <Image
          src="/home/carousel_chewron.svg"
          alt="carousel_chewron"
          width={17 * 2}
          height={37 * 2}
          className="rotate-180"
        />


        <div className="flex flex-row gap-5">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>



        <Image
          src="/home/carousel_chewron.svg"
          alt="carousel_chewron"
          width={17 * 2}
          height={37 * 2}

        />
      </div>

    </div>
  );
};





export default Carousel;




