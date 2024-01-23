import { ElementType } from "react";

import { ShareIconsSectionProps } from "@/types/posts";
import ShareIconComponent from "./ShareIconComponent";

const ShareIconsSection = ({
  icons,
  hoveredIcon,
  setHoveredIcon,
  currentUrl,
}: ShareIconsSectionProps) => {
  return (
    <>
      {icons.map((icon) => {
        const ShareWrapper = icon.wrapper as ElementType;
        return (
          <ShareWrapper key={icon.label} title={icon.label} url={currentUrl}>
            <ShareIconComponent
              icon={icon}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />
          </ShareWrapper>
        );
      })}
    </>
  );
};

export default ShareIconsSection;
