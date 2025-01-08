import { Chat } from "@/components/chat";
import { client } from "@/sanity/client";
import { CHAT_IDS_QUERY } from "@/sanity/queries";
import Link from "next/link";

export default async function Home() {
  const chats = await client.fetch(CHAT_IDS_QUERY);

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="bg-white p-8 rounded shadow">
        {chats.map((chatId) => (
          <Link className="underline" key={chatId} href={`/chats/${chatId}`}>
            {chatId}
          </Link>
        ))}
        {/* <Chat /> */}
      </div>
    </div>
  );
}
