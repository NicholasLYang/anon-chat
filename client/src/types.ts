export interface Message {
  id: string;
  text: string;
  conversationId: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

// Standard Rails format
export interface Request<T> {
  data: T;
}
