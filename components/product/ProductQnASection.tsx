import Image from "next/image";


const ProductQnASection = () => {
    return (
        <div>
            <div className="flex flex-col w-[1880px]">
                <h2 className="text-[#333333] font-semibold text-2xl mb-16.75 w-[1690px]">
                    Customer questions & answers
                </h2>

                <div className="relative flex flex-row -pl-4">
                    <Image
                        className="absolute left-6 top-1/2 -translate-y-1/2"
                        src={"/product/loupe.svg"}
                        width={24}
                        height={23}
                        alt={"loupe"}
                    />

                    <input type="text" className="pl-[63px] w-[930px] text-lg h-[44px] bg-[#F8F8F8] rounded-[26px]" placeholder="Type your question or keyword" />
                </div>

                <div>
                    <QnACard />
                </div>
            </div>
        </div>
    );
}



interface QnACardProps {

}


const QnACard = () => {
    return (
        <div className="flex flex-row gap-5">
            <div className="flex flex-col items-center w-8.5" >
                <button><svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i_1349_26995)">
                        <path d="M11.5297 0.999998C12.2995 -0.333335 14.224 -0.333333 14.9938 1L26.2521 20.5C27.0219 21.8333 26.0596 23.5 24.52 23.5H2.00339C0.463786 23.5 -0.498463 21.8333 0.271338 20.5L11.5297 0.999998Z" fill="#F8F8F8" />
                    </g>
                    <defs>
                        <filter id="filter0_i_1349_26995" x="-4" y="0" width="30.5234" height="27.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-4" dy="4" />
                            <feGaussianBlur stdDeviation="3" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1349_26995" />
                        </filter>
                    </defs>
                </svg>
                </button>
                <span className="text-4xl font-light text-[#333333]">
                    {18}
                </span>
                <span className="text-lg text-[#333333]">
                    votes
                </span>
                <button><svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i_1349_26997)">
                        <path d="M14.9938 22.5C14.224 23.8333 12.2995 23.8333 11.5297 22.5L0.271339 3C-0.498461 1.66666 0.463791 -2.60502e-06 2.00339 -2.47042e-06L24.5201 -5.01952e-07C26.0597 -3.67356e-07 27.0219 1.66667 26.2521 3L14.9938 22.5Z" fill="#F8F8F8" />
                    </g>
                    <defs>
                        <filter id="filter0_i_1349_26997" x="-4" y="0" width="30.5234" height="27.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-4" dy="4" />
                            <feGaussianBlur stdDeviation="3" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1349_26997" />
                        </filter>
                    </defs>
                </svg>

                </button>
            </div>


            <div className="flex flex-col gap-8">
                <div className="flex flex-row items-start gap-4.5">
                    <div className="flex flex-row items-center">
                        <span className="text-lg text-[#333333] font-medium">
                            Question:
                        </span>

                    </div>

                    <div className="flex flex-col">
                        <p>Is this headset only stereo?</p>
                        <div className="flex flex-row gap-2.5 items-center">
                            <span className="text-[#E9852A] text-sm bg-[#F8F8F8] shadow-[0_2px_4px_#00000033] rounded-[20px] px-4 py-1  h-7 w-26.75 max-w-31.25">AAAA</span>
                            <span className="text-sm text-[#828282]">on August 30, 2017</span>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="flex flex-row gap-7.25">
                        <span className="text-lg text-[#333333] font-medium">
                            Answer:
                        </span>
                        <div className="">
                            <p>Hey ImJustMagik,
                                Yes, the Cloud Alpha is stereo, but I highly recommend that you try pairing the USB Dolby 7.1 Adapter (from: http://hyperx.gg/cloudaccessories) with it for USB connectivity and Virtual Surround Sound for an amazing audio experience. Thank you!
                                - Chris @HyperX</p>
                            <div className="flex flex-row gap-2.5 items-center">
                                <span className="text-[#E9852A] text-sm bg-[#F8F8F8] shadow-[0_2px_4px_#00000033] rounded-[20px] px-4 py-1  h-7 w-26.75 max-w-31.25">AAAA</span>
                                <span className="text-sm text-[#828282]">on August 30, 2017</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}



export default ProductQnASection;