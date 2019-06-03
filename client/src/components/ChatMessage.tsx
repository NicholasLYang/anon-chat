import React from 'react';
import { Message } from '../types';

interface Props {
  text: string;
}

const ChatMessage: React.FunctionComponent<Props> = ({ text }) => {
  return <div>{text}</div>;
};

export default ChatMessage;
