"use client";

import DOMPurify from "isomorphic-dompurify";

interface SanatizedHtmlProps {
  content: string;
}

const SanatizedHtml = ({ content }: SanatizedHtmlProps) => {
  function cleanString(inputString: string) {
    let result = inputString.replace(/^['"]|['"]$/g, "");
    result = result.replace(/\\"/g, '"');
    return DOMPurify.sanitize(result);
  }

  const contentToDisplay = cleanString(content);

  return <div dangerouslySetInnerHTML={{ __html: contentToDisplay }} />;
};

export default SanatizedHtml;
