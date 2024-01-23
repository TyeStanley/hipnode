"use client";

import { ChangeEvent, useEffect, KeyboardEvent } from "react";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";

import OutlineIcons from "@/components/icons/outline-icons";
import {
  getSearchBarResults,
  getAllSearchBarResults,
} from "@/lib/actions/search-bar.actions";
import { SearchBarProps, SearchBarResults } from "@/types/searchbar.index";
import { SearchTypeHeader, SearchResultList } from ".";

const SearchBar = ({ additionalStyles, state, dispatch }: SearchBarProps) => {
  const fetchSearchResults = async () => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    let posts;

    try {
      if (state.activeSearchType === "") {
        posts = await getAllSearchBarResults(state.searchText, 0);
      } else {
        posts = await getSearchBarResults(
          state.searchText,
          state.activeSearchType,
          0
        );
      }
      if (posts) {
        dispatch({
          type: "UPDATE_SEARCH_RESULTS",
          payload: {
            searchResults: posts.posts,
            amountToSkip: 10,
            showButton: posts.isMorePosts,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeSearchType]);

  useEffect(() => {
    if (state.searchText === "") {
      fetchSearchResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchText]);

  const handleHeadingClick = (heading: string) => {
    if (state.isLoading) return;
    const payload = heading === state.activeSearchType ? "" : heading;
    dispatch({ type: "SET_ACTIVE_SEARCH_TYPE", payload });
  };

  const handleClose = () => {
    dispatch({ type: "HANDLE_CLOSE" });
  };

  const loadMore = () => {
    dispatch({ type: "SET_AMOUNT_TO_SKIP", payload: state.amountToSkip + 10 });

    const fetchSearchResults = async () => {
      try {
        let posts: SearchBarResults;
        if (state.activeSearchType === "") {
          posts = await getAllSearchBarResults(
            state.searchText,
            state.amountToSkip
          );
        } else {
          posts = await getSearchBarResults(
            state.searchText,
            state.activeSearchType,
            state.amountToSkip
          );
        }
        const newPosts = state.searchResults.concat(posts.posts);
        dispatch({
          type: "HANDLE_LOAD_MORE",
          payload: {
            searchResults: newPosts,
            isLoading: false,
            showButton: posts.isMorePosts,
          },
        });
      } catch (error) {
        console.error("Error occurred while loading more results:", error);
        dispatch({ type: "SET_IS_LOADING", payload: false });
      }
    };

    fetchSearchResults();
  };

  const handleFocus = () => {
    dispatch({ type: "HANDLE_OPEN" });
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchSearchResults();
    }
  };

  return (
    <div
      className={`${additionalStyles} z-20 -translate-y-2 items-center gap-2 rounded-lg bg-light-2 px-5 py-3 dark:bg-dark-4 lg:relative lg:mx-0 lg:flex lg:w-full lg:max-w-[27.5rem] lg:translate-y-0 lg:py-2`}
    >
      <Input
        type="text"
        placeholder="Type here to search..."
        className="no-focus flex border-none bg-light-2 shadow-none outline-none dark:bg-dark-4 dark:text-white"
        value={state.searchText}
        onChange={handleSearchTextChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      <section
        className={`${
          state.showSearch ? "flex" : "hidden"
        } absolute top-14 h-fit max-h-[80vh] w-full -translate-x-5 flex-col rounded-lg bg-light dark:bg-dark-2 lg:top-12 lg:max-h-[20rem]`}
      >
        <SearchTypeHeader
          state={state}
          handleHeadingClick={handleHeadingClick}
        />
        <SearchResultList
          state={state}
          handleClose={handleClose}
          loadMore={loadMore}
        />
      </section>

      <button type="button" className="flex" onClick={fetchSearchResults}>
        <OutlineIcons.Search className="cursor-pointer stroke-sc-4" />
      </button>
      <button
        type="button"
        className="flex cursor-pointer text-xl text-sc-4 lg:hidden"
        onClick={handleClose}
      >
        <IoClose />
      </button>
    </div>
  );
};

export default SearchBar;
