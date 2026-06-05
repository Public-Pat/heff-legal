"use client";
import { useInfiniteHits, useInstantSearch } from "react-instantsearch";
import styles from "./SearchResults.module.scss";
import SearchCard from "@/components/general/Card/SearchCard";

export default function SearchResults() {
  const { items, showMore, isLastPage } = useInfiniteHits();
  const { status } = useInstantSearch();

  return (
    <div className={styles.Holder}>
      <div className={styles.Inner}>
        <div className={styles.Grid}>
          {items.map((hit, index) => (
            <SearchCard key={hit.objectID} hit={hit} />
          ))}
        </div>
        {items?.length > 0 && !isLastPage && (
          <div className={styles.ShowMore}>
            <button onClick={showMore} disabled={status === "loading"}>
              {status === "loading" || status === "stalled"
                ? "Loading..."
                : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
