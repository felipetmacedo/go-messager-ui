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

const UserProfilePage = ({ onClose }) => {
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
            console.error('Error saving profile:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Card className="relative mx-auto max-w-sm">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <CardHeader>
                    <CardTitle className="text-2xl">User Profile</CardTitle>
                    <CardDescription>
                        View and edit your profile information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="photo">Photo</Label>
                            {isEditing ? (
                                <Input
                                    id="photo"
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    required
                                />
                            ) : (
                                <img
                                    src={photoUrl || 'https://via.placeholder.com/150'}
                                    alt="User Photo"
                                    className="w-36 h-36 rounded-full border-4 border-white mb-5"
                                />
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            {isEditing ? (
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            ) : (
                                <h2 className="text-4xl m-0">{username}</h2>
                            )}
                        </div>
                        <Button onClick={() => setIsEditing(!isEditing)} className="w-full">
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfilePage;