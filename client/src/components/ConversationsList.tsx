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
  conversations: Conversation[];
  error?: string;
  activeConversation?: string;
}

class ConversationsList extends React.Component<Props, State> {
  state = {
    conversations: [],
    error: undefined,
    activeConversation: undefined
  };

  componentDidMount() {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const conversations = res.data.map((resource: ConversationResource) =>
            resourceToConversation(resource, [])
          );
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
    const conversation = resourceToConversation(resource, []);
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = (request: Request<MessageResource>) => {
    const resource = request.data;
    const message = resourceToMessage(resource);
    const conversations: Array<Conversation> = [...this.state.conversations];
    console.log(message);
    console.log(conversations);
    const conversation = conversations.find(
      conversation => conversation.id === message.conversationId
    );
    if (conversation) {
      conversation.messages = [...conversation.messages, message];
      this.setState({ conversations });
    } else {
      throw Error("Conversation does not exist");
    }
  };

  handleClick = (id: string) => () => {
    this.setState({ activeConversation: id });
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
        {this.state.conversations.length > 0 && (
          <ConversationCables
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        )}
        <ul>
          {conversations.map((convo: Conversation) => (
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
          <MessagesArea
            conversation={conversations.find(
              (convo: Conversation) => convo.id === activeConversation
            )}
          />
        )}
      </div>
    );
  }
}

export default ConversationsList;
