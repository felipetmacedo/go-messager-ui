"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserInfo, editUserInfo } from "@/services/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/utils/cloudinaryService";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchUserProfile = async () => {
        try {
          const userProfile = await getUserInfo();
          setUsername(userProfile.name);
          setPhotoUrl(userProfile.photo || "https://i.pinimg.com/474x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg");
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserProfile();
    }
  }, [isOpen]);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    setPhotoUrl(imageUrl || "");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editUserInfo({ name: username, photo: photoUrl });
      onClose();
    } catch (error) {
      console.error("Error saving user profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>Edit your profile information and click save.</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src={photoUrl} alt="User Photo" className="w-10 h-10" />
              </Avatar>
              <Button onClick={handleFileInput}>Change Photo</Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </div>
            <Label>Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            <Label>Photo URL</Label>
            <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </>
        )}
        <DialogFooter>
          <Button onClick={handleSave} disabled={isSaving}>{isSaving ? "Saving..." : "Save"}</Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;