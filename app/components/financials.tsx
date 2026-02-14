"use client";

import * as React from "react";

type ViewMode = "grid" | "list";

type SecGrouping =
  | "All Filings"
  | "Annual Filings"
  | "Quarterly Filings"
  | "Current Reports"
  | "Proxy Filings"
  | "Registration Statements"
  | "Section 16 Filings"
  | "Other";

type FormatKey = "PDF" | "WORD" | "EXCEL" | "HTML" | "ZIP";

type Filing = {
  id: string;
  formType: string; // e.g. "8-K", "10-K", "10-Q"
  title: string;
  date: string; // ISO
  year: number;
  grouping: SecGrouping;
  formats: Partial<Record<FormatKey, string>>; // url placeholders
};

const GROUPINGS: SecGrouping[] = [
  "All Filings",
  "Annual Filings",
  "Quarterly Filings",
  "Current Reports",
  "Proxy Filings",
  "Registration Statements",
  "Section 16 Filings",
  "Other",
];

// ✅ Years capped at 2022
const YEARS = [2022, 2021, 2020, 2019, 2018, 2017, 2016] as const;

const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const COL_12 = "col-span-4 lg:col-span-12";

const MOCK_FILINGS: Filing[] = [
  // 2022
  {
    id: "f-2022-10k",
    formType: "10-K",
    title: "Annual Report (Form 10-K)",
    date: "2022-03-01",
    year: 2022,
    grouping: "Annual Filings",
    formats: { PDF: "#", WORD: "#", EXCEL: "#", HTML: "#" },
  },
  {
    id: "f-2022-10q-q3",
    formType: "10-Q",
    title: "Quarterly Report (Q3) (Form 10-Q)",
    date: "2022-11-08",
    year: 2022,
    grouping: "Quarterly Filings",
    formats: { PDF: "#", EXCEL: "#", HTML: "#" },
  },
  {
    id: "f-2022-8k-ops",
    formType: "8-K",
    title: "Current Report: Operational Update",
    date: "2022-09-14",
    year: 2022,
    grouping: "Current Reports",
    formats: { PDF: "#", HTML: "#" },
  },
  {
    id: "f-2022-8k-earnings",
    formType: "8-K",
    title: "Current Report: Earnings Release and Presentation",
    date: "2022-06-02",
    year: 2022,
    grouping: "Current Reports",
    formats: { PDF: "#", WORD: "#", HTML: "#", ZIP: "#" },
  },

  // 2021
  {
    id: "f-2021-def14a",
    formType: "DEF 14A",
    title: "Proxy Statement (Definitive)",
    date: "2021-04-19",
    year: 2021,
    grouping: "Proxy Filings",
    formats: { PDF: "#", HTML: "#" },
  },
  {
    id: "f-2021-10q-q2",
    formType: "10-Q",
    title: "Quarterly Report (Q2) (Form 10-Q)",
    date: "2021-08-10",
    year: 2021,
    grouping: "Quarterly Filings",
    formats: { PDF: "#", EXCEL: "#", HTML: "#" },
  },

  // 2020
  {
    id: "f-2020-10k",
    formType: "10-K",
    title: "Annual Report (Form 10-K)",
    date: "2020-02-27",
    year: 2020,
    grouping: "Annual Filings",
    formats: { PDF: "#", WORD: "#", HTML: "#" },
  },
  {
    id: "f-2020-8k-material",
    formType: "8-K",
    title: "Current Report: Regulation FD Disclosure",
    date: "2020-05-07",
    year: 2020,
    grouping: "Current Reports",
    formats: { PDF: "#", HTML: "#" },
  },
  {
    id: "f-2020-4-insider",
    formType: "4",
    title: "Statement of Changes in Beneficial Ownership",
    date: "2020-11-13",
    year: 2020,
    grouping: "Section 16 Filings",
    formats: { HTML: "#", PDF: "#" },
  },

  // 2019
  {
    id: "f-2019-s1",
    formType: "S-1",
    title: "Registration Statement Under the Securities Act",
    date: "2019-02-21",
    year: 2019,
    grouping: "Registration Statements",
    formats: { PDF: "#", HTML: "#", WORD: "#" },
  },
  {
    id: "f-2019-10q-q4",
    formType: "10-Q",
    title: "Quarterly Report (Q4) (Form 10-Q)",
    date: "2019-12-02",
    year: 2019,
    grouping: "Quarterly Filings",
    formats: { PDF: "#", EXCEL: "#", HTML: "#" },
  },

  // 2018
  {
    id: "f-2018-8k",
    formType: "8-K",
    title: "Current Report: Corporate Announcement",
    date: "2018-07-18",
    year: 2018,
    grouping: "Current Reports",
    formats: { PDF: "#", HTML: "#" },
  },
  {
    id: "f-2018-other",
    formType: "6-K",
    title: "Report of Foreign Private Issuer (Informational)",
    date: "2018-11-13",
    year: 2018,
    grouping: "Other",
    formats: { PDF: "#", HTML: "#" },
  },

  // 2017
  {
    id: "f-2017-10k",
    formType: "10-K",
    title: "Annual Report (Form 10-K)",
    date: "2017-03-02",
    year: 2017,
    grouping: "Annual Filings",
    formats: { PDF: "#", HTML: "#", WORD: "#" },
  },
  {
    id: "f-2017-def14a",
    formType: "DEF 14A",
    title: "Proxy Statement (Definitive)",
    date: "2017-04-14",
    year: 2017,
    grouping: "Proxy Filings",
    formats: { PDF: "#", HTML: "#" },
  },

  // 2016
  {
    id: "f-2016-10q",
    formType: "10-Q",
    title: "Quarterly Report (Q1) (Form 10-Q)",
    date: "2016-05-05",
    year: 2016,
    grouping: "Quarterly Filings",
    formats: { PDF: "#", EXCEL: "#", HTML: "#" },
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatList(items: string[]) {
  return items.join(", ");
}

function stableSortByDateDesc(items: Filing[]) {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(Boolean(mql.matches));
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function FormatLinks({
  formats,
  compact,
}: {
  formats: Filing["formats"];
  compact?: boolean;
}) {
  const available = (Object.keys(formats) as FormatKey[]).filter(
    (k) => Boolean(formats[k])
  );

  if (available.length === 0) return null;

  return (
    <div className={cx("flex flex-wrap items-center gap-2", compact && "gap-1.5")}>
      {available.map((k) => (
        <a
          key={k}
          href={formats[k]}
          className={cx(
            "inline-flex items-center rounded",
            "border border-blue-950/20 bg-white text-blue-950",
            "text-xs font-semibold font-['Poppins'] leading-4",
            compact ? "px-2 py-1" : "px-2.5 py-1.5",
            "hover:border-blue-950/40 hover:bg-[#E8F9FF]",
            "focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white",
            "transition-colors"
          )}
          aria-label={`Download ${k}`}
        >
          {k}
        </a>
      ))}
    </div>
  );
}

export default function FinancialsPreview() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Draft (what user is selecting)
  const [draftGrouping, setDraftGrouping] = React.useState<SecGrouping>("All Filings");
  const [draftYear, setDraftYear] = React.useState<string>("all");

  // Applied (what actually filters results)
  const [appliedGrouping, setAppliedGrouping] =
    React.useState<SecGrouping>("All Filings");
  const [appliedYear, setAppliedYear] = React.useState<string>("all");

  const [viewMode, setViewMode] = React.useState<ViewMode>("list");

  const hasActiveFilters =
    appliedGrouping !== "All Filings" || appliedYear !== "all";

  const canApply =
    draftGrouping !== appliedGrouping || draftYear !== appliedYear;

  const filtered = React.useMemo(() => {
    const items = MOCK_FILINGS.filter((f) => {
      if (appliedGrouping !== "All Filings" && f.grouping !== appliedGrouping)
        return false;
      if (appliedYear !== "all" && f.year !== Number(appliedYear)) return false;
      return true;
    });

    return stableSortByDateDesc(items);
  }, [appliedGrouping, appliedYear]);

  const summaryText = React.useMemo(() => {
    const groupingLabel = appliedGrouping;
    const yearLabel = appliedYear === "all" ? "All years" : appliedYear;
    return [groupingLabel, yearLabel].join(" • ");
  }, [appliedGrouping, appliedYear]);

  function handleApply() {
    setAppliedGrouping(draftGrouping);
    setAppliedYear(draftYear);
  }

  function handleReset() {
    setDraftGrouping("All Filings");
    setDraftYear("all");
    setAppliedGrouping("All Filings");
    setAppliedYear("all");
  }

  // Re-mount list/cards on apply to re-trigger subtle entrance motion (without weird jank)
  const motionKey = `${appliedGrouping}-${appliedYear}-${viewMode}`;

  return (
    <section
      className={cx(SITE_CONTAINER, "py-8 bg-white")}
      aria-label="Financials / SEC Filings Preview"
    >
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .enter {
          animation: fadeUp 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          will-change: opacity, transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .enter {
            animation: none !important;
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
                  {/* Row 1: Title + controls */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-blue-950 text-xl font-medium font-['Poppins'] leading-6">
                        Financials
                      </h2>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                      {/* SEC Groupings */}
                      <div className="w-full sm:w-[320px]">
                        <label
                          htmlFor="sec-groupings"
                          className="block text-blue-950 text-xs font-semibold font-['Poppins'] leading-4"
                        >
                          SEC GROUPINGS
                        </label>

                        <div className="mt-1.5 relative">
                          <select
                            id="sec-groupings"
                            value={draftGrouping}
                            onChange={(e) =>
                              setDraftGrouping(e.target.value as SecGrouping)
                            }
                            className="
                              w-full appearance-none bg-white rounded
                              px-2.5 py-2 pr-10
                              outline outline-1 outline-offset-[-1px] outline-blue-950
                              text-blue-950 text-sm font-normal font-['Poppins'] leading-4
                              focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-950
                              transition-[box-shadow,outline-color] duration-200
                            "
                          >
                            {GROUPINGS.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>

                          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M12 15.6998L6 9.6998L7.4 8.2998L12 12.8748L16.6 8.2998L18 9.6998L12 15.6998Z"
                                fill="#0E1D61"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Year */}
                      <div className="w-full sm:w-[220px]">
                        <label
                          htmlFor="year"
                          className="block text-blue-950 text-xs font-semibold font-['Poppins'] leading-4"
                        >
                          YEAR
                        </label>

                        <div className="mt-1.5 relative">
                          <select
                            id="year"
                            value={draftYear}
                            onChange={(e) => setDraftYear(e.target.value)}
                            className="
                              w-full appearance-none bg-white rounded
                              px-2.5 py-2 pr-10
                              outline outline-1 outline-offset-[-1px] outline-blue-950
                              text-blue-950 text-sm font-normal font-['Poppins'] leading-4
                              focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-950
                              transition-[box-shadow,outline-color] duration-200
                            "
                          >
                            <option value="all">All years</option>
                            {YEARS.map((y) => (
                              <option key={y} value={String(y)}>
                                {y}
                              </option>
                            ))}
                          </select>

                          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M12 15.6998L6 9.6998L7.4 8.2998L12 12.8748L16.6 8.2998L18 9.6998L12 15.6998Z"
                                fill="#0E1D61"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* GO */}
                      <button
                        type="button"
                        onClick={handleApply}
                        disabled={!canApply}
                        className="
                          h-10 px-4 rounded
                          bg-blue-950 text-white
                          inline-flex items-center justify-center
                          text-base font-normal font-['Poppins'] leading-5
                          disabled:opacity-40 disabled:cursor-not-allowed
                          focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                          transition-[transform,opacity] duration-200
                          active:scale-[0.98]
                        "
                      >
                        GO
                      </button>

                      {/* Reset */}
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={!hasActiveFilters}
                        className="
                          h-10 px-3 rounded
                          inline-flex items-center gap-2
                          text-blue-950
                          disabled:opacity-40 disabled:cursor-not-allowed
                          hover:bg-white/60
                          focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                          transition-colors duration-200
                        "
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

                  {/* Row 2: stable summary */}
                  <div className="min-h-[20px]" aria-live="polite">
                    <p className="text-blue-950/80 text-sm font-normal font-['Poppins'] leading-4">
                      Showing results for:{" "}
                      <span className="font-semibold text-blue-950">
                        {summaryText}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* VIEW MODE + COUNT */}
            <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-blue-950 text-sm font-normal font-['Poppins'] leading-4">
                Results: <span className="font-semibold">{filtered.length}</span>
              </div>

              <div className="inline-flex rounded-md border border-blue-950/20 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cx(
                    "px-3 py-2 rounded text-sm font-normal font-['Poppins'] leading-4",
                    "focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white",
                    viewMode === "list"
                      ? "bg-blue-950 text-white"
                      : "text-blue-950 hover:bg-blue-950/5"
                  )}
                  aria-pressed={viewMode === "list"}
                >
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cx(
                    "px-3 py-2 rounded text-sm font-normal font-['Poppins'] leading-4",
                    "focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white",
                    viewMode === "grid"
                      ? "bg-blue-950 text-white"
                      : "text-blue-950 hover:bg-blue-950/5"
                  )}
                  aria-pressed={viewMode === "grid"}
                >
                  Grid
                </button>
              </div>
            </div>

            {/* RESULTS */}
            {filtered.length === 0 ? (
              <div className="w-full rounded-lg border border-blue-950/10 bg-white p-6">
                <h3 className="text-blue-950 text-base font-medium font-['Poppins'] leading-5">
                  No documents match your filters
                </h3>
                <p className="mt-2 text-blue-950/70 text-sm font-normal font-['Poppins'] leading-4">
                  Try resetting filters or choosing a different year/grouping.
                </p>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="
                      h-10 px-4 rounded bg-blue-950 text-white
                      text-sm font-normal font-['Poppins'] leading-4
                      focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                    "
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div
                key={motionKey}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((f, i) => {
                  const availableFormats = (Object.keys(f.formats) as FormatKey[]).filter(
                    (k) => Boolean(f.formats[k])
                  );

                  return (
                    <article
                      key={f.id}
                      className={cx(
                        "rounded-lg border border-blue-950/10 bg-[#E8F9FF] p-5",
                        !prefersReducedMotion && "enter"
                      )}
                      style={
                        prefersReducedMotion
                          ? undefined
                          : { animationDelay: `${i * 40}ms` }
                      }
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full bg-blue-950/5 px-2.5 py-1 text-xs font-semibold font-['Poppins'] text-blue-950">
                          {f.formType}
                        </span>
                        <span className="text-xs font-normal font-['Poppins'] text-blue-950/70">
                          {formatDate(f.date)}
                        </span>
                      </div>

                      <h3 className="mt-3 text-blue-950 text-base font-semibold font-['Poppins'] leading-5">
                        {f.title}
                      </h3>

                      <div className="mt-2 text-xs font-normal font-['Poppins'] text-blue-950/60">
                        {f.grouping} • {f.year}
                      </div>

                      <div className="mt-4">
                        <div className="text-blue-950 text-xs font-semibold font-['Poppins'] leading-4">
                          Downloads
                        </div>
                        <div className="mt-2">
                          <FormatLinks formats={f.formats} />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <a
                          href="#"
                          className="
                            inline-flex items-center gap-2
                            text-blue-950 text-sm font-semibold font-['Poppins'] leading-4
                            hover:opacity-80
                            focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                            transition-opacity
                          "
                          aria-label={`Open ${f.formType}: ${f.title}`}
                        >
                          Open
                          <span aria-hidden="true">→</span>
                        </a>

                        <span className="text-xs font-normal font-['Poppins'] text-blue-950/60">
                          {availableFormats.length > 0
                            ? formatList(availableFormats)
                            : "No formats"}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div
                key={motionKey}
                className="rounded-lg border border-blue-950/10 bg-white overflow-hidden"
              >
                {/* Header */}
                <div className="hidden md:grid md:grid-cols-[120px_90px_1fr_220px_260px] gap-0 border-b border-blue-950/10 bg-blue-950/[0.03] px-4 py-3">
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Date
                  </div>
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Type
                  </div>
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Document
                  </div>
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Downloads
                  </div>
                  <div className="text-xs font-semibold font-['Poppins'] text-blue-950">
                    Grouping / Year
                  </div>
                </div>

                <ul className="divide-y divide-blue-950/10">
                  {filtered.map((f, i) => (
                    <li
                      key={f.id}
                      className={cx(
                        "px-4 py-4",
                        "md:grid md:grid-cols-[120px_90px_1fr_220px_260px] md:items-center md:gap-4",
                        !prefersReducedMotion && "enter"
                      )}
                      style={
                        prefersReducedMotion
                          ? undefined
                          : { animationDelay: `${i * 26}ms` }
                      }
                    >
                      {/* Date */}
                      <div className="text-xs font-normal font-['Poppins'] text-blue-950/70">
                        {formatDate(f.date)}
                      </div>

                      {/* Form Type */}
                      <div className="mt-2 md:mt-0">
                        <span className="inline-flex items-center rounded-full bg-blue-950/5 px-2.5 py-1 text-xs font-semibold font-['Poppins'] text-blue-950">
                          {f.formType}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="mt-3 md:mt-0 min-w-0">
                        <a
                          href="#"
                          className="
                            block text-blue-950 text-sm font-semibold font-['Poppins'] leading-4
                            hover:opacity-80
                            focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 focus:ring-offset-white
                            transition-opacity
                          "
                          aria-label={`Open ${f.formType}: ${f.title}`}
                        >
                          {f.title}
                        </a>
                        <div className="mt-1 text-xs font-normal font-['Poppins'] text-blue-950/60">
                          {f.grouping}
                        </div>
                      </div>

                      {/* Downloads */}
                      <div className="mt-3 md:mt-0">
                        <FormatLinks formats={f.formats} compact />
                      </div>

                      {/* Meta */}
                      <div className="mt-3 md:mt-0 text-xs font-normal font-['Poppins'] text-blue-950/70">
                        {f.year}
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
