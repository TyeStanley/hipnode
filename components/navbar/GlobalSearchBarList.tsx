import { GlobalSearchBarListProps } from "@/types/searchbar.index";
import SearchResultItem from "./SearchResultItem";

const GlobalSearchBarList = ({
  searchResults,
  handleClose,
  loadMore,
  showButton,
}: GlobalSearchBarListProps) => {
  return (
    <ul className="flex flex-col overflow-auto">
      {searchResults.length === 0 && (
        <p className="semibold-14 self-center px-4 text-dark-3 dark:text-light-2">
          No results
        </p>
      )}
      {searchResults.map((result) => {
        if (!result.id) return null;
        const key = result.type ? `${result.id}-${result.type}` : result.id;
        return (
          <SearchResultItem
            key={key}
            result={result}
            handleClose={handleClose}
          />
        );
      })}
      {showButton && (
        <button
          className="semibold-12 flex-center my-2 h-[1.625rem] shrink-0 self-center rounded-full bg-red-90 px-5 text-light"
          onClick={() => loadMore()}
        >
          Show More
        </button>
      )}
    </ul>
  );
};

export default GlobalSearchBarList;
