"use client";

import * as React from "react";

type ViewMode = "grid" | "list";

type Category =
  | "Corporate"
  | "Financial"
  | "Prescription Medicines"
  | "Research and Pipeline"
  | "Social Responsibility";

type PressRelease = {
  id: string;
  title: string;
  date: string; // ISO
  year: number;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  category: Category;
  excerpt: string;
  hasPdf?: boolean;
};

const CATEGORIES: Category[] = [
  "Corporate",
  "Financial",
  "Prescription Medicines",
  "Research and Pipeline",
  "Social Responsibility",
];

const YEARS = [2022, 2021, 2020, 2019, 2018, 2017, 2016] as const;
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"] as const;

const MOCK_PRESS_RELEASES: PressRelease[] = [
  {
    id: "pr-001",
    title: "Company Reports Third Quarter 2022 Financial Results",
    date: "2022-11-08",
    year: 2022,
    quarter: "Q4",
    category: "Financial",
    excerpt:
      "Quarterly results summary covering performance highlights, cash position, and operational updates.",
    hasPdf: true,
  },
  {
    id: "pr-002",
    title: "Corporate Update: Expansion of Manufacturing Capabilities",
    date: "2022-09-14",
    year: 2022,
    quarter: "Q3",
    category: "Corporate",
    excerpt:
      "Operational improvements focused on scalability, quality controls, and supply resilience for critical products.",
  },
  {
    id: "pr-003",
    title: "Research & Pipeline: Program Milestones and Upcoming Readouts",
    date: "2022-06-02",
    year: 2022,
    quarter: "Q2",
    category: "Research and Pipeline",
    excerpt:
      "Pipeline update with progress across clinical programs, enrollment status, and next key milestones.",
    hasPdf: true,
  },
  {
    id: "pr-004",
    title: "Social Responsibility: Community Health Initiative Launch",
    date: "2021-08-10",
    year: 2021,
    quarter: "Q3",
    category: "Social Responsibility",
    excerpt:
      "A multi-year initiative to support education, prevention, and access to health resources in local communities.",
  },
  {
    id: "pr-005",
    title: "Prescription Medicines: Updated Safety and Labeling Resources",
    date: "2020-05-07",
    year: 2020,
    quarter: "Q2",
    category: "Prescription Medicines",
    excerpt:
      "Updated materials for healthcare professionals with clear guidance and downloadable resources.",
    hasPdf: true,
  },
  {
    id: "pr-006",
    title: "Corporate: Appointment of New Executive Leadership Role",
    date: "2019-02-21",
    year: 2019,
    quarter: "Q1",
    category: "Corporate",
    excerpt:
      "Leadership appointment aligned to strengthen execution, governance, and cross-functional collaboration.",
  },
  {
    id: "pr-007",
    title: "Financial: Business Update and Investor Presentation Available",
    date: "2018-11-13",
    year: 2018,
    quarter: "Q4",
    category: "Financial",
    excerpt:
      "An updated investor presentation is now available, including business highlights and recent milestones.",
    hasPdf: true,
  },
];

const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const COL_12 = "col-span-4 lg:col-span-12";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

type Option = { label: string; value: string };

