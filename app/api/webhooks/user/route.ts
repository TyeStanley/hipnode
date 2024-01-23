/* eslint-disable camelcase */
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { clerkClient, type UserJSON } from "@clerk/nextjs/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

const webhookSecret = process.env.WEBHOOK_SECRET || "";
type User = Omit<UserJSON, "username">;
interface IUser extends User {
  username: string;
}

type EventType = "user.updated" | "user.deleted" | "user.created" | "*";
type Event = {
  data: IUser;
  object: "event";
  type: EventType;
};

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let event: Event | null = null;

  try {
    event = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = event.type;

  if (eventType === "user.updated") {
    const { id, username, first_name, last_name, image_url, email_addresses } =
      event.data;

    const emailAddress = email_addresses[0].email_address;

    const updatedUser = await updateUser(id, {
      clerkId: id,
      name: `${first_name} ${last_name}`,
      username,
      email: emailAddress,
      picture: image_url,
    });

    if (updatedUser) {
      return NextResponse.json({ data: updatedUser });
    } else {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 400 }
      );
    }
  } else if (eventType === "user.deleted") {
    const { id } = event.data;

    const deletedUser = await deleteUser(id.toString());

    if (deletedUser) {
      return NextResponse.json({ data: deletedUser });
    } else {
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 400 }
      );
    }
  } else if (eventType === "user.created") {
    const { id, username, first_name, last_name, image_url, email_addresses } =
      event.data;
    const emailAddress = email_addresses[0].email_address;

    const user = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name}`,
      username,
      picture: image_url,
      email: emailAddress,
    });

    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        userId: user?.id,
      },
    });

    if (user) {
      return NextResponse.json({ data: user });
    } else {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Unhandled event type" },
      { status: 400 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
