import React from "react";
//@ts-ignore
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import MessagesArea from "./MessagesArea";
import {
  ConversationResource,
  resourceToConversation,
  MessageResource,
  resourceToMessage
} from "../lib/jsonApi";
import { Request, Conversation } from "../types";
import ConversationCables from "./ConversationCables";

interface Props {}
interface State {
  conversations: { [s: string]: Conversation };
  error?: string;
  activeConversation?: string;
}

class ConversationsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      conversations: {},
      error: undefined,
      activeConversation: undefined
    };
  }

  componentDidMount() {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const conversations: { [s: string]: Conversation } = {};
          res.data.forEach((resource: ConversationResource) => {
            conversations[resource.id] = resourceToConversation(resource);
          });
          this.setState({ conversations });
        } else {
          this.setState({
            error: "Could not fetch conversations, please refresh"
          });
        }
      });
  }

  handleReceivedConversation = (request: Request<ConversationResource>) => {
    const resource = request.data;
    const { conversations } = this.state;
    const conversation = resourceToConversation(resource);
    conversations[conversation.id] = conversation;
    this.setState({
      conversations
    });
  };

  handleReceivedMessage = (request: Request<MessageResource>) => {
    const resource = request.data;
    const message = resourceToMessage(resource);
    const { conversations } = this.state;
    const conversation = conversations[message.conversationId];
    if (conversation) {
      conversation.messages = [...conversation.messages, message];
      this.setState({ conversations });
    } else {
      throw Error("Conversation does not exist");
    }
  };

  handleClick = (id: string) => () => {
    fetch(`${API_ROOT}/messages`)
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const messages = res.data.map((resource: MessageResource) =>
            resourceToMessage(resource)
          );

          const { conversations } = this.state;
          const convo = conversations[id];
          convo.messages = messages;
          this.setState({ conversations });
        } else {
          throw Error("Could not fetch messages for conversation!");
        }
      })
      .then(() => {
        this.setState({ activeConversation: id });
      });
  };

  render() {
    const { conversations, activeConversation } = this.state;
    return (
      <div>
        <ActionCableConsumer
          channel="ConversationsChannel"
          onReceived={this.handleReceivedConversation}
        />
        <h2>Conversations</h2>
        {Object.keys(conversations).length > 0 && (
          <ConversationCables
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        )}
        <ul>
          {Object.values(conversations).map((convo: Conversation) => (
            <li key={convo.id}>
              <button onClick={this.handleClick(convo.id)}>
                {convo.title}
              </button>
            </li>
          ))}
        </ul>
        {/*<NewConversationForm />
         */}
        {activeConversation && (
          <MessagesArea conversation={conversations[activeConversation]} />
        )}
      </div>
    );
  }
}

export default ConversationsList;
