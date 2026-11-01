"use client";

import { Moon, Sun } from "lucide-react";
import { setTheme, useTheme } from "@/lib/theme";

interface ThemeToggleProps {
  /** "icon" — round button for the header, "row" — full-width row with a switch for the mobile menu */
  variant?: "icon" | "row";
}

export default function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
  const theme = useTheme();
  const isDark = theme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (variant === "row") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggle}
        className="flex w-full items-center justify-between px-[20px] py-[12px] text-[15px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <span className="flex items-center gap-[10px]">
          {isDark ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          Dark mode
        </span>
        <span
          aria-hidden="true"
          className={`relative h-[24px] w-[42px] rounded-full transition-colors duration-200 ${
            isDark ? "bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]" : "bg-white/25"
          }`}
        >
          <span
            className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-[#fff] shadow transition-[left] duration-200 ${
              isDark ? "left-[21px]" : "left-[3px]"
            }`}
          />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className="
        group flex h-[42px] w-[42px] shrink-0 items-center justify-center
        rounded-full border-2 border-white/80 text-white
        transition-all duration-200 ease-out
        hover:bg-white/10
        active:scale-[0.94]
        sm:h-[45px] sm:w-[45px]
      "
    >
      <span className="transition-transform duration-300 ease-out group-hover:rotate-[20deg]">
        {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
      </span>
    </button>
  );
}
