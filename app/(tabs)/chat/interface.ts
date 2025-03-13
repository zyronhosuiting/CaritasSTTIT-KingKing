export interface aMessage {
  id: number;
  name: string;
  script: string;
}

export interface AvatarInfo {
  src: string;
  alt: string;
}
export interface ChatListProps {
  item: aMessage; // chat message details
  isCurrentUser: (item: aMessage) => boolean; // function to check if the message is from the current user
}
