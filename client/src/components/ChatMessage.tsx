import React from 'react';

interface Props {
  text: string;
}

const messageStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  width: '200px',
  alignItems: 'flex-end',
  padding: '10px',
  borderRadius: '10px',
  backgroundColor: '#09f',
  margin: '10px'
};

const ChatMessage: React.FunctionComponent<Props> = ({ text }) => {
  return <div style={messageStyle}>{text}</div>;
};

export default ChatMessage;
