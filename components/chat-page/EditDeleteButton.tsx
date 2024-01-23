import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { IoIosArrowDown } from "react-icons/io";

import { EditDeleteButtonProps } from "@/types/chatroom.index";

const EditDeleteButton = ({
  isStringSingleEmoji,
  displayText,
  setTextareaValue,
  textareaValue,
  handleDelete,
  handleTextareaChange,
  handleEdit,
  smallChatBox = false,
}: EditDeleteButtonProps) => {
  const styles = {
    popoverButtonStyles:
      "cursor-pointer p-2 text-sc-4 hover:bg-light-2 hover:text-red-60 dark:hover:bg-dark-4",
    dialogButtonStyles:
      "flex w-60 cursor-pointer justify-center rounded-full border border-sc-4 py-2 text-xl text-sc-4 hover:bg-red-80 hover:text-white",
  };

  return (
    <div className="relative top-6 flex w-20 self-end">
      <Popover>
        <PopoverTrigger>
          <div
            className={`absolute right-2 z-10 flex rounded-full ${
              smallChatBox
                ? "translate-x-0 translate-y-[-1.3rem]"
                : "translate-x-1.5 translate-y-1.5"
            } bg-red-80/80 text-2xl text-white`}
          >
            <IoIosArrowDown />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={`h-fit w-fit translate-x-3.5 ${
            smallChatBox ? "translate-y-0" : "translate-y-[2rem]"
          }  self-end p-0`}
        >
          <div className="absolute w-fit bg-light dark:bg-dark-2">
            {displayText && !isStringSingleEmoji && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <p
                    className={styles.popoverButtonStyles}
                    onClick={() => setTextareaValue(displayText)}
                  >
                    Edit
                  </p>
                </DialogTrigger>
                <DialogContent className="w-fit border-0 p-0">
                  <div className="flex flex-col items-center gap-5 rounded-lg bg-light p-5 dark:bg-dark-2">
                    <textarea
                      className="flex w-60 resize-none rounded-lg border border-sc-4 bg-light p-2 text-sc-4 outline-none dark:bg-dark-2"
                      value={textareaValue || ""}
                      onChange={handleTextareaChange}
                    />
                    <DialogClose>
                      <button
                        className={styles.dialogButtonStyles}
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </DialogClose>
                    <DialogClose>
                      <button
                        className={styles.dialogButtonStyles}
                        onClick={() => setTextareaValue(displayText)}
                      >
                        Cancel
                      </button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Dialog>
              <DialogTrigger className="w-full">
                <p className={styles.popoverButtonStyles}>Delete</p>
              </DialogTrigger>
              <DialogContent className="w-fit border-0 p-0">
                <ul className="flex flex-col items-center gap-5 rounded-lg bg-light p-5 dark:bg-dark-2">
                  <DialogClose>
                    <li
                      className={styles.dialogButtonStyles}
                      onClick={handleDelete}
                    >
                      Delete?
                    </li>
                  </DialogClose>
                  <DialogClose>
                    <li className={styles.dialogButtonStyles}>Cancel</li>
                  </DialogClose>
                </ul>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditDeleteButton;
