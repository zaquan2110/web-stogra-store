export type ChatSender = "customer" | "staff" | "system";

export type ChatMessageStatus = "sent" | "read" | "failed";

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: ChatSender;
  senderName: string;
  message: string;
  status: ChatMessageStatus;
  createdAt: string;
}

export interface CreateChatMessageInput {
  conversationId?: string;
  senderName: string;
  message: string;
}

export interface ChatApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
