import React, { CSSProperties } from "react";
import { Conversation, Message } from "../types";

interface Props {
  conversation: Conversation;
  userIndex: number;
  uuid: string;
}

const getMessageStyle = (
  message: Message,
  userIndex: number
): CSSProperties => {
  if (message.userIndex === -1) {
    return { backgroundColor: "darkgray", color: "white" };
  }
  if (userIndex === message.userIndex) {
    return { backgroundColor: "blue", color: "white" };
  }
  return { backgroundColor: "white", color: "black" };
};

const ChatMessages: React.FunctionComponent<Props> = ({
  conversation,
  userIndex
}) => {
  if (!conversation) {
    return null;
  }
  const { title, messages } = conversation;
  const sortedMessages = sortMessages(messages);
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {sortedMessages.map(message => {
          return (
            <div
              style={{
                ...getMessageStyle(message, userIndex),
                display: "flex",
                flexDirection: "column",
                width: "200px",
                alignItems: "flex-end",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#09f",
                margin: "10px"
              }}
              key={message.id}
            >
              {message.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const sortMessages = (messages: Message[]) => {
  return messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

export default ChatMessages;
