import { searchHeadings } from "@/constants/search-bar";
import { SearchTypeHeaderProps } from "@/types/searchbar.index";

const SearchTypeHeader = ({
  state,
  handleHeadingClick,
}: SearchTypeHeaderProps) => {
  return (
    <header className="flex h-[3.75rem] gap-4 border-b border-sc-6 p-4 dark:border-dark-4">
      <p className="semibold-14 text-dark-3 dark:text-light-2">Type:</p>
      <div className="flex gap-2.5 overflow-x-scroll">
        {searchHeadings.map((heading) => {
          const isActive = heading === state.activeSearchType;
          return (
            <button
              key={heading}
              type="button"
              className={`semibold-9 flex-center h-[1.625rem] w-[3.75rem] shrink-0 cursor-pointer rounded-full ${
                isActive
                  ? "bg-red-90 text-light"
                  : "bg-sc-6 text-sc-2 hover:bg-red-90 hover:text-light dark:bg-dark-4 dark:text-white dark:hover:bg-red-90"
              }`}
              onClick={() => {
                handleHeadingClick(heading);
              }}
            >
              {heading}
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default SearchTypeHeader;
