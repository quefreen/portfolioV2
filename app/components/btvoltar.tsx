// src/components/back_button.tsx
"use client";

import * as React from "react";

export default function BackButton({
  label = "Voltar",
  onClick,
  href,
  className = "",
}: {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 select-none transition-colors " +
    "text-[18px] font-semibold leading-none " +
    "text-[#747474] hover:text-[#FF4C2C] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4C2C]/30";

  const content = (
    <>
      <span aria-hidden="true" className="text-[18px] leading-none">
        &lt;
      </span>
      <span style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif" }}>
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={[base, className].join(" ")}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={[base, className].join(" ")}
      style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif" }}
    >
      {content}
    </button>
  );
}
