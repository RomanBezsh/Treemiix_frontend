type MessageBubbleProps = {
  text: string;
  sender: "user" | "store";
  name: string;
  time: string;
};

export default function MessageBubble({
  text,
  sender,
  name,
  time,
}: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full flex-col ${
        isUser ? "items-end" : "items-start"
      }`}
    >
      <div className="mb-[6px] flex items-center gap-[14px] text-[11px] text-[#777777]">
        <span>{name}</span>
        <span>{time}</span>
      </div>

      <div
        className={`max-w-[520px] rounded-[18px] px-[18px] py-[14px] text-[14px] font-normal leading-[150%] ${
          isUser
            ? "bg-[#7C9BC0] text-white"
            : "bg-[#EEEEEE] text-[#333333]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}