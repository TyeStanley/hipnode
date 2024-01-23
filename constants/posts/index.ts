/* eslint-disable no-unused-vars */
import * as z from "zod";

import OutlineIcon from "@/components/icons/outline-icons";

export enum POST_TYPE {
  POST = "Post",
  PODCAST = "Podcast",
  MEETUP = "Meetup",
  INTERVIEW = "Interview",
}

export const dynamicPostValidation = z
  .object({
    // POST -----------
    heading: z.string().min(3, {
      message: "The title has to contain at least 5 characters.",
    }),
    content: z
      .string()
      .min(9, { message: "Say a bit more....2 characters or more" }),

    image: z.string().nullish(),
    group: z.string().nullish(),
    contentType: z.nativeEnum(POST_TYPE, {
      required_error: "Required",
    }),
    tags: z
      .array(
        z
          .string()
          .min(1, "Each tag must be at least 1 character long")
          .max(10, "Each tag must be no more than 10 characters long")
      )
      .max(5, "You can only add up to 5 tags")
      .optional(),

    // PODCAST -----------
    show: z
      .object({
        label: z.string(),
        value: z.string(),
        __isNew__: z.boolean().optional(),
      })
      .nullish(),
    podcast: z.string().optional(),

    // MEETUPS -----------

    contactEmail: z.string().nullish(),
    contactNumber: z.string().nullish(),
    location: z.string().nullish(),

    // INTERVIEWS -----------

    websiteLink: z.string().nullish(),
    salary: z.any(),
    salaryPeriod: z.string().nullish(),
    updates: z.any(),
  })
  .refine(
    (data) => {
      switch (data.contentType) {
        case POST_TYPE.POST:
          if (
            !data.heading ||
            !data.content ||
            !data.group ||
            !data.image ||
            data.tags?.length === 0
          ) {
            return false;
          }
          break;
        case POST_TYPE.PODCAST:
          if (
            !data.heading ||
            !data.content ||
            !data.image ||
            !data.show

            // !data.podcast
          ) {
            return false;
          }
          break;
        case POST_TYPE.MEETUP:
          if (
            !data.contactEmail ||
            !data.contactNumber ||
            !data.location ||
            !data.content ||
            !data.heading ||
            !data.image ||
            data.tags?.length === 0
          ) {
            return false;
          }
          break;
        case POST_TYPE.INTERVIEW:
          if (
            !data.heading ||
            !data.content ||
            !data.image ||
            !data.websiteLink ||
            !data.salary ||
            !data.salaryPeriod ||
            !data.updates ||
            data.tags?.length === 0
          ) {
            return false;
          }
          break;
        default:
          return false;
      }

      return true;
    },
    { message: "Please fill in all the required fields." }
  );

export type PostFormValuesType = z.infer<typeof dynamicPostValidation>;

export const PostFormDefaultValues: PostFormValuesType = {
  heading: "",
  content: "",
  show: { label: "Select or create a show", value: "", __isNew__: undefined },
  image: "",
  podcast: "",
  group: "",
  contentType: POST_TYPE.POST,
  tags: [],

  websiteLink: "",
  salary: "",
  salaryPeriod: "",
  updates: "",

  contactEmail: "",
  contactNumber: "",
  location: "",
};

function createInputFields<T extends keyof PostFormValuesType>(
  fields: Array<{ name: T; label: string; placeholder: string; type?: string }>
) {
  return fields;
}

export const interviewInputFields = createInputFields([
  {
    placeholder: "Add website link",
    name: "websiteLink",
    label: "Website Link",
    type: "text",
  },
  {
    placeholder: "Add updates",
    name: "updates",
    label: "Updates",
    type: "text",
  },
  {
    placeholder: "Add salary",
    name: "salary",
    label: "Salary",
    type: "numerical",
  },
  {
    placeholder: "Add salary period",
    name: "salaryPeriod",
    label: "Salary Period",
    type: "text",
  },
]);

export const meetupInputFields = createInputFields([
  {
    placeholder: "Your email",
    name: "contactEmail",
    label: "Your email",
    type: "text",
  },
  {
    placeholder: "Your contact number",
    name: "contactNumber",
    label: "Your contact number",
    type: "text",
  },
]);

export const chatIcon = {
  label: "Chat",
  icon: OutlineIcon.Comment,
};

export const moreIcon = {
  label: "More",
  icon: OutlineIcon.Share2,
};
