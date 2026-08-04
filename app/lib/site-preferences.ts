import type { Language } from "./localization";

export type Theme = "dark" | "light" | "system";

export class SitePreferences {
  readonly language: Language;
  readonly theme: Theme;

  constructor(
    language: Language = "en",
    theme: Theme = "system",
  ) {
    this.language = language;
    this.theme = theme;
  }

  static restore(language: string | null, theme: string | null) {
    return new SitePreferences(
      language === "vi" ? "vi" : "en",
      theme === "dark" || theme === "light" ? theme : "system",
    );
  }

  get nextTheme(): Theme {
    return this.theme === "dark" ? "light" : this.theme === "light" ? "system" : "dark";
  }

  withLanguage(language: Language) {
    return new SitePreferences(language, this.theme);
  }

  withNextTheme() {
    return new SitePreferences(this.language, this.nextTheme);
  }
}
