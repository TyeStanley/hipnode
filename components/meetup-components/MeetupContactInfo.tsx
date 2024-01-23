"use client";

import { useToast } from "@/components/ui/use-toast";

import { MeetupContactInfoProps } from "@/types/meetups.index";

const MeetupContactInfo = ({
  location,
  contactNumber,
  contactEmail,
}: MeetupContactInfoProps) => {
  const { toast } = useToast();
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          description: `${text} copied to clipboard`,
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sc-2_light-2">
        Address:{" "}
        <span
          className="cursor-pointer text-sc-3"
          onClick={() => copyToClipboard(location)}
        >
          {location}
        </span>
      </p>
      <p className="text-sc-2_light-2">
        Contact Number:{" "}
        <span
          className="cursor-pointer text-sc-3"
          onClick={() => copyToClipboard(contactNumber)}
        >
          {contactNumber}
        </span>
      </p>
      <p className="text-sc-2_light-2">
        Contact Email:{" "}
        <span
          className="cursor-pointer text-sc-3"
          onClick={() => copyToClipboard(contactEmail)}
        >
          {contactEmail}
        </span>
      </p>
    </div>
  );
};

export default MeetupContactInfo;
