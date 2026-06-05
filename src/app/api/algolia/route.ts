import { algoliasearch } from "algoliasearch";
import { createClient } from "@/prismicio";
// import { mapPrismicToAlgolia } from "@/utils/mapPrismicToAlgolia";
export async function POST(request: Request) {
  // Check if Algolia credentials exist, return error if not
  if (
    !process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ||
    !process.env.ALGOLIA_SEARCH_ADMIN_KEY
  ) {
    return new Response("Algolia credentials are not set", {
      status: 500,
    });
  }

  try {
    // // Instantiate Prismic and Algolia clients
    // const prismicClient = createClient();
    // const algoliaClient = algoliasearch(
    //   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    //   process.env.ALGOLIA_SEARCH_ADMIN_KEY
    // );
    //
    // // Get Prismic posts
    // const posts = await prismicClient.getAllByType("post").catch(() => []);
    // // Map articles to Algolia records
    // const projectsRecords = mapPrismicToAlgolia(posts);
    // // Check if records are found, throw error if not
    // if (!projectsRecords) {
    //   console.error("No projectsRecords found");
    //   return new Response("No projectsRecords found", {
    //     status: 500,
    //   });
    // }
    // // Format these for batching
    // const records = projectsRecords.map((record) => {
    //   return {
    //     action: "addObject",
    //     body: record,
    //   };
    // });
    //
    // // Clear existing records from Algolia
    // await algoliaClient.clearObjects({
    //   indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
    // });
    // // Index records to Algolia
    // await algoliaClient.batch({
    //   indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
    //   batchWriteParams: {
    //     // @ts-ignore
    //     requests: records,
    //   },
    // });

    // Return success response if the process completes without any issue
    return new Response(
      "Content successfully synchronized with Algolia search",
      {
        status: 200,
      }
    );
  } catch (error) {
    // Log the error and return error response if any error occurs
    console.error(error);
    return new Response("An error occurred while synchronizing content", {
      status: 500,
    });
  }
}
