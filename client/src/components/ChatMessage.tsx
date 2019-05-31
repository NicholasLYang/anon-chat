import React from 'react';
import { Message } from '../types';

interface Props {
  id: string;
  text: string;
}

const ChatMessage: React.FunctionComponent<Props> = ({ id, text }) => {
  return <div>{this.prop.text}</div>;
};

export default ChatMessage;
