import React, { useState } from "react";
import { Conversation, Message } from "../types";

interface Props {
  conversation: Conversation | undefined;
}

const MessagesArea: React.FunctionComponent<Props> = ({ conversation }) => {
  if (!conversation) {
    return null;
  }
  const { title, messages } = conversation;
  const sortedMessages = sortMessages(messages);
  return (
    <div className="messagesArea">
      <h2>{title}</h2>
      <ul>
        {sortedMessages.map(message => {
          return (
            <li
              key={message.id}
            >
              {message.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const sortMessages = (messages: Message[]) => {
  return messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

export default MessagesArea;
