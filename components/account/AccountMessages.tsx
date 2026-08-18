"use client";

import Image from "next/image";
import { useState } from "react";

import MessageBubble from "./MessageBubble";

const messages = [
  {
    id: 1,
    sender: "user" as const,
    name: "Peter Marzo",
    time: "11:30 02/16",
    text: "Hello, I ordered a phone case from you. He came, but not the one I wanted. Can I make a return or exchange? I am attaching a photo. I 1 wanted, but 2 were sent",
  },
  {
    id: 2,
    sender: "store" as const,
    name: "MEGAStore Store",
    time: "11:30 02/16",
    text: "Hello, yes you can make an exchange.",
  },
];

export default function AccountMessages() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    setMessage("");
  };

  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Your Messages
      </h1>

      {/* Chat panel */}
      <div className="flex min-h-[620px] flex-col rounded-[20px] bg-[#F8F8F8] px-[34px] pb-[24px] pt-[30px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        {/* Chat header */}
        <div className="flex items-center gap-[28px]">
          <button
            type="button"
            className="flex h-[36px] min-w-[96px] items-center justify-center rounded-[18px] bg-[#7C9BC0] px-[20px] text-[12px] font-medium text-white"
          >
            Back
          </button>

          <h2 className="text-[20px] font-medium text-[#777777]">
            MEGAStore Store
          </h2>
        </div>

        {/* Messages */}
        <div className="mt-[28px] flex flex-1 flex-col gap-[26px]">
          <MessageBubble
            text={messages[0].text}
            sender={messages[0].sender}
            name={messages[0].name}
            time={messages[0].time}
          />

          {/* Attached images */}
          <div className="ml-auto flex max-w-[520px] gap-[10px]">
            <div className="relative h-[210px] w-[210px] overflow-hidden rounded-[18px] bg-[#EEEEEE]">
              <Image
                src="/account/messages/message-product-1.png"
                alt="Product attachment"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-[210px] w-[210px] overflow-hidden rounded-[18px] bg-[#EEEEEE]">
              <Image
                src="/account/messages/message-product-2.png"
                alt="Product attachment"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <MessageBubble
            text={messages[1].text}
            sender={messages[1].sender}
            name={messages[1].name}
            time={messages[1].time}
          />
        </div>

        {/* Message input */}
        <div className="mt-[30px] flex h-[48px] items-center rounded-[24px] bg-[#EEEEEE] px-[14px]">
          <button
            type="button"
            aria-label="Add attachment"
            className="flex h-[30px] w-[30px] items-center justify-center text-[24px] text-[#333333]"
          >
            +
          </button>

          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Add your message"
            className="min-w-0 flex-1 bg-transparent px-[12px] text-[14px] text-[#333333] outline-none placeholder:text-[#888888]"
          />

          <button
            type="button"
            onClick={handleSend}
            aria-label="Send message"
            className="flex h-[34px] w-[34px] items-center justify-center text-[28px] text-black"
          >
            ➤
          </button>
        </div>
      </div>
    </section>
  );
}