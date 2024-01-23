import { SearchResultListProps } from "@/types/searchbar.index";
import { GlobalSearchBarList } from ".";
import { LoaderComponent } from "../onboarding-components";

const SearchResultList = ({
  state,
  handleClose,
  loadMore,
}: SearchResultListProps) => {
  if (state.isLoading) {
    return (
      <div className="flex-center h-full w-full p-10">
        <LoaderComponent isGlobalSearch />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4 overflow-auto py-5">
        <p className="semibold-14 px-4 text-dark-3 dark:text-light-2">
          Top Match:
        </p>
        <GlobalSearchBarList
          searchResults={state.searchResults}
          handleClose={handleClose}
          loadMore={loadMore}
          showButton={state.showButton}
        />
      </div>
    );
  }
};

export default SearchResultList;
