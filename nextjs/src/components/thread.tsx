import { Message } from "@/types";
import { useOptimistic, useRef, useState } from "react";

type ThreadProps = {
  messages: Message[];
  sendMessage: (message: Message) => void;
};

export function Thread({ messages, sendMessage }: ThreadProps) {
  const [inputValue, setInputValue] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  async function formAction(formData: FormData) {
    const text = formData.get("message")?.toString();
    if (!text) {
      return;
    }
    const key = new Date().getTime().toString();
    addOptimisticMessage({ text, key });
    await sendMessage({ text, key });
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: Message) => {
      const messageExistsInState = state.some(
        (message) => message.key === newMessage.key
      );

      if (messageExistsInState) {
        return state;
      }

      return [
        ...state,
        {
          ...newMessage,
          sending: true,
        },
      ];
    }
  );

  return (
    <section className="flex flex-col gap-2">
      {optimisticMessages.map((message, index) => (
        <div key={index} className="p-2 bg-blue-50 rounded">
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form
        action={formAction}
        onSubmit={() => setInputValue("")}
        ref={formRef}
        className="flex gap-2"
      >
        <input
          type="text"
          name="message"
          placeholder="Hello!"
          className="border border-gray-400 p-2 rounded"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          className="border border-blue-500 text-white font-semibold bg-blue-500 p-2 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </section>
  );
}
