"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserInfo, editUserInfo } from '@/services/user';

interface UserProfilePageProps {
    onClose: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    const handleSave = async () => {
        try {
            await editUserInfo({ name: username, photo: photoUrl });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving user profile:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Edit your profile information</CardDescription>
            </CardHeader>
            <CardContent>
                <Label>Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                <Label>Photo URL</Label>
                <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={onClose}>Close</Button>
            </CardContent>
        </Card>
    );
};

export default UserProfilePage;