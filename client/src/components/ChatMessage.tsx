import React from 'react';
import { Message } from '../types';

interface Props {
  id: string;
  text: string;
}

const ChatMessage: React.FunctionComponent<Props> = ({ id, text }) => {
  return <div>{text}</div>;
};

export default ChatMessage;
