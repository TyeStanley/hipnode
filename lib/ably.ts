import * as Ably from "ably";

export const client = new Ably.Realtime.Promise({
  key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
  clientId: "hipnode",
});
