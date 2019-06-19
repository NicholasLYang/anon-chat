import React, { CSSProperties } from "react";
import { Conversation, Message } from "../types";
import ChatMessage from "./ChatMessage";
import { MemberExpression } from "@babel/types";

interface Props {
  conversation: Conversation;
  userIndex: number;
  message: Message;
  uuid: string;
}

const getMessageStyle = (
  userIndex: number,
  message: Message
): CSSProperties => {
  if (userIndex === 1) {
    return { backgroundColor: "#ededed", color: "black" };
  }
  if (userIndex === message.userIndex) {
    return { backgroundColor: "#09f", color: "white" };
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
            <ChatMessage
              userIndex={userIndex}
              key={message.id}
              text={message.text}
            />
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
