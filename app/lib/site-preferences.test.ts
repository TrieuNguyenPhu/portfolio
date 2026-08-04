import assert from "node:assert/strict";
import { SitePreferences } from "./site-preferences.ts";

const restored = SitePreferences.restore("vi", "dark");
assert.deepEqual(restored, new SitePreferences("vi", "dark"));
assert.equal(restored.nextTheme, "light");
assert.equal(restored.withNextTheme().withNextTheme().theme, "system");
assert.deepEqual(SitePreferences.restore("invalid", "invalid"), new SitePreferences());
