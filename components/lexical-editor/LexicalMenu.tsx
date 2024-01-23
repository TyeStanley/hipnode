"use client";

import React, { useEffect, useState } from "react";

import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CLEAR_EDITOR_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { LexicalIconButtons } from ".";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

import { LexicalMenuState, LexicalMenuProps } from "@/types/lexical-editor";
import { LowPriority } from "@/constants/lexical-editor";
import LexicalWritePreviewToggle from "./LexicalWritePreviewToggle";

const LexicalMenu = ({
  editor,
  autoFocus,
  setAutoFocus,
  editorRef,
  editorHtmlString,
  onSubmitPreview,
}: LexicalMenuProps) => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [clearEditor, setClearEditor] = useState(false);

  const insertTextAtSelection = (editor: any, text: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(text);
      }
    });
  };

  const handleEmojiSelect = (emoji: any) => {
    if (emoji.native) {
      insertTextAtSelection(editor, emoji.native);
    }
  };

  const [state, setState] = useState<LexicalMenuState>({
    isBold: false,
    isCode: false,
    isItalic: false,
    isStrikethrough: false,
    isUnderline: false,
  });

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;

          setState({
            isBold: selection.hasFormat("bold"),
            isCode: selection.hasFormat("code"),
            isItalic: selection.hasFormat("italic"),
            isStrikethrough: selection.hasFormat("strikethrough"),
            isUnderline: selection.hasFormat("underline"),
          });
        });
      }
    );

    return unregisterListener;
  }, [editor]);

  useEffect(() => {
    const unregisterUndoCommand = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      LowPriority
    );

    const unregisterRedoCommand = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      LowPriority
    );

    return () => {
      unregisterUndoCommand();
      unregisterRedoCommand();
    };
  }, [editor]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (editorRef.current) {
        if (editorRef.current.contains(event.target as Node)) {
          setAutoFocus(true);
        } else {
          setAutoFocus(false);
          setShowEmojiPicker(false);
        }
      }
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef]);

  useEffect(() => {
    if (clearEditor) editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    setClearEditor(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearEditor]);

  return (
    <div
      ref={editorRef}
      className="flex h-fit w-full flex-wrap justify-between gap-2 rounded-md bg-light-2 px-[1.25rem] py-[1.125rem] dark:bg-dark-4"
    >
      <LexicalWritePreviewToggle
        autoFocus={autoFocus}
        setAutoFocus={setAutoFocus}
        htmlString={editorHtmlString}
        onSubmitPreview={onSubmitPreview}
      />

      <div className="flex-wrap">
        {showEmojiPicker && (
          <div className="absolute right-[-0rem] top-[2.8rem]">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} perLine={6} />
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="translate-y-[-4px] pr-1 text-[1.1rem]"
        >
          🙂
        </button>
        <LexicalIconButtons
          icon="unorderedList"
          aria-label="Insert Unordered List"
          onClick={(e) => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
        />
        <LexicalIconButtons
          icon="orderedList"
          aria-label="Insert Unordered List"
          onClick={(e) => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }}
        />
        <LexicalIconButtons
          icon="bold"
          aria-label="Format text as bold"
          active={state.isBold}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        />
        <LexicalIconButtons
          icon="italic"
          aria-label="Format text as italics"
          active={state.isItalic}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        />
        <LexicalIconButtons
          icon="underline"
          aria-label="Format text to underlined"
          active={state.isUnderline}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        />
        <LexicalIconButtons
          icon="strike"
          aria-label="Format text with a strikethrough"
          active={state.isStrikethrough}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
        />
        <LexicalIconButtons
          icon="code"
          aria-label="Format text with inline code"
          active={state.isCode}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
          }}
        />
        <LexicalIconButtons
          icon="alignLeft"
          aria-label="Left Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
        />
        <LexicalIconButtons
          icon="alignCenter"
          aria-label="Center Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
        />
        <LexicalIconButtons
          icon="alignRight"
          aria-label="Right Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
        />
        <LexicalIconButtons
          icon="alignJustify"
          aria-label="Justify Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
        />
        <LexicalIconButtons
          icon="clockwiseArrow"
          aria-label="Redo"
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
        />
        <LexicalIconButtons
          icon="trash"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
          }}
        ></LexicalIconButtons>
        <LexicalIconButtons
          icon="antiClockwiseArrow"
          aria-label="Undo"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
        />
      </div>
    </div>
  );
};

export default LexicalMenu;
