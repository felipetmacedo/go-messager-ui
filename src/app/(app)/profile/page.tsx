import { cookies } from "next/headers";
import { ChatLayout } from "@/components/chat/chat-layout";
import UserProfileModal from "@/components/user-profile"; 
import { useState } from "react";

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-full">
      <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      <Button onClick={() => setIsProfileOpen(true)}>Open Profile</Button>
      {isProfileOpen && (
        <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      )}
    </div>
  );
}