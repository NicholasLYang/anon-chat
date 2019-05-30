export interface Message {
  id: string;
  text: string;
  userIndex: number;
  conversationId: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

// Standard Rails format
export interface RailsRequest<T> {
  data: T;
}
