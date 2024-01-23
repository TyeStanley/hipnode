"use server";

import { Resend } from "resend";

import EmailTemplate from "@/components/email/email-templates";
import { EmailData } from "@/types/posts";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: EmailData) {
  const { selectedComplaintTag, currentUrl } = data;

  if (data) {
    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["alexmonk17@gmail.com", "glen.mccallum@live.co.uk"],
        subject: selectedComplaintTag,
        react: EmailTemplate({
          selectedComplaintTag,
          currentUrl,
        }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
}
