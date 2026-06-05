// import { PostDocument } from "../../prismicio-types";
// import * as prismic from "@prismicio/client";
// import { AlgoliaPostItem } from "@/types/types";
//
// const getTimestamp = (date: string) => {
//   if (!date) {
//     return "";
//   } else {
//     return Date.parse(date);
//   }
// };
//
// export const mapPrismicToAlgolia = (
//   posts: PostDocument[],
// ): AlgoliaPostItem[] | null => {
//   if (!posts?.length) {
//     return [];
//   }
//
//   return posts
//     .map((post) => {
//       if (!post.data) return null;
//
//       return {
//         type: "post",
//         objectID: post.id, // Algolia ID
//         date_timestamp: getTimestamp(post.first_publication_date) || 0,
//
//         // Mid from here
//         // -----------------------
//         // Normal text is easy to map
//         title: post.data.title,
//         slug: post.uid,
//         // Rich next needs to be formatted as text to be useful for search
//         excerpt: prismic.asText(post.data.excerpt),
//         // If you want to display the richtext as a field in the hit card then the best thing to do is add it as raw.
//         // Remember to remove it from searchable attributes in the Algolia dashboard though.
//         excerptRaw: post.data.excerpt,
//         // Same for images, add them here and then remove them form searchable attributes in the Algolia dashboard.
//         preview_image: post.data.preview_image,
//         preview_video: post.data.preview_video,
//         preview_vimeo: post.data.preview_vimeo,
//         video_poster_image: post.data.video_poster_image,
//         location: post.data.location,
//       };
//     })
//     .filter((item) => item !== null) as AlgoliaPostItem[];
// };
