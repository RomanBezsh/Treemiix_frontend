import Image from "next/image";
import { useState, MouseEvent } from "react";
import Link from "next/link";
import RatingsDropdown from "./RatingsDropdown";


interface ProductMainSectionProps {
    product: any; // Using 'any' for now, should be typed properly based on API response
}

const ProductMainSection = ({ product }: ProductMainSectionProps) => {
    const imagesList = product.galleries && product.galleries.length > 0 
        ? product.galleries.map((g: any) => g.path) 
        : (product.images && product.images.length > 0 
            ? product.images 
            : [product.imageUrl || ""]);
        
    let parsedFeatures: string[] = [];
    try {
        if (product.features) {
            parsedFeatures = JSON.parse(product.features);
        }
    } catch (e) {
        parsedFeatures = product.features ? [product.features] : [];
    }
    if (parsedFeatures.length === 0 && product.description) {
        parsedFeatures = [product.description];
    }

    return (
        <div className="flex flex-row gap-5">
            <ProductGallery imageScrs={imagesList} />
            <ProductInfo
                id={product.id}
                title={product.name}
                storeName={product.seller?.storeName || "Treemiix Official Store"}
                platform={product.binding || "N/A"}
                rating={product.rating || 4}
                ratingsCount={0}
                inStock={product.stock > 0}
                price={product.price}
                installmentText="Pay monthly or pay over time with Treemiix credit"
                features={parsedFeatures}
            />
            <ProductBuyBox
                price={product.price}
                shippingPrice={0}
                shippingDestination="Ukraine"
                deliveryDateText="Tomorrow, Sep 18"
                orderWithinText="10 hrs 30 mins"
                isSecureTransaction={true}
            />
        </div>
    );
}


interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    initialIndex: number;
}

    const ImageModal = ({ isOpen, onClose, images, initialIndex }: ImageModalProps) => {
        const [currentIndex, setCurrentIndex] = useState(initialIndex);
        const [activeTab, setActiveTab] = useState<'Images' | 'Videos'>('Images');
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,5,5,0.1)] backdrop-blur-[1px]" onClick={onClose}>
                <div className="relative w-[1500px] h-[700px] bg-[#F8F8F8] rounded-[20px] shadow-[0px_2px_4px_rgba(0,0,0,0.2)] flex flex-col p-10" onClick={(e) => e.stopPropagation()}>
                    {/* Top Row (Videos/Images Tabs) */}
                    <div className="flex flex-row gap-10 mb-10">
                        <button 
                            className={`text-2xl pb-2 cursor-pointer ${activeTab === 'Videos' ? 'text-[#333333] border-b-4 border-[#FFA95A]' : 'text-[#828282]'}`}
                            onClick={() => setActiveTab('Videos')}
                        >
                            Videos
                        </button>
                        <button 
                            className={`text-2xl pb-2 cursor-pointer ${activeTab === 'Images' ? 'text-[#333333] border-b-4 border-[#FFA95A]' : 'text-[#828282]'}`}
                            onClick={() => setActiveTab('Images')}
                        >
                            Images
                        </button>
                    </div>

                    <div className="flex flex-row flex-1 gap-10">
                        {/* Main Image Area */}
                        <div className="flex-1 flex items-center justify-center">
                            <Image src={images[currentIndex]} width={500} height={500} alt="full view" className="object-contain" />
                        </div>

                        {/* Right Info & Thumbnails */}
                        <div className="w-[400px] flex flex-col gap-5">
                            <h2 className="text-3xl text-[#333333]">Gaming Headset HyperX Cloud Alpha</h2>
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((src, idx) => (
                                    <div key={idx} className={`w-[75px] h-[75px] bg-white rounded-[10px] shadow-sm flex items-center justify-center cursor-pointer border-2 ${currentIndex === idx ? "border-orange-500" : "border-transparent"}`} onClick={() => setCurrentIndex(idx)}>
                                        <Image src={src} width={50} height={50} alt="thumb" className="object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


// ... inside ProductMainSection component ...
const ProductGallery = ({ imageScrs }: { imageScrs: string[] }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
// ...

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
            <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} images={imageScrs} initialIndex={selectedImageIndex} />
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
                    onClick={() => setIsModalOpen(true)}
                    className="relative flex w-126.75 h-131.25 justify-center items-center rounded-lg border-[#FFFFFF] shadow-[0px_2px_4px_#00000033] cursor-zoom-in overflow-hidden"
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

    const [isRatingsOpen, setIsRatingsOpen] = useState(false);

    return (
        <div>
            <h2 className="text-3xl text-[#333333] mb-2.5">{title}</h2>
            <div className="flex flex-col mb-7">
                <Link className=" text-[#496B94] " href={storeHref}>Visit the {storeName}</Link>
                <span className="text-sm "><strong>Platform</strong> : {platform}</span>
            </div>

            <div className="flex flex-row gap-1.5 self-start mb-7">
                <div 
                    className="relative flex flex-row gap-1.5 items-center cursor-pointer"
                    onMouseEnter={() => setIsRatingsOpen(true)}
                    onMouseLeave={() => setIsRatingsOpen(false)}
                >
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
                    
                    <RatingsDropdown 
                        rating={rating} 
                        ratingsCount={ratingsCount} 
                        isOpen={isRatingsOpen} 
                    />
                </div>
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


















