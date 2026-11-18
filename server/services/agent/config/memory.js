import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../utils/getMessages.js";
const getMemory = async (conversationId, userId) => {
  const key = `messages-${conversationId}`;

  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const msg = await getMessages(conversationId, userId);

  await redis.set(key, JSON.stringify(msg), "EX", 24 * 60 * 60);

  return msg;
};

export const addMessage = async (conversationId, role, content, userId) => {
  const key = `messages-${conversationId}`;

  const messages = await getMemory(conversationId, userId);

  messages.push({ role, content });

  if (messages.length > 20) {
    messages.shift();
  }

  await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);



};

export default getMemory;

// 815
