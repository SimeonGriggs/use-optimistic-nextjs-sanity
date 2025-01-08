"use server";

import { client } from "@/sanity/client";
import { Message } from "@/types";
import { revalidatePath } from "next/cache";

export async function deliverMessage(message: Message, chatId: string) {
  const token = process.env.SANITY_WRITE_TOKEN;
  await client
    .withConfig({ token })
    .patch(chatId)
    .setIfMissing({ messages: [] })
    .append("messages", [
      {
        text: message.text,
        _key: message.key,
        _type: "message",
      },
    ])
    .commit();
  revalidatePath(`/chats/${chatId}`);
  return message;
}
