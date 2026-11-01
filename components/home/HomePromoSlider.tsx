"use client";

import { useEffect, useState } from "react";
import PromoWideBanner, { type PromoWideBannerProps } from "./PromoWideBanner";

const slides: (PromoWideBannerProps & { id: string })[] = [
  {
    id: "headset",
    title: "Gaming Headset HyperX Cloud Alpha",
    description: (
      <>
        Pay <b>$16.67</b>/month for 6 months, interest-free upon approval for the Treemiix Rewards Visa Card
      </>
    ),
    buttonLabel: "Buy now",
    href: "/catalog?search=HyperX",
    imageSrc: "/home/banners/promo-headset.webp",
    fadeColor: "#FFC501",
    buttonTextClassName: "bg-[linear-gradient(90deg,#6A7DBE_0%,#B190C8_100%)] bg-clip-text text-transparent",
    priority: true,
  },
  {
    id: "app",
    title: "Download app Treemiix now!",
    description: (
      <>
        Order anything and anywhere directly in our app in your <b>phone</b>. We will notify you about new offers
      </>
    ),
    buttonLabel: "Go",
    href: "/",
    imageSrc: "/home/banners/promo-app.webp",
    fadeColor: "#4A4F70",
    buttonTextClassName: "text-[#49516D]",
  },
];

const AUTOPLAY_MS = 6000;

// Shown on the home page instead of the sign-in banner once the user is signed in
export default function HomePromoSlider() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slides share one grid cell, so the section keeps the height of the tallest one */}
      <div className="grid">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== active}
            inert={index !== active}
            className={`[grid-area:1/1] transition-opacity duration-700 ease-out ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <PromoWideBanner {...slide} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-[12px] left-1/2 z-20 flex -translate-x-1/2 gap-[8px]">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show promotion ${index + 1}`}
            aria-current={index === active}
            className={`h-[8px] rounded-full transition-all duration-300 ${
              index === active ? "w-[24px] bg-white" : "w-[8px] bg-white/55 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
