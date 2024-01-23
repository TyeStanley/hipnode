import React, { useEffect, useState, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { $getRoot } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { TRANSFORMERS } from "@lexical/markdown";
import { Placeholder } from ".";
import LexicalMenu from "./LexicalMenu";
import {
  CustomAutoFocusPluginProps,
  CustomOnChangePluginProps,
  LexicalEditorProps,
} from "@/types/lexical-editor";

const CustomAutoFocusPlugin = ({
  autoFocus,
  setAutoFocus,
}: CustomAutoFocusPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (autoFocus) {
      editor.focus();
    }
  }, [editor, autoFocus]);

  return null;
};

const CustomOnChangePlugin = ({
  name,
  updateField,
}: CustomOnChangePluginProps): null => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        updateField(name, JSON.stringify(htmlString));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
  return null;
};

const LexicalEditor = ({
  name,
  updateField,
  onSubmitPreview,
  defaultContent,
}: LexicalEditorProps & { defaultContent?: string }) => {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState("");
  const [autoFocus, setAutoFocus] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultContent && editor) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const contentWithoutQuotes = defaultContent.slice(1, -1);
        const parser = new DOMParser();

        const dom = parser.parseFromString(contentWithoutQuotes, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        root.append(...nodes);
      });
      editor.focus();
    }
  }, [editor, defaultContent]);

  useEffect(() => {
    return editor?.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlStringEditor = $generateHtmlFromNodes(editor, null);
        setHtmlString(htmlStringEditor);
      });
    });
  }, [editor]);

  return (
    <main
      ref={editorRef}
      onBlur={() => setAutoFocus(false)}
      className="flex w-full flex-col"
    >
      <div className="h-fit w-full">
        <LexicalMenu
          editor={editor}
          editorHtmlString={htmlString}
          autoFocus={autoFocus}
          setAutoFocus={setAutoFocus}
          editorRef={editorRef}
          onSubmitPreview={onSubmitPreview}
        />
      </div>

      <RichTextPlugin
        contentEditable={
          <ContentEditable className="h-[14rem] w-[100%] overflow-scroll rounded-b-md border-x-[0.1rem] border-b-[0.1rem] border-light-2 bg-light p-6 text-base text-sc-2 outline-none dark:border-dark-4  dark:bg-dark-3 dark:text-light-2 md:h-[20rem]" />
        }
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <ListPlugin />
      <ClearEditorPlugin />
      <CustomOnChangePlugin name={name} updateField={updateField} />
      <CustomAutoFocusPlugin
        autoFocus={autoFocus}
        setAutoFocus={setAutoFocus}
      />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </main>
  );
};

export default LexicalEditor;
