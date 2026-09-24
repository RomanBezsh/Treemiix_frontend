"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";

import RatingsDropdown from "./RatingsDropdown";

interface ProductMainSectionProps {
  product: any;
}

const ProductMainSection = ({
  product,
}: ProductMainSectionProps) => {
  const imagesList =
    product.galleries && product.galleries.length > 0
      ? product.galleries.map((g: any) => g.path)
      : product.images && product.images.length > 0
        ? product.images
        : [
            product.imageUrl ||
              "/account/lists/product-placeholder.png",
          ];

  let parsedFeatures: string[] = [];

  try {
    if (product.features) {
      parsedFeatures = JSON.parse(product.features);
    }
  } catch {
    parsedFeatures = product.features
      ? [product.features]
      : [];
  }

  if (
    parsedFeatures.length === 0 &&
    product.description
  ) {
    parsedFeatures = [product.description];
  }

  return (
    <section
      className="
        mb-[70px] grid w-full max-w-[1690px]
        grid-cols-1 gap-[30px]
        px-[16px]
        sm:px-[24px]
        lg:grid-cols-2
        lg:px-[40px]
        2xl:grid-cols-[minmax(0,610px)_minmax(0,1fr)_360px]
        2xl:items-start
        2xl:gap-[20px]
      "
    >
      {/* Gallery */}
      <div className="min-w-0">
        <ProductGallery imageScrs={imagesList} />
      </div>

      {/* Product info */}
      <div className="min-w-0">
        <ProductInfo
          id={product.id}
          title={product.name}
          storeName={
            product.seller?.storeName ||
            "Treemiix Official Store"
          }
          platform={product.binding || "N/A"}
          rating={product.rating || 4}
          ratingsCount={0}
          inStock={product.stock > 0}
          price={product.price}
          installmentText="Pay monthly or pay over time with Treemiix credit"
          features={parsedFeatures}
        />
      </div>

      {/* Buy box */}
      <div className="min-w-0 lg:col-span-2 2xl:col-span-1">
        <ProductBuyBox
          price={product.price}
          shippingPrice={0}
          shippingDestination="Ukraine"
          deliveryDateText="Tomorrow, Sep 18"
          orderWithinText="10 hrs 30 mins"
          isSecureTransaction={true}
        />
      </div>
    </section>
  );
};

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
}

