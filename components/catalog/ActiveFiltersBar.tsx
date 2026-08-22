import SortSelect from "./SortSelect";


interface ActiveFiltersBarProps {
  selected: number;
  chips?: Chip[];
}

interface Chip {
  label: string;
  onRemove: () => void;
}

const FilterChip = ({ label, onRemove }: Chip) => (
  <button
    onClick={onRemove}
    className="rounded-[50px] bg-[linear-gradient(107.53deg,#7E8CBD_34.61%,#CE9AD7_106.51%)] p-0.75"
  >
    <div className="flex items-center gap-1.5 rounded-[50px] bg-white px-3 py-1">
      <span className="bg-[linear-gradient(107.53deg,#7E8CBD_34.61%,#CE9AD7_106.51%)] bg-clip-text text-transparent text-sm font-medium">
        {label}
      </span>
      <span className="bg-[linear-gradient(107.53deg,#7E8CBD_34.61%,#CE9AD7_106.51%)] bg-clip-text text-transparent text-xs font-bold">
        ✕
      </span>
    </div>
  </button>
);


const ActiveFiltersBar = ({ selected, chips }: ActiveFiltersBarProps) => {
  return (
    <div className="flex items-center">
      <span className="text-[#333333] text-2xl">
        {selected} <span className="text-[#2D2D2D] text-sm">Item selected</span>
      </span>
      <button className="bg-[#B3B3B3] px-6 py-1  rounded-full shadow-[0px_2px_4px_0px_#00000033] ">
        <span className="text-[18px] text-[#FFFFFF] drop-shadow-[0px_2px_4px_0px_#00000033]">Reset</span>
      </button>
      {chips?.map((chip, index) => (
        <FilterChip key={index} label={chip.label} onRemove={chip.onRemove} />
      ))}
      <SortSelect />
    </div>
  );
};


export default ActiveFiltersBar;
