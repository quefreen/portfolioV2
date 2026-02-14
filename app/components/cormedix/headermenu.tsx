"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

type MenuKey = "company" | "defencath" | "rnd" | "science";

type MenuItem = {
  label: string;
  href: string;
};

type MenuGroup = {
  key: MenuKey;
  label: string;
  rootHref: string;
  items: MenuItem[];
};

const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

const MENU_GROUPS: MenuGroup[] = [
  {
    key: "company",
    label: "Company",
    rootHref: "/company",
    items: [
      { label: "Management team", href: "/company/management-team" },
      { label: "Board of directors", href: "/company/board-of-directors" },
      { label: "Media Assets Library", href: "/company/media-assets-library" },
      {
        label: "Scientific Advisory Board",
        href: "/company/scientific-advisory-board",
      },
    ],
  },
  {
    key: "defencath",
    label: "DefenCath™",
    rootHref: "/defencath",
    items: [
      { label: "About DefenCath", href: "/defencath/about" },
      { label: "LOCK-IT-100", href: "/defencath/lock-it-100" },
    ],
  },
  {
    key: "rnd",
    label: "Research & Development",
    rootHref: "/research",
    items: [
      { label: "Taurolidine", href: "/research/taurolidine" },
      { label: "Pipeline", href: "/research/pipeline" },
      { label: "Early Science", href: "/research/early-science" },
    ],
  },
  {
    key: "science",
    label: "Science & Publications",
    rootHref: "/science",
    items: [
      { label: "Events & Webcasts", href: "/science/events-webcasts" },
      { label: "In the News", href: "/science/in-the-news" },
    ],
  },
];

const UTILITY_LINKS: MenuItem[] = [
  { label: "Investor", href: "/investor" },
  { label: "Careers", href: "/careers" },
  { label: "Contact us", href: "/contact" },
];

