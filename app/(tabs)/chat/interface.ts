export interface aMessage {
  id: number;
  name: string;
  script: string;
  createdAt: string;
  readAt: string | null;
}
export interface ChatListProps {
  item: aMessage;
  isCurrentUser: (item: aMessage) => boolean;
}

export interface AvatarInfo {
  src: string;
  alt: string;
}
