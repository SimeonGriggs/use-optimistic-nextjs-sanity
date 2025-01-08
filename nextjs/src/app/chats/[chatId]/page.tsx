import { Chat } from "@/components/chat";
import { client } from "@/sanity/client";
import { CHAT_MESSAGES_BY_ID_QUERY } from "@/sanity/queries";
import { notFound } from "next/navigation";

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  const queryParams = await params;
  const messages = await client.fetch(CHAT_MESSAGES_BY_ID_QUERY, queryParams);

  if (!messages) {
    notFound();
  }

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="bg-white p-8 rounded shadow">
        <Chat messages={messages} chatId={queryParams.chatId} />
      </div>
    </div>
  );
}
