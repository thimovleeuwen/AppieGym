import type { Lang } from "../services/translation.service";

const LOCALES: Record<Lang, string> = { en: "en-US", nl: "nl-NL" };

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Returns the 7 dates (Mon → Sun) of the current week as ISO strings. */
export function getCurrentWeekDates(): string[] {
  const now = new Date();
  const jsDay = now.getDay(); // 0 = Sunday ... 6 = Saturday
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return toISODate(d);
  });
}

export function formatDayDate(iso: string, lang: Lang = "en"): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(LOCALES[lang], { month: "short", day: "numeric" });
}

export function isToday(iso: string): boolean {
  return iso === toISODate(new Date());
}

export function isPastDateTime(iso: string, time: string): boolean {
  const [h, m] = time.split(":").map(Number);
  const dt = new Date(`${iso}T00:00:00`);
  dt.setHours(h, m, 0, 0);
  return dt.getTime() < Date.now();
}

export function formatTimeRange(time: string, durationMin: number, lang: Lang = "en"): string {
  const [h, m] = time.split(":").map(Number);
  const opts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: lang === "en",
  };
  const end = new Date();
  end.setHours(h, m + durationMin, 0, 0);
  const endStr = end.toLocaleTimeString(LOCALES[lang], opts);
  const start = new Date();
  start.setHours(h, m, 0, 0);
  const startStr = start.toLocaleTimeString(LOCALES[lang], opts);
  return `${startStr} – ${endStr}`;
}