export default function HeaderMegaMenu() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);
  const lastTriggerRef = React.useRef<HTMLButtonElement | null>(null);

  const [openKey, setOpenKey] = React.useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileOpenSub, setMobileOpenSub] = React.useState<
    Partial<Record<MenuKey, boolean>>
  >({});

  const activeGroup = React.useMemo(
    () => MENU_GROUPS.find((g) => g.key === openKey) ?? null,
    [openKey]
  );

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose(delay = 160) {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenKey(null);
    }, delay);
  }

  function openMenu(key: MenuKey, trigger?: HTMLButtonElement | null) {
    clearCloseTimer();
    setOpenKey(key);
    if (trigger) lastTriggerRef.current = trigger;
  }

  function closeMenu() {
    clearCloseTimer();
    setOpenKey(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus?.();
    });
  }

  React.useEffect(() => {
    if (!openKey) return;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      const el = wrapperRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (target && !el.contains(target)) closeMenu();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openKey]);

  React.useEffect(() => {
    if (!isDesktop) setOpenKey(null);
  }, [isDesktop]);

  return (
    <header ref={wrapperRef} className="bg-white">
      {/* Top utility bar */}
      <div className="h-12 bg-blue-950">
        <div className={cx(SITE_CONTAINER, "h-full flex items-center justify-end")}>
          <nav aria-label="Utility navigation" className="flex items-center gap-1">
            {UTILITY_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="
                  rounded px-3 py-2
                  text-white text-base font-medium font-['Poppins'] leading-5
                  hover:bg-white/10
                  focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-blue-950
                "
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main header row */}
      <div className="border-b border-blue-950/10 bg-white">
        <div className={cx(SITE_CONTAINER, "py-5")}>
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="
                flex items-center gap-3 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
              "
              aria-label="Home"
            >
              <Image
                src="/cormedix.svg"
                alt="Cormedix"
                width={180}
                height={28}
                priority
                className="h-[28px] w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-1"
              onMouseEnter={() => clearCloseTimer()}
              onMouseLeave={() => scheduleClose(160)}
            >
              {MENU_GROUPS.map((g) => {
                const isOpen = openKey === g.key;

                return (
                  <button
                    key={g.key}
                    type="button"
                    onMouseEnter={(e) => {
                      if (!isDesktop) return;
                      openMenu(g.key, e.currentTarget);
                    }}
                    onClick={(e) => {
                      if (!isDesktop) return;
                      const next = isOpen ? null : g.key;
                      if (next) openMenu(g.key, e.currentTarget);
                      else closeMenu();
                    }}
                    onFocus={(e) => {
                      if (!isDesktop) return;
                      openMenu(g.key, e.currentTarget);
                    }}
                    onKeyDown={(e) => {
                      if (!isDesktop) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        const next = isOpen ? null : g.key;
                        if (next) openMenu(g.key, e.currentTarget);
                        else closeMenu();
                      }
                      if (e.key === "Escape") {
                        e.preventDefault();
                        closeMenu();
                      }
                    }}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? `mega-panel-${g.key}` : undefined}
                    className={cx(
                      "relative group inline-flex items-center gap-2 rounded-md px-3 py-2",
                      "text-blue-950 text-lg font-medium font-['Poppins'] leading-5",
                      "hover:bg-[#E8F9FF]",
                      "focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white",
                      isOpen ? "bg-[#E8F9FF]" : "bg-transparent"
                    )}
                  >
                    <span>{g.label}</span>

                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 9 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className={cx(
                        "transition-transform duration-200 ease-out motion-reduce:transition-none",
                        isOpen && "translate-y-[1px] rotate-180"
                      )}
                    >
                      <path
                        d="M7.26206 1.41389L4.33806 4.33789L1.41406 1.41389"
                        stroke="#168FBE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                );
              })}

              {/* ✅ CTA: taller + fully blue on hover (no inner outline) */}
              <Link
                href="/about-crbsi"
                className="
                  ml-1 inline-flex items-center justify-center
                  rounded-md px-3 py-3
                  border-2 border-blue-950
                  text-blue-950 text-lg font-semibold font-['Poppins'] leading-5
                  hover:bg-blue-950 hover:text-white hover:border-blue-950
                  focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                  transition-colors duration-150 ease-out motion-reduce:transition-none
                "
              >
                About CRBSI
              </Link>
            </nav>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/about-crbsi"
                className="
                  inline-flex items-center justify-center
                  rounded-md px-3 py-3
                  border-2 border-blue-950
                  text-blue-950 text-sm font-semibold font-['Poppins']
                  hover:bg-blue-950 hover:text-white hover:border-blue-950
                  focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                  transition-colors duration-150 ease-out motion-reduce:transition-none
                "
              >
                About CRBSI
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="
                  inline-flex items-center justify-center
                  rounded-md p-2
                  text-blue-950
                  hover:bg-[#E8F9FF]
                  focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                "
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {mobileOpen ? (
                    <path
                      d="M6 6L18 18M18 6L6 18"
                      stroke="#0E1D61"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7H20M4 12H20M4 17H20"
                      stroke="#0E1D61"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop mega panel: only when open */}
        {openKey && activeGroup ? (
          <div
            className="relative z-20"
            onMouseEnter={() => clearCloseTimer()}
            onMouseLeave={() => scheduleClose(160)}
          >
            <div className="absolute left-0 right-0 top-0">
              <div
                className={cx(
                  "border-t border-blue-950/10 bg-white",
                  "shadow-[0_18px_40px_-28px_rgba(14,29,97,0.45)]"
                )}
              >
                <div className={cx(SITE_CONTAINER, "py-7")}>
                  <div
                    id={`mega-panel-${openKey}`}
                    role="menu"
                    className={cx(
                      "bg-white",
                      "transition-all duration-200 ease-out motion-reduce:transition-none",
                      "opacity-100 translate-y-0"
                    )}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                      {/* LEFT: big label */}
                      <div className="lg:col-span-4">
                        <h2 className="text-blue-950 font-['Poppins'] font-medium leading-[1.05] text-[32px]">
                          {activeGroup.label}
                        </h2>
                      </div>

                      {/* RIGHT: items */}
                      <div className="lg:col-span-8 lg:border-l lg:border-blue-950/10 lg:pl-5">
                        <div className="flex flex-col items-start">
                          {activeGroup.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              className={cx(
                                "inline-flex w-fit rounded-md px-3 py-2",
                                // ✅ semibold for right-side items
                                "text-blue-950/80 text-sm font-semibold font-['Poppins'] leading-6",
                                "hover:text-blue-950 hover:bg-[#E8F9FF]",
                                "focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white",
                                "transition-colors duration-150 ease-out motion-reduce:transition-none"
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* end grid */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile menu panel */}
      <div
        className={cx(
          "lg:hidden border-b border-blue-950/10 bg-white",
          "transition-[max-height,opacity] duration-200 ease-out motion-reduce:transition-none",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ maxHeight: mobileOpen ? 560 : 0 }}
        aria-hidden={!mobileOpen}
      >
        <div className={cx(SITE_CONTAINER, "py-4")}>
          <div className="flex flex-col gap-2">
            {MENU_GROUPS.map((g) => {
              const isOpen = !!mobileOpenSub[g.key];
              return (
                <div
                  key={g.key}
                  className="rounded-lg border border-blue-950/10 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenSub((prev) => ({
                        ...prev,
                        [g.key]: !prev[g.key],
                      }))
                    }
                    className="
                      w-full flex items-center justify-between gap-3
                      px-4 py-3
                      text-blue-950 text-base font-medium font-['Poppins'] leading-5
                      hover:bg-[#E8F9FF]
                      focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                    "
                    aria-expanded={isOpen}
                  >
                    <span>{g.label}</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 9 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className={cx(
                        "transition-transform duration-200 ease-out motion-reduce:transition-none",
                        isOpen && "rotate-180"
                      )}
                    >
                      <path
                        d="M7.26206 1.41389L4.33806 4.33789L1.41406 1.41389"
                        stroke="#168FBE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={cx(
                      "grid transition-[max-height,opacity] duration-200 ease-out motion-reduce:transition-none",
                      isOpen ? "opacity-100" : "opacity-0"
                    )}
                    style={{ maxHeight: isOpen ? 420 : 0 }}
                  >
                    <div className="px-2 pb-2">
                      <Link
                        href={g.rootHref}
                        className="
                          block w-fit rounded-md px-3 py-2
                          text-blue-950 text-sm font-semibold font-['Poppins']
                          hover:bg-[#E8F9FF]
                          focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                        "
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileOpenSub({});
                        }}
                      >
                        {g.label} →
                      </Link>

                      <div className="mt-1 flex flex-col items-start">
                        {g.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="
                              inline-flex w-fit rounded-md px-3 py-2
                              text-blue-950/80 text-sm font-semibold font-['Poppins'] leading-5
                              hover:bg-[#E8F9FF] hover:text-blue-950
                              focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                            "
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileOpenSub({});
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-2 rounded-lg border border-blue-950/10 bg-white p-2">
              {UTILITY_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="
                    block rounded-md px-3 py-2
                    text-blue-950 text-sm font-semibold font-['Poppins']
                    hover:bg-[#E8F9FF]
                    focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                  "
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
