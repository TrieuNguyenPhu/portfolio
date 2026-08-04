"use client";

import type { Localized } from "../lib/localization";
import { useSitePreferences } from "../site-preferences";

export default function LocalizedText({ value }: { value: Localized }) {
  const { preferences: { language } } = useSitePreferences();
  return <span lang={language}>{value[language]}</span>;
}
