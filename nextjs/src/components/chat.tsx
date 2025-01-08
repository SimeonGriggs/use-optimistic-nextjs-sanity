"use client";

import { deliverMessage } from "@/actions/deliver-message";
import { Message } from "@/types";
import { Thread } from "@/components/thread";

type ChatProps = {
  messages: Message[];
  chatId: string;
};

export function Chat({ messages, chatId }: ChatProps) {
  async function sendMessage(message: Message) {
    await deliverMessage(message, chatId);
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
