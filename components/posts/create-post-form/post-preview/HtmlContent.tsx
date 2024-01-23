import React from "react";

const HtmlContent = ({ htmlString }: { htmlString: string }) => (
  <>
    {htmlString && htmlString.length > 11 ? (
      <p
        className="text-[0.875rem] leading-[1.5rem] text-sc-3 dark:text-sc-3 md:text-[1rem]"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    ) : (
      <p className="animate-pulse  rounded px-12 md:text-[1rem} pl-4 px-2 py-8 mb-[1.25rem] rounded bg-gray-200 text-[0.875rem] leading-[1.5rem] text-sc-3 dark:bg-gray-700 dark:text-sc-3">
        Your media content......
      </p>
    )}
  </>
);

export default HtmlContent;
