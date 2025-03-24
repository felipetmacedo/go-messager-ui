import { Message, UserData } from "../../app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import useChatStore from "../../hooks/use-chat-store";
import ChatBottombar from "./chat-bottombar";

interface ChatProps {
  messages: {
    receiverId: number;
    senderId: number;
    name: string;
    text: string;
    isLoading?: boolean;
    time?: string;
  }[];
  selectedUser: {
    name: string;
    avatar: string;
    messages: {
      receiverId: number;
      senderId: number;
      name: string;
      text: string;
      isLoading?: boolean;
      time?: string;
    }[];
  };
  isMobile: boolean;
  currentUserId: number;
  receiver: {
    id: number;
    name: string;
    avatar: string;
  };
}

export function Chat({ messages, selectedUser, isMobile, currentUserId, receiver }: ChatProps) {
  const messagesState = useChatStore((state) => state.messages);

  const sendMessage = (newMessage: Message) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));
  };

  const convertedMessages = messages.map(msg => ({
    id: msg.senderId,
    avatar: msg.senderId === currentUserId ? selectedUser.avatar : receiver.avatar,
    name: msg.senderId === currentUserId ? "You" : receiver.name,
    message: msg.text,
    isLoading: msg.isLoading,
    timestamp: new Date(msg.time || new Date()).toLocaleTimeString(),
    isSender: msg.senderId === currentUserId
  }));

  const convertedUser: UserData = {
    id: receiver.id,
    name: receiver.name,
    avatar: receiver.avatar,
    messages: convertedMessages
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={convertedUser} />

      <ChatList
        messages={convertedMessages}
        selectedUser={convertedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
        currentUserId={currentUserId}
      />

      <ChatBottombar isMobile={isMobile} />
    </div>
  );
}
