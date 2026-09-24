import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface ProductDetailsProps {
  product: any;
}

const ProductDetails = ({
  product,
}: ProductDetailsProps) => {
  const dynamicSpecs = [
    {
      id: "asin",
      label: "ASIN",
      value: product.asin || "N/A",
    },
    {
      id: "releaseDate",
      label: "Release date",
      value: product.releaseDate || "N/A",
    },
    {
      id: "model",
      label: "Item model number",
      value: product.itemModelNumber || "N/A",
    },
    {
      id: "manufacturer",
      label: "Manufacturer",
      value: product.manufacturer || "N/A",
    },
    {
      id: "country",
      label: "Country of Origin",
      value: product.countryOfOrigin || "N/A",
    },
    {
      id: "dimensions",
      label: "Product Dimensions",
      value: product.productDimensions || "N/A",
    },
    {
      id: "weight",
      label: "Item Weight",
      value: product.itemWeight || "N/A",
    },
    {
      id: "binding",
      label: "Binding",
      value: product.binding || "N/A",
    },
    ...(product.attributeValues?.map((attr: any) => ({
      id: attr.id,
      label: attr.nameAttr,
      value: attr.value,
    })) || []),
  ].filter(
    (spec) => spec.value && spec.value !== "N/A",
  );

  return (
    <section
      className="
        mb-[70px] w-full max-w-[1690px]
        px-[16px]
        sm:px-[24px]
        lg:mb-[148px]
        lg:px-[40px]
      "
    >
      <ProductDescriptionText
        text={
          product.description ||
          "No description available."
        }
      />

      <div
        className="
          flex w-full flex-col gap-[40px]
          xl:flex-row
          xl:items-stretch
          xl:gap-[36px]
        "
      >
        <ProductSpecsTable
          specs={
            dynamicSpecs.length > 0
              ? dynamicSpecs
              : sampleSpecs
          }
        />

        {/* Divider */}
        <div
          className="
            h-[2px] w-full shrink-0 bg-[#EFEFEF]
            xl:h-auto
            xl:w-[2px]
            xl:self-stretch
          "
        />

        <ProductSupportSection
          warrantyLink={product.warrantyInfo}
        />
      </div>
    </section>
  );
};

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

const sampleSpecs: SpecRowData[] = [
  {
    id: "1",
    label: "ASIN",
    value: "B074NBSF9N",
  },
  {
    id: "2",
    label: "Release date",
    value: "September 25, 2017",
  },
  {
    id: "3",
    label: "Customer Reviews",
    value: {
      stars: 4,
      count: 9600,
    },
    type: ValueType.rating,
  },
  {
    id: "4",
    label: "Best Sellers Rank",
    value:
      "#633 in Video Games (#15 in PC Game Headsets)",
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
  {
    id: "7",
    label: "Binding",
    value: "Personal Computers",
  },
  {
    id: "8",
    label: "Item model number",
    value: "HX-HSCA-RD/AM",
  },
  {
    id: "9",
    label: "Is Discontinued By Manufacturer",
    value: "No",
  },
  {
    id: "10",
    label: "Item Weight",
    value: "12 ounces",
  },
  {
    id: "11",
    label: "Manufacturer",
    value: "Kingston Technology Company, Inc.",
  },
  {
    id: "12",
    label: "Country of Origin",
    value: "China",
  },
  {
    id: "13",
    label: "Date First Available",
    value: "August 22, 2017",
  },
];

interface ProductDescriptionTextProps {
  text: string;
}

const ProductDescriptionText = ({
  text,
}: ProductDescriptionTextProps) => {
  return (
    <div className="mb-[60px] w-full lg:mb-[148px]">
      <h2 className="mb-[20px] text-[21px] font-semibold leading-[130%] text-[#333333] sm:text-2xl lg:mb-[40px]">
        Product Description
      </h2>

      <p className="w-full whitespace-pre-line break-words text-[14px] leading-[160%] text-[#333333] sm:text-[16px]">
        {text}
      </p>
    </div>
  );
};

interface RowProps {
  label: string;
  value: ReactNode | RatingValue;
  type?: ValueType;
  isEven?: boolean;
}

const Row = ({
  label,
  value,
  type = ValueType.text,
  isEven,
}: RowProps) => {
  return (
    <div
      className={`
        flex min-h-[56px] w-full
        flex-col gap-[6px]
        rounded-[14px]
        px-[14px] py-[12px]
        sm:grid
        sm:grid-cols-[minmax(150px,0.8fr)_minmax(0,2fr)]
        sm:items-start
        sm:gap-[20px]
        sm:rounded-[20px]
        sm:px-[24px]
        sm:py-[14px]
        ${isEven ? "bg-[#F8F8F8]" : "bg-transparent"}
      `}
    >
      <span className="break-words text-[14px] font-medium leading-[145%] text-[#333333] sm:text-[16px] lg:text-lg">
        {label}
      </span>

      <div className="min-w-0 break-words text-[14px] leading-[145%] text-[#333333] sm:text-[16px] lg:text-lg">
        {type === ValueType.rating
          ? (() => {
              const ratingData =
                value as RatingValue;

              const stars =
                ratingData?.stars ?? 0;

              const count =
                ratingData?.count ?? 0;

              return (
                <div className="flex flex-wrap items-center gap-[6px]">
                  <div className="flex items-center gap-[4px]">
                    {Array.from(
                      { length: 5 },
                      (_, index) => {
                        const isFilled =
                          index < stars;

                        return (
                          <Image
                            key={index}
                            src={
                              isFilled
                                ? "/common/star_filled.svg"
                                : "/common/star_empty.svg"
                            }
                            width={18}
                            height={18}
                            alt=""
                            aria-hidden="true"
                          />
                        );
                      },
                    )}
                  </div>

                  <Image
                    src="/catalog/chewron_down.svg"
                    width={19}
                    height={19}
                    alt=""
                    aria-hidden="true"
                    className="filter-[brightness(0)_saturate(100%)_invert(55%)_sepia(0%)_saturate(0%)_hue-rotate(182deg)_brightness(94%)_contrast(91%)]"
                  />

                  <span className="cursor-pointer text-[#496B94] hover:underline">
                    {count.toLocaleString("en-US")} ratings
                  </span>
                </div>
              );
            })()
          : (value as ReactNode)}
      </div>
    </div>
  );
};

interface ProductSpecsTableProps {
  specs: SpecRowData[];
}

const ProductSpecsTable = ({
  specs,
}: ProductSpecsTableProps) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col xl:max-w-[1065px]">
      <h2 className="mb-[16px] text-[20px] font-semibold text-[#333333]">
        Product Description
      </h2>

      <div className="flex w-full flex-col">
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
    {
      id: "1",
      title: "User Manual",
      fileUrl: "#",
      fileType: "PDF",
    },
    {
      id: "2",
      title: "Product Documentation",
      fileUrl: "#",
      fileType: "PDF",
    },
    {
      id: "3",
      title: "Specification Sheet",
      fileUrl: "#",
      fileType: "PDF",
    },
  ],
}: ProductSupportSectionProps) => {
  const validWarrantyLink =
    warrantyLink || "#";

  return (
    <div
      className="
        flex w-full flex-col gap-[28px]
        text-[#333333]
        xl:max-w-[615px]
        xl:gap-[24px]
      "
    >
      {/* Warranty */}
      <div className="flex flex-col gap-[12px] xl:mb-[26px]">
        <h2 className="text-[20px] font-semibold text-[#333333] sm:text-2xl">
          Warranty &amp; Support
        </h2>

        <p className="break-words text-[14px] leading-[155%] text-[#666666] sm:text-[16px]">
          Product Warranty: For warranty information about
          this product, please{" "}
          <Link
            href={validWarrantyLink}
            className="text-[#007185] hover:underline"
          >
            click here
          </Link>{" "}
          (PDF).
        </p>
      </div>

      {/* Feedback */}
      <div className="flex flex-col gap-[12px] xl:mb-[26px]">
        <h2 className="text-[20px] font-semibold text-[#333333] sm:text-2xl">
          Feedback
        </h2>

        <p className="text-[14px] leading-[155%] text-[#666666] sm:text-[16px]">
          Would you like to{" "}
          <Link
            href={lowerPriceLink}
            className="text-[#007185] hover:underline"
          >
            tell us about a lower price?
          </Link>
        </p>
      </div>

      {/* Documents */}
      <div className="flex flex-col gap-[12px]">
        <h2 className="text-[20px] font-semibold text-[#333333] sm:text-2xl">
          Product guides and documents
        </h2>

        <div className="flex flex-col gap-[8px]">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="
                flex flex-wrap items-center
                justify-between gap-[10px]
              "
            >
              <span className="min-w-0 flex-1 break-words text-[14px] text-[#333333] sm:text-[16px]">
                {doc.title}
              </span>

              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  shrink-0 rounded
                  border border-[#D5D9D9]
                  bg-[#F0F2F2]
                  px-[8px] py-[3px]
                  text-[13px] font-medium text-[#555555]
                  transition-colors duration-200
                  hover:bg-[#E3E6E6]
                "
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