import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const ProductDetails = () => {
    return (
        <>
            <ProductDescriptionText text="HyperXTM Cloud Alpha's groundbreaking Dual Chamber Drivers design gives audio more distinction and clarity by reducing distortion. The dual chambers separate the bass for cleaner, smoother sound. Cloud Alpha has premium red memory foam, an expanded headband and softer, more pliable leatherette, an aluminum frame, detachable braided cable and noise-cancellation microphone. Multi-platform compatible with in-line audio controls on PC, PS4, Xbox One and other platforms with 3.5mm ports. Frequency response of Microphone is 50Hz-18,000Hz. Issues due to headset detachable main cord partially inserted in the ear cup jack resulting in no microphone audio or quiet/static sounds. The customer should follow the Cloud Alpha User Manual or HyperX Gaming support website headset cable attachment guidelines to properly connect the cord, activate the microphone audio on the Alpha inline volume control box, and ensure Cloud Alpha configured as primary audio playback and recording device on the host system." />
            <div className="flex flex-row items-stretch gap-9">
                <ProductSpecsTable specs={sampleSpecs} />
                <div className="border-r-2 border-[#EFEFEF] self-stretch" />
                <ProductSupportSection />
            </div>
            
        </>
    )
}


const sampleSpecs: SpecRowData[] = [
  { id: "1", label: "ASIN", value: "B074NBSF9N" },
  { id: "2", label: "Release date", value: "September 25, 2017" },
  {
    id: "3",
    label: "Customer Reviews",
    value: { stars: 4, count: 9600 },
    type: ValueType.rating,
  },
  {
    id: "4",
    label: "Best Sellers Rank",
    value: "#633 in Video Games (#15 in PC Game Headsets)",
  },
  {
    id: "5",
    label: "Pricing",
    value:
      "The strikethrough price is the List Price. Savings represents a discount off the List Price.",
  },
  {
    id: "6",
    label: "Product Dimensions",
    value: "9.2 x 8.25 x 4.65 inches; 12 Ounces",
  },
  { id: "7", label: "Binding", value: "Personal Computers" },
  { id: "8", label: "Item model number", value: "HX-HSCA-RD/AM" },
  { id: "9", label: "Is Discontinued By Manufacturer", value: "No" },
  { id: "10", label: "Item Weight", value: "12 ounces" },
  { id: "11", label: "Manufacturer", value: "Kingston Technology Company, Inc." },
  { id: "12", label: "Country of Origin", value: "China" },
  { id: "13", label: "Date First Available", value: "August 22, 2017" },
];

interface ProductDescriptionTextProps {
    text: string
}

const ProductDescriptionText = ({ text }: ProductDescriptionTextProps) => {
    return (
        <div className="mb-37 w-max-[1690px]">
            <h2 className="text-[#333333] font-semibold text-2xl mb-10">Product Description</h2>
            <p className="text-[#333333] w-[1690px]">{text}</p>
        </div>
    );
}

enum ValueType {
  text = "text",
  rating = "rating",
}

interface RatingValue {
  stars: number;
  count: number;
}

interface SpecRowData {
  id: string;
  label: string;
  value: ReactNode | RatingValue;
  type?: ValueType;
}

interface RowProps {
  label: string;
  value: ReactNode | RatingValue;
  type?: ValueType;
  isEven?: boolean;
}

const Row = ({ label, value, type = ValueType.text, isEven }: RowProps) => {
  return (
    <div
      className={`flex flex-row w-266.25 h-14 items-center px-6 py-3.5 rounded-[20px] ${
        isEven ? "bg-[#F8F8F8]" : "bg-transparent"
      }`}
    >
      <span className="w-1/3 text-lg text-[#333333]">{label}</span>

      <div className="w-full text-lg text-[#333333] self-start">
        {type === ValueType.rating ? (
          (() => {
            const ratingData = value as RatingValue;
            const stars = ratingData?.stars ?? 0;
            const count = ratingData?.count ?? 0;

            return (
              <div className="flex flex-row items-center gap-1.5">
                <div className="flex flex-row gap-1">
                  {Array.from({ length: 5 }, (_, index) => {
                    const isFilled = index < stars;
                    return (
                      <img
                        key={index}
                        src={
                          isFilled
                            ? "/common/star_filled.svg"
                            : "/common/star_empty.svg"
                        }
                        alt={isFilled ? "Filled star" : "Empty star"}
                      />
                    );
                  })}
                </div>

                <Image
                  src="/catalog/chewron_down.svg"
                  width={19}
                  height={19}
                  alt="chevron"
                  className="filter-[brightness(0)_saturate(100%)_invert(55%)_sepia(0%)_saturate(0%)_hue-rotate(182deg)_brightness(94%)_contrast(91%)]"
                />

                <span className="text-[#496B94] hover:underline cursor-pointer">
                  {count.toLocaleString("en-US")} ratings
                </span>
              </div>
            );
          })()
        ) : (
          <span className="w-full">{value as ReactNode}</span>
        )}
      </div>
    </div>
  );
};

interface ProductSpecsTableProps {
  specs: SpecRowData[];
}

const ProductSpecsTable = ({ specs }: ProductSpecsTableProps) => {
  return (
    <div className="flex flex-col w-full max-w-[1065px]">
      <h2 className="text-xl font-semibold text-[#333333] mb-4">
        Product Description
      </h2>

      <div className="flex flex-col">
        {specs.map((spec, index) => (
          <Row
            key={spec.id}
            label={spec.label}
            value={spec.value}
            type={spec.type}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};


interface DocumentItem {
  id: string;
  title: string;
  fileUrl: string;
  fileType?: string;
}

interface ProductSupportSectionProps {
  warrantyLink?: string;
  lowerPriceLink?: string;
  documents?: DocumentItem[];
}

const ProductSupportSection = ({
  warrantyLink = "#",
  lowerPriceLink = "#",
  documents = [
    { id: "1", title: "User Manual", fileUrl: "#", fileType: "PDF" },
    { id: "2", title: "Product Documentation", fileUrl: "#", fileType: "PDF" },
    { id: "3", title: "Specification Sheet", fileUrl: "#", fileType: "PDF" },
  ],
}: ProductSupportSectionProps) => {
  return (
    <div className="flex flex-col gap-6 max-w-[615px] text-[#333333]">
      <div className="flex flex-col gap-3.5 mb-12.5">
        <h2 className="text-[#333333] font-semibold text-2xl ">Warranty & Support</h2>
        <p className=" text-[#666666]">
          Product Warranty: For warranty information about this product, please{" "}
          <Link href={warrantyLink} className="text-[#007185] hover:underline">
            click her
          </Link>{" "}
          (PDF).
        </p>
      </div>

      <div className="flex flex-col gap-3.5 mb-12.5">
        <h2 className="text-[#333333] font-semibold text-2xl ">Feedback</h2>
        <p className=" text-[#666666]">
          Would you like to{" "}
          <Link href={lowerPriceLink} className="text-[#007185] hover:underline">
            tell us about a lower price?
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[#333333] font-semibold text-2xl ">Product guides and documents</h2>
        <div className="flex flex-col gap-1">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-row items-center justify-between"
            >
              <span className="text-[#333333]">{doc.title}</span>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5  font-medium text-[#555555] bg-[#F0F2F2] border border-[#D5D9D9] rounded hover:bg-[#E3E6E6]"
              >
                {doc.fileType || "PDF"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default ProductDetails;