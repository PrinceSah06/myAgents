import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

const chatServiceUrl = (path) =>
  `${process.env.CHAT_SERVICE.replace(/\/$/, "")}${path}`;

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;
    const userId = req.get("x-user-id");

    if (!userId || typeof prompt !== "string" || !prompt.trim() || !conversationId) {
      return res.status(400).json({ message: "prompt and conversationId are required" });
    }

    const requestConfig = { headers: { "x-user-id": userId } };
    const messagePayload = {
      conversationId,
      role: "user",
      content: prompt.trim(),
    };
    await axios.post(chatServiceUrl("/save-message"), messagePayload, requestConfig);

    const result = await graph.invoke({
      prompt,
      conversationId,
      userId,
    });

    const response = result.aiResponse;

    if (typeof response !== "string" || !response) {
      throw new Error("The agent did not return a response");
    }

      await axios.post(chatServiceUrl("/save-message"), {
      conversationId,
      role: "assistant",
      content: response,
      }, requestConfig);


    await addMessage(conversationId, "assistant", response, userId);

    console.log("AI agent response form agen cntroler",response)
    return res.status(200).json({
      message: response,
    });
  } catch (error) {
    console.error("Agent chat request failed:", error.response?.data || error);
    return res.status(500).json({
      message: "Unable to generate a response",
    });
  }
};
