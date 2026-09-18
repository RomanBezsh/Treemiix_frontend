import Image from "next/image";

interface Review {
    id: string | number;
    userName: string;
    date: string;
    rating: number;
    title: string;
    isVerifiedPurchase: boolean;
    imageUrl?: string;
    comment: string;
}

interface ReviewCardProps {
    review: Review;
}

const ProductReviewsSection = () => {
    const mockReview: Review = {
        id: 1,
        userName: "AAAA",
        date: "August 30, 2017",
        rating: 5,
        title: "Definitely WORTH IT!!!",
        isVerifiedPurchase: true,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        comment: " Great product! Highly recommended."
    };

    return (
        <div className="flex flex-col w-[1690px] mb-37">
            <div className="flex flex-row mb-11.75 w-[1690px]">
                <h2 className="text-[#333333] font-semibold text-2xl mr-7.25">
                    Top reviews from the United States
                </h2>

                <button className="text-[#7C9BC0] text-sm bg-[#F8F8F8] shadow-[0_2px_4px_#00000033] rounded-[20px] px-4 h-7 w-26.75 max-w-31.25 mr-4">
                    Top reviews
                </button>
                <button className="text-[#B3B3B3] text-sm bg-[#F8F8F8] shadow-[0_2px_4px_#00000033] rounded-[20px] px-4 h-7 w-26.75 max-w-31.25">
                    Most recent
                </button>
            </div>

            <div className="flex flex-col items-center gap-11.75">
                <ReviewCard review={mockReview} />
            </div>
        </div>
    );
};

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row ">
                <div className="flex flex-row gap-2.5 items-center">
                    <div className="flex justify-center items-center w-12.5 h-12.5 p-[3px] rounded-full bg-[linear-gradient(144.29deg,#5ACEFF_-0.18%,#FF9F5A_101.85%)]">
                        <div className="flex justify-center items-center w-full h-full bg-white border border-[#F8F8F8] rounded-full">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_5124_13703)">
                                    <path d="M13.5238 11.5238C16.1548 11.5238 18.2857 9.39286 18.2857 6.7619C18.2857 4.13095 16.1548 2 13.5238 2C10.8929 2 8.7619 4.13095 8.7619 6.7619C8.7619 9.39286 10.8929 11.5238 13.5238 11.5238ZM13.5238 13.9048C10.3452 13.9048 4 15.5 4 18.6667V21.0476H23.0476V18.6667C23.0476 15.5 16.7024 13.9048 13.5238 13.9048Z" fill="#828282" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_5124_13703" x="0" y="0" width="27.0469" height="27.0469" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5124_13703" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5124_13703" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <span className="text-[#E9852A] text-sm bg-[#F8F8F8] shadow-[0_2px_4px_#00000033] rounded-[20px] px-4 py-1 h-7 w-26.75 max-w-31.25">
                        {review.userName}
                    </span>
                    <span className="text-sm text-[#828282]">on {review.date}</span>
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <div className="flex flex-row gap-1.25 self-start items-center">
                    {Array.from({ length: 5 }, (_, index) => {
                        const isFilled = index < review.rating;

                        return (
                            <img
                                key={index}
                                src={isFilled ? "/common/star_filled.svg" : "/common/star_empty.svg"}
                                alt={isFilled ? "Filled star" : "Empty star"}
                            />
                        );
                    })}
                </div>
                <h2 className="text-lg">{review.title}</h2>
            </div>
            {review.isVerifiedPurchase && <span>Verified Purchase</span>}
            <div className="flex flex-row">
                {review.imageUrl && (
                    <Image
                        className="rounded-[20px]"
                        src={review.imageUrl}
                        width={550}
                        height={550}
                        alt={review.title}
                    />
                )}
                <p>{review.comment}</p>
            </div>
            <span>953 people found this helpful</span>
            <div className="flex flex-row gap-5">
                <button className="text-[#FFFFFF] text-lg font-medium px-7 py-2.5 bg-[#7C9BC0] shadow-[0_2px_4px_#00000033] rounded-full">Helpful</button>
                <button className="bg-white text-[#7C9BC0] border-3 border-[#7C9BC0] rounded-full px-6 py-2 text-lg">
                    Report abuse
                </button>
            </div>
        </div>
    );
};

export default ProductReviewsSection;