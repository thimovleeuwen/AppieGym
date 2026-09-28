import { Injectable, computed, effect, signal } from "@angular/core";
import type { AppDictionary } from "../i18n/dictionary";
import { EN } from "../i18n/en";
import { NL } from "../i18n/nl";

export type Lang = "en" | "nl";

const LANG_KEY = "appiegym.lang";

function loadLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "en" || stored === "nl") return stored;
  } catch {
    // ignore
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("nl")
    ? "nl"
    : "en";
}

@Injectable({ providedIn: "root" })
export class TranslationService {
  private readonly langSignal = signal<Lang>(loadLang());
  readonly lang = this.langSignal.asReadonly();
  readonly dict = computed<AppDictionary>(() => (this.langSignal() === "nl" ? NL : EN));

  constructor() {
    effect(() => {
      const lang = this.langSignal();
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch {
        // ignore
      }
      if (typeof document !== "undefined") document.documentElement.lang = lang;
    });
  }

  setLang(lang: Lang): void {
    this.langSignal.set(lang);
  }

  /** Picks the English or Dutch variant of a data-driven (non-dictionary) string. */
  pick(en: string, nl: string): string {
    return this.langSignal() === "nl" ? nl : en;
  }

  /** Replaces `{{key}}` placeholders in a translation string. */
  interpolate(template: string, vars: Record<string, string | number>): string {
    return Object.entries(vars).reduce(
      (acc, [key, value]) => acc.split(`{{${key}}}`).join(String(value)),
      template,
    );
  }

  spotsLeftLabel(count: number): string {
    const { spotLeftOne, spotLeftMany } = this.dict().classRow;
    return this.interpolate(count === 1 ? spotLeftOne : spotLeftMany, { count });
  }
}
