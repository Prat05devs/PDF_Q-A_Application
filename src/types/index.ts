export interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  size: number;
}

export interface Message {
  id: string;
  content: string;
  type: 'question' | 'answer';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  documentId: string;
  messages: Message[];
}