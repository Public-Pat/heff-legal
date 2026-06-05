import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import SearchExample from "@/components/general/SearchExample/SearchExample";
import { defaultSharingImage } from "@/data/sharing";
import { metadata } from "@/app/layout";

type Params = Promise<{ uid: string }>;

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata(props: { params: Params }) {
  const client = createClient();
  const params = await props.params;
  const uid = params.uid;

  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: page.data.title + ` | ${metadata.title}`,
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

export default async function Page(props: { params: Params }) {
  const client = createClient();
  const params = await props.params;
  const uid = params.uid;

  const page = await client.getByUID("page", uid).catch(() => notFound());

  return (
    <div>
      <SliceZone slices={page.data.slices} components={components} />
      {/*{uid === "search" && <SearchExample />}*/}
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page");

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
