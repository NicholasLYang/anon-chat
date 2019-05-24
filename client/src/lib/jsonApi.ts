import { Relationship, ResourceObject } from "ts-json-api";
import { Conversation, Message } from "../types";

export interface MessageResource extends ResourceObject {
  type: "message";
  attributes: { text: string; conversationId: string; createdAt: string };
}

export interface ConversationResource extends ResourceObject {
  type: "conversation";
  attributes: { title: string };
  relationships: { messages: Relationship<Array<MessageResource>> };
}

export function resourceToMessage(resource: MessageResource): Message {
  return {
    ...resource.attributes,
    id: resource.id,
    conversationId: resource.attributes.conversationId.toString()
  };
}

export function resourceToConversation(
  resource: ConversationResource,
  messages: Message[]
): Conversation {
  return {
    ...resource.attributes,
    id: resource.id,
    messages
  };
}
