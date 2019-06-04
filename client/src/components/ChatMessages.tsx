import React, { CSSProperties } from 'react';
import { Conversation, Message } from '../types';
import ChatMessage from './ChatMessage';

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
    return { backgroundColor: 'darkgray', color: 'white' };
  }
  if (userIndex === message.userIndex) {
    return { backgroundColor: 'blue', color: 'white' };
  }
  return { backgroundColor: 'white', color: 'black' };
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
          return <ChatMessage key={message.id} text={message.text} />;
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
