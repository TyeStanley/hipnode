import * as z from "zod";

export const formSchema = z.object({
  groupName: z.string().min(2, {
    message: "Group name must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description name must be at least 5 characters.",
  }),
});
