import {
  Body,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Container } from "lucide-react";
import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import { HipnodeReportProps } from "@/types/posts";

import {
  mainStylesEmailTemplate,
  containerStylesEmailTemplate,
  sectionStylesEmailTemplate,
  textStylesEmailTemplate,
  linksStylesEmailTemplate,
  linkStylesEmailTemplate,
  footerStylesEmailTemplate,
  titleStylesEmailTemplate,
} from "@/constants/emailStyles";

export const HipnodeReport = ({
  selectedComplaintTag,
  currentUrl,
}: HipnodeReportProps) => {
  return (
    <Html>
      <Head />
      <Preview>{selectedComplaintTag}</Preview>
      <Body style={mainStylesEmailTemplate}>
        <Container style={containerStylesEmailTemplate}>
          <Text style={titleStylesEmailTemplate}>
            <strong>@{selectedComplaintTag}</strong>
          </Text>
          <Section style={sectionStylesEmailTemplate}>
            <Text style={textStylesEmailTemplate}>
              We are committed to responding to all complaints within 48 Hours
            </Text>
          </Section>
          <Text style={linksStylesEmailTemplate}>
            <Link href={currentUrl} style={linkStylesEmailTemplate}>
              Please look into this post, it has broken the Community Standards.
            </Link>
          </Text>
          <Text
            style={footerStylesEmailTemplate}
            className="py-6 text-center dark:text-light-2"
          >
            Hipnode ・Bulgaria, Poland, Canada & USA ・JS Mastery Graduates 2024
          </Text>
          <div className="flex justify-center">
            <HipnodeHeaderLogo />
          </div>
        </Container>
      </Body>
    </Html>
  );
};

export default HipnodeReport;
