import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { defaultSharingImage } from "@/data/sharing";
import { metadata } from "@/app/layout";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  return {
    title: prismic.asText(page.data.title) + ` | ${metadata.title}`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || defaultSharingImage.url,
          width: defaultSharingImage.width,
          height: defaultSharingImage.height,
          alt: defaultSharingImage.alt,
        },
      ],
    },
    metadataBase: new URL(process.env.URL ?? "https://fallbackUrl.com"),
    alternates: {
      canonical: page?.url ?? null,
    }
  };
}

export default async function Home() {
  //  Create a Prismic client
  const client = createClient();

  //  Look for the page
  //  If it doesn't exist, return a 404
  const page = await client.getSingle("home").catch(() => notFound());

  return (
    <div>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}
