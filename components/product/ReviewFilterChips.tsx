const ReviewFilterChips = () => {
    return (
        <div className="flex flex-col w-[1690] mb-37">
            <h2 className="text-[#333333] font-semibold text-2xl mb-11.75 w-[1690px]">
                Read reviews that mention
            </h2>

            <div className="flex gap-8">
                <Chip text="Good" />
                <Chip text="Good" />
            </div>
        </div>
    )
}


interface ChipProps {
    text: string
}

const Chip = ({text}: ChipProps) => {
    return (
        <button className="px-4 h-10.5 rounded-[20px] shadow-[0_2px_4px_#00000033] bg-[#7C9BC0] text-[#F8F8F8] text-lg font-medium self-start">
            {text}
        </button>
    )
}


export default ReviewFilterChips;