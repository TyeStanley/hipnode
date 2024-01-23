"use client";
import { ReactTags, Tag } from "react-tag-autocomplete";
import { useCallback, useState } from "react";

import { CustomTagSuggestion } from "@/types";
import { debounce, fetchUserSuggestions } from "@/utils";
import CustomTag from "./CustomTag";
import CustomOption from "./CustomOption";

const AddAdminsOrMembers = ({
  placeholderText,
  selected,
  setSelected,
}: {
  placeholderText: string;
  selected: Tag[];
  setSelected: (selected: Tag[]) => void;
}) => {
  const [isBusy, setIsBusy] = useState(false);
  const [suggestions, setSuggestions] = useState<CustomTagSuggestion[]>([]);

  const onAdd = (newTag: Tag) => {
    setSelected([...selected, newTag]);
  };

  const onDelete = (tagIndex: number) => {
    setSelected(selected.filter((_, i) => i !== tagIndex));
  };

  const onInput = useCallback(
    (userName: string) => {
      const debouncedFunction = debounce(async () => {
        if (isBusy) return;

        setIsBusy(true);

        try {
          const userSuggestions = await fetchUserSuggestions(userName);
          setSuggestions(userSuggestions);
        } catch (error) {
          console.error(error);
        } finally {
          setIsBusy(false);
        }
      });

      debouncedFunction();
    },
    [isBusy]
  );

  const noOptionsText =
    isBusy && !suggestions.length ? "Loading..." : "No matching user";

  return (
    <ReactTags
      classNames={{
        root: "react-tags",
        rootIsActive: "is-active",
        rootIsDisabled: "is-disabled",
        rootIsInvalid: "is-invalid",
        label: "react-tags__label",
        tagList: "react-tags__list",
        tagListItem: "react-tags__list-item",
        tag: "react-tags__tag",
        tagName: "react-tags__tag-name",
        comboBox: "react-tags__combobox",
        input: "react-tags__combobox-input",
        listBox: "react-tags__listbox",
        option: "react-tags__listbox-option",
        optionIsActive: "is-active",
        highlight: "react-tags__listbox-option-highlight",
      }}
      labelText=""
      selected={selected}
      suggestions={suggestions}
      onAdd={onAdd}
      onDelete={onDelete}
      onInput={onInput}
      noOptionsText={noOptionsText}
      placeholderText={`Add ${placeholderText}...`}
      renderTag={CustomTag}
      renderOption={CustomOption}
    />
  );
};

export default AddAdminsOrMembers;
