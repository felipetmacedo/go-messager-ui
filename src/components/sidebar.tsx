"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoreHorizontal, SquarePen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import api from "@/services/api";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Message } from "@/app/data";
import { ListUserButton } from "./list-users";

interface SidebarProps {
  isCollapsed: boolean;
  chats: {
    name: string;
    messages: Message[];
    avatar: string;
    variant: "secondary" | "ghost";
  }[];
  onClick?: () => void;
  isMobile: boolean;
}

interface Chat {
  id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
  };
  receiver_id: number;
  receiver: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
  };
  group_id?: number;
  avatar: string; // URL do avatar
  messages: {
    receiverId: number;
    senderId: number;
    name: string;
    text: string;
    isLoading?: boolean;
  }[];
  created_at: string;
  updated_at: string;
}

export function Sidebar({ isCollapsed, isMobile }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  // get all chats from back-end function
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);

        // get all individual chats from the user logged in
        const { data: individualChats } = await api.get("/chats/user");

        // map chats for expected format
        const mappedIndividualChats = individualChats.map((chat: any) => ({
          id: chat.id,
          name: chat.receiver?.name || chat.user.name,
          avatar: chat.receiver.avatar || chat.user.avatar,
          messages: chat.messages,
          variant: "secondary",
        }));

        console.log("INDIVIDUAL CHATS", individualChats);
        console.log("MAPPED CHATS", mappedIndividualChats);

        setChats([...mappedIndividualChats]);
      } catch (error) {
        console.error("Erro ao buscar os chats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  // filter chats by search term
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full bg-muted/10 dark:bg-muted/20 gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex flex-col gap-2">
          {/* chats search bar */}
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Pesquisar chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border rounded-md text-sm dark:bg-muted dark:text-white"
            />
          </div>
          <div className="flex justify-between p-2 items-center">
            <div className="flex gap-2 items-center text-2xl">
              <p className="font-medium">Chats</p>
              <span>({filteredChats.length})</span>
            </div>

            <div>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9"
                )}
              >
                <MoreHorizontal size={20} />
              </Link>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <ListUserButton />
            </Link>
          </div>
        </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {filteredChats.map((chat, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: chat.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      chat.variant === "secondary" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={chat.avatar}
                        alt={chat.avatar}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{chat.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {chat.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: chat.variant, size: "lg" }),
                chat.variant === "secondary" &&
                  "dark:bg-muted  dark:hover:bg-muted dark:hover:text-white shrink",
                "justify-start gap-4"
              )}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={chat.avatar}
                  alt={chat.avatar}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{chat.name}</span>
                {chat.messages.length > 0 && (
                  <span className="text-xs truncate ">
                    {chat.messages[chat.messages.length - 1]?.isLoading
                      ? "Typing..."
                      : chat.messages[chat.messages.length - 1]?.text ||
                        "Desconhecido"}
                  </span>
                )}
              </div>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
