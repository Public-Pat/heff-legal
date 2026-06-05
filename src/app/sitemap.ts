import { createClient } from "@/prismicio";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // To do: Make sure the types mapped here match the routes defined in `prismicio.ts`.

  const pages = await client.getAllByType("page");
  const home = await client.getAllByType("home");

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${process.env.URL}/${page.uid}`,
    lastModified: new Date(page.last_publication_date),
  }));
  const homeEntries: MetadataRoute.Sitemap = home.map((home) => ({
    url: `${process.env.URL}`,
    lastModified: new Date(home.last_publication_date),
  }));

  return [...homeEntries, ...pageEntries];
}

