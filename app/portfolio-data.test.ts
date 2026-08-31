import assert from "node:assert/strict";
import test from "node:test";
import { portfolioVolumes } from "./portfolio-data.ts";

test("the portfolio is organized as seven distinct working volumes", () => {
  assert.equal(portfolioVolumes.length, 7);
  assert.equal(new Set(portfolioVolumes.map((volume) => volume.slug)).size, 7);
  assert.deepEqual(portfolioVolumes.map((volume) => volume.number), ["01", "02", "03", "04", "05", "06", "07"]);
});

test("every volume contains evidence and a usable palette", () => {
  for (const volume of portfolioVolumes) {
    assert.ok(volume.details.length >= 3);
    assert.ok(volume.stack.length >= 3);
    assert.match(volume.color, /^#[0-9a-f]{6}$/i);
    assert.match(volume.foil, /^#[0-9a-f]{6}$/i);
  }
});
