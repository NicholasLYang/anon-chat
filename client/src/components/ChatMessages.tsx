import React from "react";
import { Conversation, Message } from "../types";
import NewMessageForm from "./NewMessageForm";

interface Props {
  conversation: Conversation | undefined;
  userIndex?: number;
  uuid: string;
}

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
      <ul>
        {sortedMessages.map(message => {
          return (
            <li
              style={
                userIndex === message.userIndex
                  ? { backgroundColor: "blue" }
                  : { backgroundColor: "white" }
              }
              key={message.id}
            >
              {message.text}
            </li>
          );
        })}
      </ul>
      {userIndex && <NewMessageForm userIndex={userIndex} conversationId={conversation.id} />}
    </div>
  );
};

const sortMessages = (messages: Message[]) => {
  return messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

export default ChatMessages;
