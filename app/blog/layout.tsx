import SiteHeader from "../site-header";

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader active="blog" />
      {children}
    </>
  );
}
