import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

export const EDITOR_NAMESPACE = "lexical-editor";

export const EDITOR_NODES = [
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

export const theme = {
  text: {
    bold: "textBold",
    italic: "textItalic",
    underline: "textUnderline",
    strikethrough: "textStrikethrough",
  },
  list: {
    nested: {
      list: "editorListNested",
      listItem: "editorListItem",
    },
    ol: "editorListOl",
    ul: "editorListUl",
    listItem: "editorListItem",
  },
};

function onError(error: Error): void {
  console.error(error);
}

export const initialConfig = {
  namespace: EDITOR_NAMESPACE,
  theme,
  onError,
  nodes: EDITOR_NODES,
};

export const LowPriority = 1;
