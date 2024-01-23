import { Tag } from "react-tag-autocomplete";

import AddAdminsOrMembers from "./addAdminsOrMembers/AddAdminsOrMembers";

const AddUsersComponent = ({
  selected,
  setSelected,
  placeholderText,
}: {
  selected: Tag[];
  setSelected: (selected: Tag[]) => void;
  placeholderText: string;
}) => (
  <div className="flex flex-col gap-2.5">
    <label>Add {placeholderText}</label>
    <AddAdminsOrMembers
      selected={selected}
      setSelected={setSelected}
      placeholderText={placeholderText}
    />
  </div>
);

export default AddUsersComponent;
