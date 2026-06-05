import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import Layout from "@/components/layout/Layout/Layout";
import { notFound } from "next/navigation";
import { Roboto, Geist, IBM_Plex_Mono } from "next/font/google";
import "@/styles/index.scss";
// import { GoogleTagManager } from "@next/third-parties/google";

// Custom font example: <body className={ppNeueMontreal.className}>
// import { ppNeueMontreal } from "@/utils/fontLoader";
// See: https://nextjs.org/docs/app/getting-started/fonts#local-fonts

const highlightFont = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
});
const headingFont = Roboto({
  weight: ["600"],
  subsets: ["latin"],
});
const bodyFont = Geist({
  weight: ["400"],
  subsets: ["latin"],
});
// MAKE SURE YOUR PRIMARY FONT IS THE LAST IN THE LIST

export const metadata: Metadata = {
  title: "Heffernan Legal",
  description: "Manly law firm specialising in family law, wills and estates, and commercial law.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<GoogleTagManager gtmId="GTM-XYZ" />*/}
      <body
        className={`${highlightFont.className} ${headingFont.className} ${bodyFont.className}`}
      >
        <InnerLayout>
          {children}
        </InnerLayout>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

async function InnerLayout({ children }: { children: React.ReactNode }) {
  const client = createClient();
  const layoutData = await client.getSingle("layout").catch((error) => {
    notFound();
  });

  return (
    <Layout layoutData={layoutData.data}>
      {children}
    </Layout>
  );
}
