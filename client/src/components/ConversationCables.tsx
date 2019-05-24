import React, { Fragment } from "react";
import { Request, Conversation } from "../types";
import { MessageResource } from "../lib/jsonApi";
//@ts-ignore
import { ActionCableConsumer } from "react-actioncable-provider";

interface Props {
  conversations: { [s: string]: Conversation };
  handleReceivedMessage: (resource: Request<MessageResource>) => void;
}
const ConversationCables: React.FunctionComponent<Props> = ({
  conversations,
  handleReceivedMessage
}) => {
  return (
    <Fragment>
      {Object.values(conversations).map((conversation: Conversation) => (
        <ActionCableConsumer
          key={conversation.id}
          channel={{
            channel: "MessagesChannel",
            conversation: conversation.id
          }}
          onReceived={handleReceivedMessage}
        />
      ))}
    </Fragment>
  );
};

export default ConversationCables;
