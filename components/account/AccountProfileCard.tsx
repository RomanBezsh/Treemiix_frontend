"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function AccountProfileCard() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const firstName = localStorage.getItem("userFirstName") || "";
    const lastName = localStorage.getItem("userLastName") || "";
    const email = localStorage.getItem("userEmail") || "";
    setUserName((firstName || lastName ? `${firstName} ${lastName}`.trim() : "Пользователь").trim());
    setUserEmail(email);
  }, []);

  return (
    <div className="flex w-full items-center gap-[14px] rounded-[20px] bg-[#F8F8F8] px-[20px] py-[16px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
      {/* Avatar */}
      <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border-[3px] border-[#F3C75F] bg-white">
        <Image
          src="/common/account_icon.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="h-[24px] w-[24px] object-contain"
        />
      </div>

      {/* User info */}
      <div className="min-w-0">
        <p className="truncate text-[16px] font-medium leading-[130%] text-[#333333]">
          {userName}
        </p>

        <p className="mt-[2px] truncate text-[13px] font-normal leading-[130%] text-[#555555]">
          {userEmail}
        </p>
      </div>
    </div>
  );
}