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
    }[];
  };
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const messagesState = useChatStore((state) => state.messages);

  const sendMessage = (newMessage: Message) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));
  };

  const convertedMessages = messages.map(msg => ({
    id: msg.senderId,
    avatar: selectedUser.avatar,
    name: msg.name,
    message: msg.text,
    isLoading: msg.isLoading,
    timestamp: new Date().toLocaleTimeString()
  }));

  const convertedUser: UserData = {
    id: 1,
    name: selectedUser.name,
    avatar: selectedUser.avatar,
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
      />

      <ChatBottombar isMobile={isMobile} />
    </div>
  );
}
