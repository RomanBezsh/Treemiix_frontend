interface CategoryHeaderProps {
  title: string;
  description?: string;
}

export const CategoryHeader = ({ title, description }: CategoryHeaderProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-medium text-[#333333]">{title}</h1>
      {description && (
        <p className="text-sm font-medium text-[#828282]">{description}</p>
      )}
    </div>
  );
};
