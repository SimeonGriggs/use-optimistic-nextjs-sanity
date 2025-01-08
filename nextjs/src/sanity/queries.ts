import { defineQuery } from "next-sanity";

export const CHAT_IDS_QUERY = defineQuery(`*[_type == "chat"]._id`);

export const CHAT_MESSAGES_BY_ID_QUERY = defineQuery(`
    *[_id == $chatId][0]{
        messages[]{
            "key": _key,
            "text": coalesce(text, "")
        }
    }.messages
`);
