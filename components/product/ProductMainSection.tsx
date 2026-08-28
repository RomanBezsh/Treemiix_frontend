import Image from "next/image";
import { useState, MouseEvent } from "react";
import { hyperXCloudAlphaImageSrcs } from "@/data/productGalleryData";
import Link from "next/link";


const ProductMainSection = () => {
    return (
        <div className="flex flex-row gap-5">
            <ProductGallery imageScrs={hyperXCloudAlphaImageSrcs} />
            <ProductInfo
                id="w"
                title={"Gaming Headset HyperX Cloud Alpha  "}
                storeName={"HyperX Store"}
                platform="PlayStation 4"
                rating={4}
                ratingsCount={9600}
                inStock
                price={99.99}
                installmentText="Pay $16.67/month for 6 months, interest-free upon approval for the Amazon Rewards Visa Card"
                primeDeliveryNote="Available at a lower price from other sellers that may not offer free Prime shipping."
                features={[
                    "HyperX Dual Chamber Drivers for more distinction and less distortion",
                    "Signature award winning HyperX comfort",
                    "Durable aluminum frame with expanded headband",
                    "Detachable braided cable with convenient in line audio control",
                    "Detachable noise cancellation microphone",
                    "Compatible with PC, PS4, PS4 Pro, Xbox One, Xbox One S, Mac, Mobile, Nintendo Switch, VR",
                ]}
            />
            <ProductBuyBox
                price={99.99}
                shippingPrice={47.21}
                shippingDestination="Ukraine"
                deliveryDateText="Thursday, February 17"
                orderWithinText="31 mins"
                locationText="Select delivery location"
                isSecureTransaction
            />
        </div>
    );
}


interface ProductGalleryProps {
    imageScrs: string[];
}

