import Image from "next/image";

interface PopularCategoryTileProps {
  category: string;
  href: string;
  imageSrc: string;
}

const PopularCategoryTile = ({ category, href, imageSrc }: PopularCategoryTileProps) => {
  return (
    <div>
      <Image src={imageSrc} alt={category} fill/>
      <h3>{category}</h3>
    </div>
  )
}
