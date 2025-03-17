import React from "react";
import Image from "next/image";

interface ChatProps {
  chatImage: string;
  chatName: string;
  lastMessage: string;
  senderName: string;
}

const Chat: React.FC<ChatProps> = ({
  chatImage,
  chatName,
  lastMessage,
  senderName,
}) => {
  return (
    <div className="chat">
      <Image src={chatImage} alt={chatName} className="chat-image" />
      <div className="chat-details">
        <h2 className="chat-name">{chatName}</h2>
        <p className="chat-last-message">
          <span className="sender-name">{senderName}: </span>
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default Chat;
