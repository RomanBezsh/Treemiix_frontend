"use client";

import { useEffect, useRef } from "react";

export type LegalDocument = "terms" | "privacy";

const DOCUMENTS: Record<LegalDocument, { title: string; sections: { heading: string; text: string }[] }> = {
  terms: {
    title: "Terms of Service",
    sections: [
      {
        heading: "Using Treemiix",
        text: "Treemiix is a marketplace where independent sellers offer their products. By creating an account you agree to provide accurate information and to keep your password private.",
      },
      {
        heading: "Orders and payments",
        text: "Prices, stock and delivery estimates are set by sellers and may change. An order is confirmed once it appears in Your Orders.",
      },
      {
        heading: "Sellers",
        text: "Seller stores are reviewed before they go live. Products must be described honestly and comply with the law; Treemiix may hide products or stores that break these rules.",
      },
      {
        heading: "Changes",
        text: "We may update these terms. The current version is always available on this page.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "What we collect",
        text: "Your name, email address, delivery addresses and order history — only what is needed to run your account, deliver orders and support sellers.",
      },
      {
        heading: "How we use it",
        text: "To sign you in, process orders, show your recently viewed products and contact you about your orders. We do not sell your personal data.",
      },
      {
        heading: "Your choices",
        text: "You can update your details in Account at any time or ask us to delete your account and the data linked to it.",
      },
    ],
  },
};

interface LegalModalProps {
  document: LegalDocument | null;
  onClose: () => void;
}

/** Terms of Service / Privacy Policy shown over the sign-in form. */
export default function LegalModal({ document: doc, onClose }: LegalModalProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!doc) return;
    titleRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [doc, onClose]);

  if (!doc) return null;
  const content = DOCUMENTS[doc];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="flex max-h-full w-full max-w-[560px] flex-col rounded-[20px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#EFEFEF] px-6 py-4">
          <h2
            id="legal-modal-title"
            ref={titleRef}
            tabIndex={-1}
            className="text-[22px] font-medium text-[#333333] outline-none"
          >
            {content.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full text-[24px] leading-none text-[#828282] transition-colors hover:bg-[#F8F8F8] hover:text-[#333333]"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {content.sections.map((section) => (
            <section key={section.heading} className="mb-4 last:mb-0">
              <h3 className="mb-1 text-[16px] font-medium text-[#333333]">{section.heading}</h3>
              <p className="text-[14px] leading-[150%] text-[#555555]">{section.text}</p>
            </section>
          ))}
        </div>

        <div className="border-t border-[#EFEFEF] px-6 py-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="h-[42px] rounded-[10px] bg-[#7C9BC0] px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