const ImageModal = ({
  isOpen,
  onClose,
  images,
  initialIndex,
}: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] =
    useState(initialIndex);

  const [activeTab, setActiveTab] = useState<
    "Images" | "Videos"
  >("Images");

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-[rgba(5,5,5,0.18)]
        px-[12px] py-[20px]
        backdrop-blur-[2px]
      "
      onClick={onClose}
    >
      <div
        className="
          relative flex max-h-[92vh] w-full max-w-[1500px]
          flex-col overflow-y-auto
          rounded-[16px] bg-[#F8F8F8]
          p-[16px]
          shadow-[0_2px_15px_rgba(0,0,0,0.20)]
          sm:p-[24px]
          lg:rounded-[20px]
          lg:p-[40px]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image gallery"
          className="
            absolute right-[14px] top-[12px] z-20
            flex h-[36px] w-[36px]
            items-center justify-center
            rounded-full bg-white
            text-[24px] leading-none text-[#555555]
            shadow-[0_2px_6px_rgba(0,0,0,0.12)]
            transition-all duration-200
            hover:scale-105
            active:scale-95
          "
        >
          ×
        </button>

        {/* Tabs */}
        <div className="mb-[20px] flex gap-[22px] pr-[45px] sm:gap-[40px] lg:mb-[40px]">
          <button
            type="button"
            className={`cursor-pointer pb-[6px] text-[18px] sm:text-[20px] lg:text-2xl ${
              activeTab === "Videos"
                ? "border-b-4 border-[#FFA95A] text-[#333333]"
                : "text-[#828282]"
            }`}
            onClick={() => setActiveTab("Videos")}
          >
            Videos
          </button>

          <button
            type="button"
            className={`cursor-pointer pb-[6px] text-[18px] sm:text-[20px] lg:text-2xl ${
              activeTab === "Images"
                ? "border-b-4 border-[#FFA95A] text-[#333333]"
                : "text-[#828282]"
            }`}
            onClick={() => setActiveTab("Images")}
          >
            Images
          </button>
        </div>

        <div
          className="
            flex min-h-0 flex-1
            flex-col gap-[24px]
            lg:flex-row lg:gap-[40px]
          "
        >
          {/* Main image */}
          <div className="flex min-h-[260px] min-w-0 flex-1 items-center justify-center sm:min-h-[400px]">
            <Image
              src={images[currentIndex]}
              width={500}
              height={500}
              alt="Full product view"
              className="
                h-auto max-h-[55vh] w-auto max-w-full
                object-contain
              "
            />
          </div>

          {/* Information */}
          <div className="flex w-full flex-col gap-[20px] lg:w-[400px] lg:shrink-0">
            <h2 className="text-[20px] leading-[130%] text-[#333333] sm:text-[24px] lg:text-3xl">
              Gaming Headset HyperX Cloud Alpha
            </h2>

            <div className="grid grid-cols-4 gap-[8px] sm:grid-cols-5 sm:gap-[12px] lg:grid-cols-4 lg:gap-[16px]">
              {images.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                  className={`
                    aspect-square w-full
                    rounded-[10px] border-2 bg-white
                    p-[5px]
                    shadow-sm
                    transition-all duration-200
                    hover:-translate-y-[2px]
                    ${
                      currentIndex === index
                        ? "border-orange-500"
                        : "border-transparent"
                    }
                  `}
                >
                  <Image
                    src={src}
                    width={75}
                    height={75}
                    alt={`Product thumbnail ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductGallery = ({
  imageScrs,
}: {
  imageScrs: string[];
}) => {
  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [zoomStyle, setZoomStyle] = useState({
    x: 0,
    y: 0,
    show: false,
  });

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - left) / width) * 100;

    const y =
      ((event.clientY - top) / height) * 100;

    setZoomStyle({
      x,
      y,
      show: true,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle((current) => ({
      ...current,
      show: false,
    }));
  };

  const activeImage =
    imageScrs[selectedImageIndex] ||
    imageScrs[0] ||
    "/account/lists/product-placeholder.png";

  return (
    <div className="flex w-full flex-col gap-[16px] sm:flex-row sm:gap-[20px] xl:gap-[37px]">
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={imageScrs}
        initialIndex={selectedImageIndex}
      />

      {/* Thumbnails */}
      <div
        className="
          order-2 flex w-full gap-[10px]
          overflow-x-auto pb-[4px]
          sm:order-1
          sm:w-auto
          sm:flex-col
          sm:overflow-visible
          sm:pb-0
        "
      >
        {imageScrs.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              setSelectedImageIndex(index)
            }
            className={`
              flex h-[62px] w-[62px] shrink-0
              items-center justify-center
              overflow-hidden rounded-lg bg-white
              shadow-[0_2px_4px_#00000033]
              transition-all duration-200
              hover:-translate-y-[2px]
              sm:h-[75px] sm:w-[75px]
              ${
                selectedImageIndex === index
                  ? "border-2 border-indigo-500"
                  : "border-2 border-transparent"
              }
            `}
          >
            <Image
              src={src}
              width={75}
              height={75}
              alt={`Product thumbnail ${index + 1}`}
              className="h-full w-full object-contain p-1"
            />
          </button>
        ))}

        {imageScrs.length > 4 && (
          <div
            className="
              flex h-[62px] w-[62px] shrink-0
              items-center justify-center
              rounded-lg bg-[#FAFAFA]
              shadow-[0_2px_4px_#00000033]
              sm:h-[75px] sm:w-[75px]
            "
          >
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8.20075C20 9.35545 20 12.2422 18 13.3969L4.5 21.1911C2.5 22.3458 -1.09731e-06 20.9025 -9.96367e-07 18.5931L-3.14974e-07 3.00459C-2.14027e-07 0.695194 2.5 -0.748178 4.5 0.406522L18 8.20075Z"
                fill="#B3B3B3"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Main image */}
      <div className="order-1 flex min-w-0 flex-1 flex-col gap-[12px] sm:order-2 sm:gap-[20px]">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsModalOpen(true)}
          className="
            relative flex aspect-square w-full
            max-w-[507px]
            cursor-zoom-in
            items-center justify-center
            overflow-hidden rounded-lg
            bg-white
            shadow-[0_2px_4px_#00000033]
          "
        >
          {/* Zoom preview */}
          <div
            className={`
              pointer-events-none absolute right-[2px] top-[2px] z-20
              hidden h-[181px] w-[181px]
              overflow-hidden rounded-lg
              border-[3px] border-[#D6D6D6]
              bg-white
              shadow-[0_2px_4px_#00000033]
              transition-opacity duration-200
              lg:block
              ${
                zoomStyle.show
                  ? "opacity-100"
                  : "opacity-40"
              }
            `}
          >
            {zoomStyle.show && (
              <div
                className="h-full w-full bg-no-repeat"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundSize: "250%",
                  backgroundPosition: `${zoomStyle.x}% ${zoomStyle.y}%`,
                }}
              />
            )}
          </div>

          <Image
            src={activeImage}
            width={476}
            height={480}
            alt="Product photo"
            className="
              h-auto max-h-[90%] w-auto max-w-[90%]
              object-contain
            "
          />
        </div>

        <span className="text-center text-[13px] text-[#333333] sm:text-[15px] lg:text-lg">
          <span className="lg:hidden">
            Tap image to view
          </span>

          <span className="hidden lg:inline">
            Roll over image to zoom in
          </span>
        </span>
      </div>
    </div>
  );
};

interface ProductInfoProps {
  id: string;
  title: string;
  storeName: string;
  storeHref?: string;
  platform?: string;
  rating: number;
  ratingsCount: number;
  inStock: boolean;
  price: number;
  originalPrice?: number;
  installmentText?: string;
  primeDeliveryNote?: string;
  features: string[];
}

const ProductInfo = ({
  title,
  storeHref = "#",
  storeName,
  platform,
  rating,
  ratingsCount,
  inStock,
  price,
  installmentText,
  primeDeliveryNote,
  features,
}: ProductInfoProps) => {
  const [isRatingsOpen, setIsRatingsOpen] =
    useState(false);

  return (
    <div className="w-full min-w-0">
      <h1
        className="
          mb-[10px]
          break-words
          text-[24px] leading-[125%] text-[#333333]
          sm:text-[28px]
          lg:text-3xl
        "
      >
        {title}
      </h1>

      <div className="mb-[20px] flex flex-col sm:mb-[28px]">
        <Link
          className="w-fit text-[14px] text-[#496B94] hover:underline sm:text-[16px]"
          href={storeHref}
        >
          Visit the {storeName}
        </Link>

        <span className="mt-[3px] text-[13px] sm:text-sm">
          <strong>Platform</strong>: {platform}
        </span>
      </div>

      {/* Rating */}
      <div className="mb-[20px] flex flex-wrap items-center gap-x-[8px] gap-y-[6px] sm:mb-[28px]">
        <div
          className="relative flex cursor-pointer items-center gap-[5px]"
          onMouseEnter={() =>
            setIsRatingsOpen(true)
          }
          onMouseLeave={() =>
            setIsRatingsOpen(false)
          }
        >
          <div className="flex items-center gap-[4px]">
            {Array.from(
              { length: 5 },
              (_, index) => {
                const isFilled =
                  index < rating;

                return (
                  <Image
                    key={index}
                    src={
                      isFilled
                        ? "/common/star_filled.svg"
                        : "/common/star_empty.svg"
                    }
                    width={19}
                    height={19}
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

          <RatingsDropdown
            rating={rating}
            ratingsCount={ratingsCount}
            isOpen={isRatingsOpen}
          />
        </div>

        <span className="text-[13px] text-[#496B94] sm:text-[16px]">
          {ratingsCount.toLocaleString("en-US")} ratings
        </span>
      </div>

      <div className="mb-[20px] w-full border-t border-[#EFEFEF] sm:mb-[28px]" />

      {inStock && (
        <p className="mb-[18px] text-[16px] font-medium text-[#7C9BC0] sm:mb-[28px] sm:text-lg">
          In Stock
        </p>
      )}

      {/* Price */}
      <div className="mb-[18px] flex flex-wrap items-baseline gap-[8px] sm:mb-[28px]">
        <span className="text-[16px] font-medium text-[#828282] sm:text-lg">
          Price:
        </span>

        <span className="text-[30px] leading-none text-[#DE3A3A] sm:text-4xl">
          $ {price}
        </span>
      </div>

      <p className="text-[14px] leading-[150%] text-[#333333] sm:text-[16px]">
        {installmentText}
      </p>

      {primeDeliveryNote && (
        <p className="mb-[20px] mt-[6px] text-[14px] sm:mb-[28px] sm:text-[16px]">
          {primeDeliveryNote}
        </p>
      )}

      <div className="mb-[20px] mt-[20px] w-full border-t border-[#EFEFEF] sm:mb-[28px]" />

      {/* Features */}
      <div className="flex flex-col">
        <h2 className="mb-[8px] text-[18px] font-medium text-[#333333] sm:text-xl">
          About this item
        </h2>

        <ul className="list-disc space-y-[5px] pl-[22px] text-[14px] leading-[150%] marker:text-[16px] sm:pl-[30px] sm:text-base sm:marker:text-[20px]">
          {features.map((feature, index) => (
            <li key={index} className="break-words">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ProductBuyBoxProps {
  price: number;
  shippingPrice?: number;
  shippingDestination?: string;
  deliveryDateText?: string;
  orderWithinText?: string;
  locationText?: string;
  initialQuantity?: number;
  maxQuantity?: number;
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: (quantity: number) => void;
  isSecureTransaction?: boolean;
}

const ProductBuyBox = ({
  price,
  shippingPrice,
  shippingDestination,
  deliveryDateText,
  orderWithinText,
  isSecureTransaction,
}: ProductBuyBoxProps) => {
  const [quantity] = useState<number>(1);

  return (
    <div
      className="
        flex h-auto w-full flex-col
        rounded-[20px]
        border-2 border-[#EFEFEF]
        p-[20px]
        shadow-[0_2px_4px_#00000033]
        sm:p-[28px]
        lg:p-[34px]
        2xl:max-w-[360px]
        2xl:p-[40px]
      "
    >
      <span className="mb-[22px] text-[30px] text-[#DE3A3A] sm:text-4xl">
        $ {price}
      </span>

      {/* Shipping */}
      <div className="mb-[20px] flex items-start justify-between gap-[10px]">
        <span className="min-w-0 text-[14px] leading-[145%] sm:text-[16px]">
          ${shippingPrice} Shipping &amp; Import Fees
          Deposit to {shippingDestination}{" "}
          <Link
            className="text-[#496B94] hover:underline"
            href="#"
          >
            Details
          </Link>
        </span>

        <Image
          src="/catalog/chewron_down.svg"
          width={24}
          height={24}
          alt=""
          aria-hidden="true"
          className="shrink-0 -rotate-90 filter-[brightness(0)_saturate(100%)_invert(55%)_sepia(0%)_saturate(0%)_hue-rotate(182deg)_brightness(94%)_contrast(91%)]"
        />
      </div>

      {/* Delivery */}
      <span className="mb-[24px] text-[14px] leading-[145%] sm:text-[16px]">
        Delivery {deliveryDateText}. Order within{" "}
        {orderWithinText}
      </span>

      {/* Location */}
      <div className="mb-[24px] flex items-center gap-[10px]">
        <Image
          src="/product/location.svg"
          width={24}
          height={24}
          alt=""
          aria-hidden="true"
          className="shrink-0"
        />

        <span className="text-[14px] text-[#333333] sm:text-[16px]">
          Select delivery location
        </span>
      </div>

      {/* Quantity */}
      <div className="mb-[24px] flex items-center justify-between gap-[20px]">
        <span className="text-[15px] sm:text-[16px]">
          Quantity
        </span>

        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="
              flex h-[28px] w-[28px]
              items-center justify-center
              rounded-full
              bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)]
              text-white
              drop-shadow-[0_2px_4px_#00000033]
              transition-transform duration-200
              hover:scale-105
              active:scale-90
            "
          >
            −
          </button>

          <span className="min-w-[20px] text-center">
            {quantity}
          </span>

          <button
            type="button"
            aria-label="Increase quantity"
            className="
              flex h-[28px] w-[28px]
              items-center justify-center
              rounded-full
              bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)]
              text-white
              drop-shadow-[0_2px_4px_#00000033]
              transition-transform duration-200
              hover:scale-105
              active:scale-90
            "
          >
            +
          </button>
        </div>
      </div>

      {/* First action */}
      <button
        type="button"
        className="
          mb-[6px] min-h-[46px] w-full
          rounded-[20px]
          bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)]
          p-[2px]
          text-[16px]
          shadow-[0_2px_4px_#00000033]
          transition-all duration-200
          hover:-translate-y-[2px]
          hover:shadow-[0_6px_14px_rgba(255,130,90,0.18)]
          active:translate-y-0
          active:scale-[0.98]
          sm:text-lg
        "
      >
        <div className="flex min-h-[42px] w-full items-center justify-center rounded-[18px] bg-white px-[12px]">
          <span className="bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)] bg-clip-text font-medium text-transparent">
            Buy Now
          </span>
        </div>
      </button>

      {/* Second action */}
      <button
        type="button"
        className="
          mb-[24px] min-h-[46px] w-full
          rounded-[20px]
          bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)]
          px-[12px]
          text-[16px] text-white
          shadow-[0_2px_4px_#00000033]
          transition-all duration-200
          hover:-translate-y-[2px]
          hover:shadow-[0_6px_14px_rgba(255,130,90,0.22)]
          active:translate-y-0
          active:scale-[0.98]
          sm:text-lg
        "
      >
        Buy Now
      </button>

      {isSecureTransaction && (
        <div className="flex items-center gap-[10px]">
          <Image
            src="/product/lock.svg"
            width={24}
            height={24}
            alt=""
            aria-hidden="true"
            className="shrink-0"
          />

          <span className="text-[14px] text-[#333333] sm:text-[16px]">
            Secure transaction
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductMainSection;