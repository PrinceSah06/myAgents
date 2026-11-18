import React from "react";
import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";

const MessageList = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages } = useSelector((state) => state.message);
  return (
    <div
      className="flex-1 overflow-auto px-6 py-6 space-y-6 
     [scrollbar-width:none] [&::-webkit-scrollbar-width]:hidden"
    >
      {!selectedConversation ? (
        <div
          className="h-full flex flex-col items-center justify-center gap-4 text-center
"
        >
          <p className="text-sm text-slate-500">Create or select a chat to get started.</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-xl font-semibold text-slate-200 tracking-tight">How can I help you?</h1>
          <p className="text-sm text-slate-500">Ask me anything — code, explanations, or a quick question.</p>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {/* {messages.map((message, index) => (
            <div
              key={message?._id ?? `${message?.role}-${index}`}
              className={`flex ${message?.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${message?.role === "user" ? "bg-indigo-500 text-white" : "bg-white/[0.06] text-slate-200"}`}>
                {message?.content}
              </div>
            </div>
          ))} */}

          {messages.map((msg, i) => (
            <div key={msg?._id ?? `${msg?.role}-${i}`}>
              <MessageBubble content={msg?.content} role={msg?.role} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
