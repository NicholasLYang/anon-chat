import React from "react";
//@ts-ignore
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT, HEADERS } from "../constants";
import {
  resourceToConversation,
  MessageResource,
  resourceToMessage
} from "../lib/jsonApi";
import { Request, Conversation } from "../types";
import uuidv1 from "uuid/v1";
import ChatMessages from "./ChatMessages";

interface Props {}

interface State {
  error?: string;
  userIndex?: number;
  uuid: string;
  activeConversation?: Conversation;
}

class ChatBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let uuid = localStorage.getItem("uuid");
    if (!uuid) {
      uuid = uuidv1();
      localStorage.setItem("uuid", uuid);
    }
    this.state = {
      error: undefined,
      userIndex: undefined,
      activeConversation: undefined,
      uuid
    };
  }

  handleReceivedMessage = (request: Request<MessageResource>) => {
    const resource = request.data;
    const message = resourceToMessage(resource);
    const { activeConversation } = this.state;
    if (activeConversation) {
      activeConversation.messages = [...activeConversation.messages, message];
      this.setState({ activeConversation });
    } else {
      throw Error("Conversation does not exist");
    }
  };

  connectToConvo = () => {
    fetch(`${API_ROOT}/conversations`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ uuid: this.state.uuid })
    })
      .then(res => res.json())
      .then(res => {
        console.log("RES");
        console.log(res);
        if (!res.data) {
          throw Error("No conversation!");
        }
        const activeConversation = resourceToConversation(res.data);
        const userIndex = res.user_index;
        this.setState({ activeConversation, userIndex });
        return fetch(
          `${API_ROOT}/conversations/${activeConversation.id}/messages`
        );
      })
      .then(res => res.json())
      .then(res => {
        if (!res.data) {
          throw Error("Could not fetch messages for conversation!");
        }
        const messages = res.data.map((resource: MessageResource) =>
          resourceToMessage(resource)
        );

        const { activeConversation } = this.state;
        if (activeConversation) {
          activeConversation.messages = messages;
          this.setState({ activeConversation });
        }
      });
  };

  render() {
    const { activeConversation, uuid, userIndex } = this.state;
    if (activeConversation) {
      return (
        <div>
          <ActionCableConsumer
            channel={{
              channel: "MessagesChannel",
              conversation: activeConversation.id
            }}
            onReceived={this.handleReceivedMessage}
          />
          <ChatMessages
            uuid={uuid}
            conversation={activeConversation}
            userIndex={userIndex}
          />
        </div>
      );
    }
    return (
      <div>
        <button onClick={this.connectToConvo}> Connect </button>
      </div>
    );
  }
}

export default ChatBox;
