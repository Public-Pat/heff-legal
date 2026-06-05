"use client";
import styles from "./SearchExample.module.scss";
import { liteClient as algoliaSearch } from "algoliasearch/lite";
import { Configure, InstantSearch } from "react-instantsearch";
import SearchResults from "@/components/general/SearchResults/SearchResults";
import SearchInput from "@/components/general/SearchInput/SearchInput";
import SearchFilter from "@/components/general/SearchFilter/SearchFilter";

const hitsPerPage = 40;

const searchClient = algoliaSearch(
  // @ts-ignore
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

const SearchExample = () => {
  return (
    <InstantSearch indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME} searchClient={searchClient} routing={true}>
      <Configure hitsPerPage={hitsPerPage} />
      <div className={styles.Holder}>
        <div className={styles.Inner}>
          <SearchInput />
          <SearchFilter attribute="tags" />
        </div>
      </div>
      <SearchResults />
    </InstantSearch>
  );
};

export default SearchExample;
