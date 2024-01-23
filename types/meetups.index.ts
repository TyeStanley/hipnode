import { MeetUp } from "@prisma/client";
import { FilterType } from ".";

export type MeetupTag = {
  id: number;
  name: string;
};

export interface MeetUpExtended extends MeetUp {
  tags: MeetupTag[];
  userCanEditMedia: boolean;
}

export interface MeetupsPageProps {
  meetupsData: {
    meetups: MeetUpExtended[];
    page: number;
    hasMore: boolean;
  };
  meetupFilters: number[] | undefined;
  loading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface MeetupFilterAndContentWrapperProps {
  meetupData: {
    meetups: MeetUpExtended[];
    page: number;
    hasMore: boolean;
  };
  meetupFilters: number[] | undefined;
  meetupTags: FilterType[];
}

export interface MeetupContactInfoProps {
  location: string;
  contactNumber: string;
  contactEmail: string;
}

export type MeetupWithTags = MeetUp & {
  tags: MeetupTag[];
};
