"use client";

import Image from "next/image";
import { useState } from "react";

export enum OptionType {
    radio,
    checkBox,
    color,
    price,
    rating
}

interface FilterOption {
    id: string;
    title: string;
}

interface SelectProps {
    title?: string;
    type?: OptionType;
    options?: FilterOption[];
    from?: number;
    to?: number;
}

const Select = ({ title, type = OptionType.radio, options = [] }: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);


    const TITLE_MAP: Partial<Record<OptionType, string>> = {
        [OptionType.price]: "Price",
        [OptionType.rating]: "Avg. Customer Review",
    };

    return (
        <div className="border-t-2 border-t-[#EFEFEF] w-61 pt-4.5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex flex-row items-center justify-between"
            >
                <h2 className="bg-linear-to-r from-[#7E8CBD] to-[#CE9AD7] bg-clip-text font-['Roboto'] text-[18px] font-medium leading-[130%] text-transparent">{TITLE_MAP[type] ?? title}</h2>

                <Image
                    src="/catalog/chewron_down.svg"
                    width={19}
                    height={19}
                    alt="chewron"
                    className="filter-[brightness(0)_saturate(100%)_invert(55%)_sepia(0%)_saturate(0%)_hue-rotate(182deg)_brightness(94%)_contrast(91%)]"
                />
            </button>

            {isOpen && type === OptionType.radio && (
                <div>
                    {options.map((option) => (
                        <Radio
                            key={option.id}
                            title={option.title}
                            isTarget={selectedId === option.id}
                            onClick={() => setSelectedId(option.id)}
                        />
                    ))}
                </div>
            )}
            {isOpen && type === OptionType.checkBox && (
                <div className="flex flex-col gap-2">
                    {options.map((option) => (
                        <Checkbox
                            key={option.id}
                            label={option.title}
                            onChange={(checked) => console.log(option.title, checked)}
                        />
                    ))}
                </div>
            )}
            {isOpen && type === OptionType.rating && (
                <Rating />
            )}
            {isOpen && type === OptionType.price && (
                <PriceRange minLimit={0} maxLimit={1000} />
            )}
        </div>
    );
};

interface RadioProps {
    title: string;
    onClick: () => void;
    isTarget: boolean;
}

const Radio = ({ title, onClick, isTarget }: RadioProps) => {
    return (
        <span
            onClick={onClick}
            className={`block cursor-pointer text-sm ${isTarget ? "text-[#7C9BC0] font-medium" : "text-[#333333]"}`}
        >
            {title}
        </span>
    );
};
const CheckedIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_887_15874)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 0C2.68629 0 0 2.68629 0 6V12C0 15.3137 2.68629 18 6 18H12C15.3137 18 18 15.3137 18 12V6C18 2.68629 15.3137 0 12 0H6ZM15.2639 6.76281C15.6852 6.4057 15.7372 5.77467 15.3801 5.35338C15.023 4.93209 14.392 4.88007 13.9707 5.23719L7.53909 10.6891L4.64662 8.23719C4.22533 7.88007 3.5943 7.93209 3.23719 8.35338C2.88007 8.77467 2.93209 9.4057 3.35338 9.76281L6.89248 12.7628L7.53909 13.3109L8.18571 12.7628L15.2639 6.76281Z"
                fill="url(#paint0_linear_887_15874)"
            />
        </g>
        <defs>
            <filter id="filter0_i_887_15874" x="-4" y="0" width="22" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="-4" dy="4" />
                <feGaussianBlur stdDeviation="3" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_887_15874" />
            </filter>
            <linearGradient id="paint0_linear_887_15874" x1="6.2243" y1="6.2484" x2="21.7087" y2="11.1385" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7E8CBD" />
                <stop offset="1" stopColor="#CE9AD7" />
            </linearGradient>
        </defs>
    </svg>
);

const UncheckedIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="16" height="16" rx="5" stroke="url(#paint0_linear_887_15884)" strokeWidth="2" />
        <defs>
            <linearGradient id="paint0_linear_887_15884" x1="6.2243" y1="6.2484" x2="21.7087" y2="11.1385" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7E8CBD" />
                <stop offset="1" stopColor="#CE9AD7" />
            </linearGradient>
        </defs>
    </svg>
);

interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox = ({ label, checked = false, onChange }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextState = e.target.checked;
        setIsChecked(nextState);
        if (onChange) onChange(nextState);
    };

    return (
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-[#333333]">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="hidden"
            />

            <span className="shrink-0">
                {isChecked ? <CheckedIcon /> : <UncheckedIcon />}
            </span>

            <span>{label}</span>
        </label>
    );
};






const Rating = () => {
    const [stars, setStarts] = useState<number>(5);

    return (
        <div className="flex flex-row gap-1.5 items-center">
            {Array.from({ length: 5 }, (_, index) => {
                return (
                    <img
                        key={index}
                        onClick={() => setStarts(index)}
                        src={(index <= stars) ? "/common/star_filled.svg" : "/common/star_empty.svg"}
                        alt={(index <= stars) ? "Filled star" : "Empty star"}
                    />
                );
            })}
            <span className="text-sm text-[#828282]">& Up</span>
        </div>
    );
}





interface PriceRangeProps {
    minLimit?: number;
    maxLimit?: number;
    onApply?: (min: number, max: number) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({
    minLimit = 0,
    maxLimit = 59999,
    onApply,
}) => {
    const [minValue, setMinValue] = useState<number>(minLimit);
    const [maxValue, setMaxValue] = useState<number>(maxLimit);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxValue);
        setMinValue(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minValue);
        setMaxValue(value);
    };

    const handleApply = () => {
        if (onApply) onApply(minValue, maxValue);
    };

    const minPercent = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
    const maxPercent = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;

    return (
        <div className="flex w-57.5 flex-col gap-4.5 pt-3">
            <div className="flex flex-row items-center gap-1.75">
                <div className="flex h-6.5 w-17.5 items-center justify-center rounded-[31px] bg-[#D6D6D6]/20 shadow-[inset_-4px_4px_6px_rgba(0,0,0,0.2)]">
                    <input
                        type="number"
                        value={minValue}
                        onChange={handleMinChange}
                        className="w-full bg-transparent text-center font-['Roboto'] text-[14px] font-normal leading-[130%] text-[#828282] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </div>

                <div className="h-0 w-1.5 border border-[#D6D6D6]" />

                <div className="flex h-6.5 w-17.5 items-center justify-center rounded-[31px] bg-[#D6D6D6]/20 shadow-[inset_-4px_4px_6px_rgba(0,0,0,0.2)]">
                    <input
                        type="number"
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="w-full bg-transparent text-center font-['Roboto'] text-[14px] font-normal leading-[130%] text-[#828282] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleApply}
                    className="h-6.5 w-12.5 rounded-[31px] bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)] font-['Roboto'] text-[14px] font-medium leading-[130%] text-white shadow-[0px_2px_4px_rgba(0,0,0,0.2)] transition-transform active:scale-95"
                >
                    GO
                </button>
            </div>

            <div className="relative flex h-4.5 w-full items-center">
                <div className="h-1 w-full rounded-full bg-[#D6D6D6]" />

                <div
                    className="absolute h-1 rounded-full bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)]"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                />

                <input
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    value={minValue}
                    onChange={handleMinChange}
                    className="thumb-style pointer-events-none absolute h-full w-full appearance-none bg-transparent"
                />

                <input
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="thumb-style pointer-events-none absolute h-full w-full appearance-none bg-transparent"
                />
            </div>
        </div>
    );
};




const Filter = () => {
    const categories = [
        { id: "1", title: "Activity Centers" },
        { id: "2", title: "Baby Gyms & Playmats" },
    ];

    const brands = [
        { id: "b1", title: "Splashin'kids" },
        { id: "b2", title: "GRACO" },
        { id: "b3", title: "Fisher-Price" },
    ];

    return (
        <div className="flex flex-col gap-4">
            <Select
                title="Department"
                type={OptionType.radio}
                options={categories}
            />

            <Select
                title="Featured Brands"
                type={OptionType.checkBox}
                options={brands}
            />

            <Select type={OptionType.rating} />
            <Select type={OptionType.price} />
        </div>
    );
};
export default Filter;