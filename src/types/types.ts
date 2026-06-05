import {
  RichTextField,
  ImageField,
  Tags,
  GeoPointField,
} from "@prismicio/client";

export interface AlgoliaPostItem {
  type: string;
  objectID: string;
  date_timestamp: number;
  title: string;
  slug: string;
  excerpt: string;
  excerptRaw: RichTextField;
  image?: ImageField;
  tags: Tags;
  location?: GeoPointField;
}
