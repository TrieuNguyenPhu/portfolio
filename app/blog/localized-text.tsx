import type { Localized } from "./posts";

export default function LocalizedText({ value }: { value: Localized }) {
  return (
    <>
      <span className="localized--en" lang="en">{value.en}</span>
      <span className="localized--vi" lang="vi">{value.vi}</span>
    </>
  );
}