function FancySelect({
  id,
  label,
  value,
  onChange,
  options,
  reducedMotion,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  reducedMotion: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(() => {
    const idx = options.findIndex((o) => o.value === value);
    return Math.max(0, idx);
  });

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  React.useEffect(() => {
    const idx = options.findIndex((o) => o.value === value);
    if (idx >= 0) setActiveIndex(idx);
  }, [value, options]);

  React.useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function commit(idx: number) {
    const opt = options[idx];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => listRef.current?.focus(), 0);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
      return;
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      commit(activeIndex);
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="w-full sm:w-[220px]">
      <label
        htmlFor={id}
        className="block text-blue-950 text-xs font-semibold font-['Poppins'] leading-4"
      >
        {label}
      </label>

      <div className="mt-1.5 relative">
        <button
          id={id}
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onButtonKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          className={cx(
            "w-full bg-white rounded px-2.5 py-2 pr-10 text-left",
            "outline outline-1 outline-offset-[-1px] outline-blue-950",
            "text-blue-950 text-sm font-normal font-['Poppins'] leading-4",
            "transition-[transform,box-shadow,outline-width] duration-200 ease-out",
            "active:scale-[0.99]",
            "focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-950",
            "focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            open && "shadow-[0_12px_40px_rgba(14,29,97,0.10)]"
          )}
        >
          {selected.label}
        </button>

        {/* Chevron */}
        <span
          className={cx(
            "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2",
            "transition-transform duration-200 ease-out",
            open && "rotate-180"
          )}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.6998L6 9.6998L7.4 8.2998L12 12.8748L16.6 8.2998L18 9.6998L12 15.6998Z"
              fill="#0E1D61"
            />
          </svg>
        </span>

        {open && (
          <div
            id={`${id}-listbox`}
            role="listbox"
            tabIndex={-1}
            ref={listRef}
            onKeyDown={onListKeyDown}
            className={cx(
              "absolute z-20 mt-2 w-full overflow-hidden rounded-lg bg-white",
              "border border-blue-950/10",
              "shadow-[0_18px_60px_rgba(14,29,97,0.14)]",
              "focus:outline-none",
              reducedMotion ? "" : "pr-pop"
            )}
          >
            <div className="max-h-[280px] overflow-auto py-1">
              {options.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseDown={(e) => e.preventDefault()} // avoids focus loss
                    onClick={() => commit(idx)}
                    className={cx(
                      "px-3 py-2 cursor-pointer select-none",
                      "text-sm font-normal font-['Poppins'] leading-4",
                      "transition-colors duration-150",
                      isActive ? "bg-blue-950/5" : "bg-white",
                      isSelected ? "text-blue-950 font-semibold" : "text-blue-950"
                    )}
                  >
                    {opt.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PressReleasesPreview() {
  const reducedMotion = usePrefersReducedMotion();

  // Draft
  const [draftYear, setDraftYear] = React.useState<string>("all");
  const [draftQuarter, setDraftQuarter] = React.useState<string>("all");

  // Applied
  const [appliedYear, setAppliedYear] = React.useState<string>("all");
  const [appliedQuarter, setAppliedQuarter] = React.useState<string>("all");

  const [selectedCategories, setSelectedCategories] = React.useState<Category[]>(
    []
  );

  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");

  const hasActiveFilters =
    appliedYear !== "all" ||
    appliedQuarter !== "all" ||
    selectedCategories.length > 0;

  const canApply = draftYear !== appliedYear || draftQuarter !== appliedQuarter;

  const baseFilteredForCounts = React.useMemo(() => {
    return MOCK_PRESS_RELEASES.filter((pr) => {
      if (appliedYear !== "all" && pr.year !== Number(appliedYear)) return false;
      if (appliedQuarter !== "all" && pr.quarter !== appliedQuarter) return false;
      return true;
    });
  }, [appliedYear, appliedQuarter]);

  const categoryCounts = React.useMemo(() => {
    const map = new Map<Category, number>();
    for (const c of CATEGORIES) map.set(c, 0);
    for (const pr of baseFilteredForCounts) {
      map.set(pr.category, (map.get(pr.category) ?? 0) + 1);
    }
    return map;
  }, [baseFilteredForCounts]);

  const filteredReleases = React.useMemo(() => {
    const items = MOCK_PRESS_RELEASES.filter((pr) => {
      if (appliedYear !== "all" && pr.year !== Number(appliedYear)) return false;
      if (appliedQuarter !== "all" && pr.quarter !== appliedQuarter) return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(pr.category)
      )
        return false;
      return true;
    });

    items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return items;
  }, [appliedYear, appliedQuarter, selectedCategories]);

  const summaryText = React.useMemo(() => {
    const yearLabel = appliedYear === "all" ? "All years" : appliedYear;
    const quarterLabel =
      appliedQuarter === "all" ? "All quarters" : appliedQuarter;

    const parts: string[] = [yearLabel, quarterLabel];
    if (selectedCategories.length > 0) parts.push(selectedCategories.join(", "));
    return parts.join(" • ");
  }, [appliedYear, appliedQuarter, selectedCategories]);

  // When filters/view mode change, restart subtle entrance (only for results area)
  const resultsAnimKey = React.useMemo(() => {
    const cats = selectedCategories.slice().sort().join("|");
    return `${viewMode}-${appliedYear}-${appliedQuarter}-${cats}-${filteredReleases.length}`;
  }, [viewMode, appliedYear, appliedQuarter, selectedCategories, filteredReleases.length]);

  function handleApply() {
    setAppliedYear(draftYear);
    setAppliedQuarter(draftQuarter);
  }

  function handleReset() {
    setDraftYear("all");
    setDraftQuarter("all");
    setAppliedYear("all");
    setAppliedQuarter("all");
    setSelectedCategories([]);
  }

  function toggleCategory(cat: Category) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  const yearOptions: Option[] = React.useMemo(
    () => [{ label: "All years", value: "all" }, ...YEARS.map((y) => ({ label: String(y), value: String(y) }))],
    []
  );

  const quarterOptions: Option[] = React.useMemo(
    () => [{ label: "All quarters", value: "all" }, ...QUARTERS.map((q) => ({ label: q, value: q }))],
    []
  );

  return (
    <section
      className={cx(SITE_CONTAINER, "py-8 bg-white")}
      aria-label="Press Releases Preview"
    >
      {/* Global micro-animation styles (no config needed) */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .pr-enter,
          .pr-pop,
          .pr-soft {
            animation: none !important;
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
          }
        }

        .pr-soft {
          animation: prSoft 260ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }
        @keyframes prSoft {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pr-enter {
          opacity: 0;
          transform: translateY(10px) scale(0.99);
          filter: blur(2px);
          animation: prEnter 520ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
          animation-delay: calc(var(--stagger, 0) * 1ms);
        }
        @keyframes prEnter {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .pr-pop {
          transform-origin: top;
          animation: prPop 180ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }
        @keyframes prPop {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.985);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>

      <div className={GRID_12}>
        <div className={COL_12}>
          <div className="flex flex-col gap-6">
            {/* FILTER BAND */}
            <div className="w-full rounded-lg bg-white border border-blue-950/10">
              <div className="p-6 bg-[#E8F9FF]">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-blue-950 text-xl font-medium font-['Poppins'] leading-6">
                        Press Release
                      </h2>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                      <FancySelect
                        id="fiscal-year"
                        label="FISCAL YEAR"
                        value={draftYear}
                        onChange={setDraftYear}
                        options={yearOptions}
                        reducedMotion={reducedMotion}
                      />

                      <FancySelect
                        id="quarter"
                        label="QUARTER"
                        value={draftQuarter}
                        onChange={setDraftQuarter}
                        options={quarterOptions}
                        reducedMotion={reducedMotion}
                      />

                      <button
                        type="button"
                        onClick={handleApply}
                        disabled={!canApply}
                        className={cx(
                          "h-10 px-4 rounded bg-blue-950 text-white inline-flex items-center justify-center",
                          "text-base font-normal font-['Poppins'] leading-5",
                          "disabled:opacity-40 disabled:cursor-not-allowed",
                          "transition-[transform,box-shadow,opacity] duration-200 ease-out",
                          "active:scale-[0.99]",
                          "hover:shadow-[0_12px_40px_rgba(14,29,97,0.12)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        )}
                      >
                        GO
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={!hasActiveFilters}
                        className={cx(
                          "h-10 px-3 rounded inline-flex items-center gap-2 text-blue-950",
                          "disabled:opacity-40 disabled:cursor-not-allowed",
                          "transition-[transform,opacity] duration-200 ease-out",
                          "active:scale-[0.99]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        )}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M5.65833 14.525C4.93056 14.2083 4.29722 13.7806 3.75833 13.2417C3.21944 12.7028 2.79167 12.0694 2.475 11.3417C2.15833 10.6139 2 9.83333 2 9H3.33333C3.33333 10.3 3.78611 11.4028 4.69167 12.3083C5.59722 13.2139 6.7 13.6667 8 13.6667C9.3 13.6667 10.4028 13.2139 11.3083 12.3083C12.2139 11.4028 12.6667 10.3 12.6667 9C12.6667 7.7 12.2139 6.59722 11.3083 5.69167C10.4028 4.78611 9.3 4.33333 8 4.33333H7.9L8.93333 5.36667L8 6.33333L5.33333 3.66667L8 1L8.93333 1.96667L7.9 3H8C8.83333 3 9.61389 3.15833 10.3417 3.475C11.0694 3.79167 11.7028 4.21944 12.2417 4.75833C12.7806 5.29722 13.2083 5.93056 13.525 6.65833C13.8417 7.38611 14 8.16667 14 9C14 9.83333 13.8417 10.6139 13.525 11.3417C13.2083 12.0694 12.7806 12.7028 12.2417 13.2417C11.7028 13.7806 11.0694 14.2083 10.3417 14.525C9.61389 14.8417 8.83333 15 8 15C7.16667 15 6.38611 14.8417 5.65833 14.525Z"
                            fill="#1C1B1F"
                          />
                        </svg>
                        <span className="text-sm font-normal font-['Poppins'] leading-4">
                          Reset filter
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="min-h-[20px]" aria-live="polite">
                    <p
                      key={summaryText}
                      className={cx(
                        "text-blue-950/80 text-sm font-normal font-['Poppins'] leading-4",
                        reducedMotion ? "" : "pr-soft"
                      )}
                    >
                      Showing results for:{" "}
                      <span className="font-semibold text-blue-950">
                        {summaryText}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY PILLS */}
            <div className="w-full">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const selected = selectedCategories.includes(cat);
                  const count = categoryCounts.get(cat) ?? 0;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={cx(
                        "inline-flex items-center gap-2 rounded-full px-3 py-2",
                        "border text-sm font-normal font-['Poppins'] leading-4",
                        "transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out",
                        "active:scale-[0.99]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        selected
                          ? "bg-blue-950 text-white border-blue-950"
                          : "bg-white text-blue-950 border-blue-950/20 hover:border-blue-950/40 hover:shadow-[0_10px_35px_rgba(14,29,97,0.10)]"
                      )}
                      aria-pressed={selected}
                    >
                      <span>{cat}</span>
                      <span
                        className={cx(
                          "rounded-full px-2 py-0.5 text-xs",
                          selected
                            ? "bg-white/15 text-white"
                            : "bg-blue-950/5 text-blue-950"
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}

                {selectedCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategories([])}
                    className={cx(
                      "inline-flex items-center rounded-full px-3 py-2",
                      "border border-blue-950/20 bg-white text-blue-950",
                      "text-sm font-normal font-['Poppins'] leading-4",
                      "transition-[transform,box-shadow,border-color] duration-200 ease-out",
                      "active:scale-[0.99]",
                      "hover:border-blue-950/40 hover:shadow-[0_10px_35px_rgba(14,29,97,0.10)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    )}
                  >
                    Clear categories
                  </button>
                )}
              </div>
            </div>

            {/* VIEW MODE + COUNT */}
            <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-blue-950 text-sm font-normal font-['Poppins'] leading-4">
                Results: <span className="font-semibold">{filteredReleases.length}</span>
              </div>

              <div className="inline-flex rounded-md border border-blue-950/20 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cx(
                    "px-3 py-2 rounded text-sm font-normal font-['Poppins'] leading-4",
                    "transition-[transform,background-color,color] duration-200 ease-out",
                    "active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    viewMode === "grid"
                      ? "bg-blue-950 text-white"
                      : "text-blue-950 hover:bg-blue-950/5"
                  )}
                  aria-pressed={viewMode === "grid"}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cx(
                    "px-3 py-2 rounded text-sm font-normal font-['Poppins'] leading-4",
                    "transition-[transform,background-color,color] duration-200 ease-out",
                    "active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    viewMode === "list"
                      ? "bg-blue-950 text-white"
                      : "text-blue-950 hover:bg-blue-950/5"
                  )}
                  aria-pressed={viewMode === "list"}
                >
                  List
                </button>
              </div>
            </div>

            {/* RESULTS */}
            {filteredReleases.length === 0 ? (
              <div className="w-full rounded-lg border border-blue-950/10 bg-white p-6">
                <h3 className="text-blue-950 text-base font-medium font-['Poppins'] leading-5">
                  No press releases match your filters
                </h3>
                <p className="mt-2 text-blue-950/70 text-sm font-normal font-['Poppins'] leading-4">
                  Try resetting filters or selecting fewer categories.
                </p>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className={cx(
                      "h-10 px-4 rounded bg-blue-950 text-white",
                      "text-sm font-normal font-['Poppins'] leading-4",
                      "transition-[transform,box-shadow] duration-200 ease-out",
                      "active:scale-[0.99] hover:shadow-[0_12px_40px_rgba(14,29,97,0.12)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    )}
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div key={resultsAnimKey} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredReleases.map((pr, i) => (
                  <article
                    key={pr.id}
                    style={
                      reducedMotion
                        ? undefined
                        : ({ ["--stagger" as any]: i * 48 } as React.CSSProperties)
                    }
                    className={cx(
                      "rounded-lg border border-blue-950/10 bg-[#E8F9FF] p-5",
                      "transition-[transform,box-shadow] duration-200 ease-out",
                      "hover:shadow-[0_18px_60px_rgba(14,29,97,0.12)] hover:-translate-y-[1px]",
                      "active:translate-y-0",
                      reducedMotion ? "" : "pr-enter"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-blue-950/5 px-2.5 py-1 text-xs font-semibold font-['Poppins'] text-blue-950">
                        {pr.category}
                      </span>
                      <span className="text-xs font-normal font-['Poppins'] text-blue-950/70">
                        {formatDate(pr.date)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-blue-950 text-base font-medium font-['Poppins'] leading-5">
                      {pr.title}
                    </h3>

                    <p className="mt-2 text-blue-950/70 text-sm font-normal font-['Poppins'] leading-4 line-clamp-3">
                      {pr.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        className={cx(
                          "h-9 px-3 rounded bg-blue-950 text-white",
                          "text-sm font-normal font-['Poppins'] leading-4",
                          "transition-[transform,box-shadow] duration-200 ease-out",
                          "active:scale-[0.99] hover:shadow-[0_12px_40px_rgba(14,29,97,0.12)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        )}
                      >
                        Read
                      </button>

                      {pr.hasPdf && (
                        <button
                          type="button"
                          className={cx(
                            "h-9 px-3 rounded border border-blue-950/20 bg-white text-blue-950",
                            "text-sm font-normal font-['Poppins'] leading-4",
                            "transition-[transform,box-shadow,border-color] duration-200 ease-out",
                            "active:scale-[0.99] hover:border-blue-950/40 hover:shadow-[0_12px_40px_rgba(14,29,97,0.10)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                          )}
                        >
                          Download PDF
                        </button>
                      )}
                    </div>

                    <div className="mt-3 text-xs font-normal font-['Poppins'] text-blue-950/60">
                      {pr.year} • {pr.quarter}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div key={resultsAnimKey} className="rounded-lg border border-blue-950/10 bg-white overflow-hidden">
                <div className="hidden sm:grid sm:grid-cols-[140px_1fr_220px_160px] gap-0 border-b border-blue-950/10 bg-blue-950/[0.03] px-4 py-3">
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Date
                  </div>
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Title
                  </div>
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Category
                  </div>
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Actions
                  </div>
                </div>

                <ul className="divide-y divide-blue-950/10">
                  {filteredReleases.map((pr, i) => (
                    <li
                      key={pr.id}
                      style={
                        reducedMotion
                          ? undefined
                          : ({ ["--stagger" as any]: i * 32 } as React.CSSProperties)
                      }
                      className={cx(
                        "px-4 py-4 sm:grid sm:grid-cols-[140px_1fr_220px_160px] sm:items-center sm:gap-4",
                        "transition-[background-color] duration-200 ease-out",
                        "hover:bg-blue-950/[0.02]",
                        reducedMotion ? "" : "pr-enter"
                      )}
                    >
                      <div className="text-xs font-normal font-['Poppins'] text-blue-950/70">
                        {formatDate(pr.date)}
                      </div>

                      <div className="mt-2 sm:mt-0">
                        <div className="text-blue-950 text-sm font-medium font-['Poppins'] leading-4">
                          {pr.title}
                        </div>
                        <div className="mt-1 text-xs font-normal font-['Poppins'] text-blue-950/60">
                          {pr.year} • {pr.quarter}
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-0">
                        <span className="inline-flex items-center rounded-full bg-blue-950/5 px-2.5 py-1 text-xs font-semibold font-['Poppins'] text-blue-950">
                          {pr.category}
                        </span>
                      </div>

                      <div className="mt-3 sm:mt-0 flex items-center gap-2">
                        <button
                          type="button"
                          className={cx(
                            "h-9 px-3 rounded bg-blue-950 text-white",
                            "text-sm font-normal font-['Poppins'] leading-4",
                            "transition-[transform,box-shadow] duration-200 ease-out",
                            "active:scale-[0.99] hover:shadow-[0_12px_40px_rgba(14,29,97,0.12)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                          )}
                        >
                          Read
                        </button>

                        {pr.hasPdf && (
                          <button
                            type="button"
                            className={cx(
                              "h-9 px-3 rounded border border-blue-950/20 bg-white text-blue-950",
                              "text-sm font-normal font-['Poppins'] leading-4",
                              "transition-[transform,box-shadow,border-color] duration-200 ease-out",
                              "active:scale-[0.99] hover:border-blue-950/40 hover:shadow-[0_12px_40px_rgba(14,29,97,0.10)]",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            )}
                          >
                            PDF
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