const ProductGallery = ({ imageScrs }: ProductGalleryProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const [zoomStyle, setZoomStyle] = useState({
        x: 0,
        y: 0,
        show: false,
    });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomStyle({ x, y, show: true });
    };

    const handleMouseLeave = () => {
        setZoomStyle((prev) => ({ ...prev, show: false }));
    };

    const activeImage = imageScrs[selectedImageIndex] || imageScrs[0];

    return (
        <div className="flex flex-row gap-9.25">
            <div className="flex flex-col gap-3.75">
                {imageScrs.map((src, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex items-center justify-center w-18.75 h-18.75 rounded-lg shadow-[0px_2px_4px_#00000033] bg-white overflow-hidden cursor-pointer transition-all ${selectedImageIndex === index ? "border-2 border-indigo-500" : ""
                            }`}
                    >
                        <Image
                            src={src}
                            width={75}
                            height={75}
                            alt={`product thumbnail ${index}`}
                            className="w-full h-full object-contain p-1"
                        />
                    </div>
                ))}
                {imageScrs.length > 4 && (
                    <div className="flex items-center justify-center w-18.75 h-18.75 rounded-lg shadow-[0px_2px_4px_#00000033] bg-[#FAFAFA] ">
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8.20075C20 9.35545 20 12.2422 18 13.3969L4.5 21.1911C2.5 22.3458 -1.09731e-06 20.9025 -9.96367e-07 18.5931L-3.14974e-07 3.00459C-2.14027e-07 0.695194 2.5 -0.748178 4.5 0.406522L18 8.20075Z" fill="#B3B3B3" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex w-126.75 h-131.25 justify-center items-center rounded-lg border-[#FFFFFF] shadow-[0px_2px_4px_#00000033] cursor-crosshair overflow-hidden"
                >
                    <div
                        className={`absolute top-0.5 right-0.5 w-45.25 h-45.25 border-3 border-[#D6D6D6] shadow-[0px_2px_4px_#00000033] rounded-lg overflow-hidden bg-white z-20 transition-opacity duration-200 pointer-events-none ${zoomStyle.show ? "opacity-100" : "opacity-40"
                            }`}
                    >

                        {zoomStyle.show && (
                            <div
                                className="w-full h-full bg-no-repeat"
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
                        alt="product photo"
                        className="object-contain"
                    />
                </div>

                <span className="text-lg text-[#333333] text-center">
                    Roll over image to zoom in
                </span>
            </div>


        </div>
    )
}



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
    features }: ProductInfoProps) => {

    return (
        <div>
            <h2 className="text-3xl text-[#333333] mb-2.5">{title}</h2>
            <div className="flex flex-col mb-7">
                <Link className=" text-[#496B94] " href={storeHref}>Visit the {storeName}</Link>
                <span className="text-sm "><strong>Platform</strong> : {platform}</span>
            </div>

            <div className="flex flex-row gap-1.5 self-start mb-7">
                {Array.from({ length: 5 }, (_, index) => {
                    const isFilled = index < rating;

                    return (
                        <img
                            key={index}
                            src={isFilled ? "/common/star_filled.svg" : "/common/star_empty.svg"}
                            alt={isFilled ? "Filled star" : "Empty star"}
                        />
                    );
                })}
                <Image
                    src="/catalog/chewron_down.svg"
                    width={19}
                    height={19}
                    alt="chewron"
                    className="filter-[brightness(0)_saturate(100%)_invert(55%)_sepia(0%)_saturate(0%)_hue-rotate(182deg)_brightness(94%)_contrast(91%)]"
                />
                <span className="text-[#496B94]">{ratingsCount.toLocaleString('en-US')} ratings</span>
            </div>

            <div className="border w-full border-[#EFEFEF] mb-7"></div>

            {inStock && (
                <span className="text-lg font-medium text-[#7C9BC0] mb-7">In Stock</span>
            )}

            <div className="flex flex-row gap-2.25 mb-7">
                <span className="text-[#828282] text-lg font-medium">
                    Price:
                </span>
                <span className="text-[#DE3A3A] text-4xl">
                    $ {price}
                </span>
            </div>
            <p>
                {installmentText}
            </p>
            <p className="mb-7">
                {primeDeliveryNote}
            </p>

            <div className="border w-full border-[#EFEFEF] mb-7"></div>

            <div className="flex flex-col">
                <h2 className="text-xl text-[#333333] font-medium ">About this item</h2>
                <ul className="list-disc pl-10 marker:text-[20px] text-base">
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};




interface ProductBuyBoxProps {
    price: number;                      // 99.99
    shippingPrice?: number;            // 47.21 (или 0, если бесплатная)
    shippingDestination?: string;       // "Ukraine"
    deliveryDateText?: string;          // "Thursday, February 17"
    orderWithinText?: string;           // "31 mins"
    locationText?: string;              // "Select delivery location"
    initialQuantity?: number;          // По умолчанию 1
    maxQuantity?: number;              // Ограничение по количеству (например, 10)
    onAddToCart?: (quantity: number) => void;
    onBuyNow?: (quantity: number) => void;
    isSecureTransaction?: boolean;     // true
}

const ProductBuyBox = ({
    price,
    shippingPrice,
    shippingDestination,
    deliveryDateText,
    orderWithinText,
    locationText,
    initialQuantity,
    maxQuantity,
    onAddToCart,
    onBuyNow,
    isSecureTransaction }: ProductBuyBoxProps) => {

    const [quantity, setQuantity] = useState<number>(1);


    return (
        <div className="flex flex-col w-90 h-163 rounded-[20px] shadow-[0px_2px_4px_ #00000033] border-2 border-[#EFEFEF] p-12.5">
            <span className="text-[#DE3A3A] text-4xl mb-7.5">$ {price}</span>
            <div className="flex flex-row  mb-5">
                <span className="w-58.5">${shippingPrice} Shipping & Import Fees Deposit to {shippingDestination} <Link className="text-[#496B94]" href="#">Details</Link></span>
                <Image
                    src="/catalog/chewron_down.svg"
                    width={26}
                    height={26}
                    alt="chewron"
                    className="-rotate-90 filter-[brightness(0)_saturate(100%)_invert(55%)_sepia(0%)_saturate(0%)_hue-rotate(182deg)_brightness(94%)_contrast(91%)]"
                />
            </div>
            <span className="w-58.5 mb-7.5">Delivery {deliveryDateText} Order within {orderWithinText}</span>
            <div className="flex items-center  gap-2.5 mb-7.5">
                <Image
                    src="/product/location.svg"
                    width={26}
                    height={26}
                    alt="location"
                />
                <span className="text-[#333333]">Select delivery location</span>
            </div>
            <div className="flex flex-row gap-18.5 mb-7.5">
                <span>Quantity</span>
                <div className="flex flex-row gap-3">
                    <button className="text-[#FFFFFF] w-6.5 h-6.5 rounded-4xl drop-shadow-[0px_2px_4px_ #00000033] bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)]">-</button>
                    <span>{quantity}</span>
                    <button className="text-[#FFFFFF] w-6.5 h-6.5 rounded-4xl drop-shadow-[0px_2px_4px_ #00000033] bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)]">+</button>
                </div>
            </div>
            <button className="w-62.25 h-11.5 text-lg rounded-[20px] bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)] shadow-[0px_2px_4px_0px_#00000033] mb-1.5">
                <div className="flex items-center justify-center w-61.75 h-11 bg-[#FFFFFF] rounded-[19px] mx-auto">
                    <span className="bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)] bg-clip-text text-transparent font-medium">
                        Buy Now
                    </span>
                </div>
            </button>
            <button className="w-62.25 h-11.5 text-lg rounded-[20px] text-[#FFFFFF] bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)] shadow-[0px_2px_4px_0px_#00000033] mb-7.5">
                Buy Now
            </button>
            {isSecureTransaction && (
                <div className="flex items-center  gap-2.5">
                    <Image
                        src="/product/lock.svg"
                        width={26}
                        height={26}
                        alt="lock"
                    />
                    <span className="text-[#333333]">Secure transaction</span>
                </div>
            )}
        </div>
    )

}




export default ProductMainSection


















