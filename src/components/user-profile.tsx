"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
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
import { getUserInfo, editUserInfo } from '@/services/user';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const fetchUserProfile = async () => {
                try {
                    const userProfile = await getUserInfo();
                    setUsername(userProfile.name);
                    setPhotoUrl(userProfile.photo);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUserProfile();
        }
    }, [isOpen]);

    const handleSave = async () => {
        try {
            await editUserInfo({ name: username, photo: photoUrl });
            onClose();
        } catch (error) {
            console.error('Error saving user profile:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogDescription>Edit your profile information</DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <Label>Username</Label>
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Label>Photo URL</Label>
                        <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                    </>
                )}
                <DialogFooter>
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserProfileModal;