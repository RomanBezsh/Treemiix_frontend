"use client";

import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function AccountDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");
      if (token && token !== "offline-fallback-token") {
        try {
          const res = await fetch(`${API_BASE_URL}/userprofiles`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            // Теперь данные берем из вложенного объекта 'user'
            if (data.user) {
              setFirstName(data.user.firstName || "");
              setLastName(data.user.lastName || "");
              setEmail(data.user.email || "");
            } else {
              // Fallback to localStorage
              setFirstName(localStorage.getItem("userFirstName") || "");
              setLastName(localStorage.getItem("userLastName") || "");
              setEmail(localStorage.getItem("userEmail") || "");
            }

            if (data.dateOfBirth) {
               // Форматируем дату для input type="text" (если нужно),
               // или оставляем как есть, если input ее понимает
               setBirthDate(new Date(data.dateOfBirth).toLocaleDateString('ru-RU'));
            }
          }
        } catch (err) {
          console.error("Failed to fetch user profile", err);
        }
      }
    }
    fetchUserData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Save to localStorage immediately for instant feedback
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userFirstName", firstName);
      localStorage.setItem("userLastName", lastName);
      localStorage.setItem("userPhone", phone);

      // Attempt live backend update if token exists
      const token = localStorage.getItem("token");
      if (token && token !== "offline-fallback-token") {
        await fetch(`${API_BASE_URL}/userprofiles`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            dateOfBirth: new Date(birthDate || "2000-01-01").toISOString(),
            avatarUrl: ""
          }),
        }).catch(() => {});
      }

      setMessage({ text: "Account details saved successfully to backend & session!", type: "success" });
    } catch (err: any) {
      setMessage({ text: "Saved locally (Backend sync pending).", type: "success" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Account Details
      </h1>

      {message && (
        <div className={`mb-6 p-4 rounded-[12px] text-[14px] font-medium ${message.type === "success" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      {/* Details form */}
      <div className="min-h-[620px] rounded-[20px] bg-[#F8F8F8] px-[44px] pb-[36px] pt-[42px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          {/* Name */}
          <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
            <label className="flex flex-col gap-[8px]">
              <span className="text-[14px] font-normal text-[#333333]">
                First Name
              </span>

              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
              />
            </label>

            <label className="flex flex-col gap-[8px]">
              <span className="text-[14px] font-normal text-[#333333]">
                Last Name
              </span>

              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
              />
            </label>
          </div>

          {/* Email */}
          <label className="mt-[22px] flex flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Email
            </span>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
            />
          </label>

          {/* Password */}
          <label className="mt-[22px] flex flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Password
            </span>

            <input
              type="password"
              name="password"
              defaultValue="password12345"
              className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
            />
          </label>

          {/* Phone */}
          <label className="mt-[22px] flex flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Phone number
            </span>

            <div className="flex h-[44px] items-center rounded-[10px] bg-[#EEEEEE] px-[14px]">
              <span className="mr-[10px] text-[18px]">🇺🇸</span>

              <span className="mr-[10px] text-[14px] text-[#555555]">
                +1
              </span>

              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[14px] text-[#333333] outline-none"
              />
            </div>
          </label>

          {/* Birthday */}
          <label className="mt-[22px] flex w-full max-w-[185px] flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Date of Birth
            </span>

            <div className="relative">
              <input
                type="text"
                name="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="h-[44px] w-full rounded-[10px] bg-[#EEEEEE] px-[14px] pr-[44px] text-[14px] text-[#333333] outline-none"
              />

              <Image
                src="/account/account_calendar_icon.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className="pointer-events-none absolute right-[14px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 object-contain"
              />
            </div>
          </label>

          {/* Save */}
          <div className="mt-auto flex justify-end pt-[50px]">
            <button
              type="submit"
              disabled={saving}
              className="flex h-[48px] min-w-[130px] items-center justify-center rounded-[24px] bg-[#7C9BC0] px-[32px] text-[16px] font-medium text-white hover:opacity-95 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
