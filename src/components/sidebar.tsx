"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Message } from "@/app/data";
import { useState } from "react";
import UserProfileModal from "@/components/user-profile";

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

export function Sidebar({ chats, isCollapsed, isMobile }: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full bg-muted/10 dark:bg-muted/20 gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span>({chats.length})</span>
          </div>

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
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
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between h-full ">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {chats.map((chat, index) =>
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
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
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
                  "justify-start gap-4",
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
                      {chat.messages[chat.messages.length - 1].name.split(" ")[0]}
                      :{" "}
                      {chat.messages[chat.messages.length - 1].isLoading
                        ? "Typing..."
                        : chat.messages[chat.messages.length - 1].message}
                    </span>
                  )}
                </div>
              </Link>
            ),
          )}  
        </nav>
        <div
          className={cn(
            "flex items-center py-2 cursor-pointer",
            isCollapsed ? "justify-center" : "justify-start px-10"
          )}
          onClick={() => setIsProfileOpen(true)}
        >
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={
                "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              }
              alt={"teste"}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          {!isCollapsed && <span className="ml-4">User Name</span>}
        </div>
      </div>
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}