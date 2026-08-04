export type Language = "en" | "vi";

export type Localized = Readonly<Record<Language, string>>;

export const text = (en: string, vi: string): Localized => ({ en, vi });
