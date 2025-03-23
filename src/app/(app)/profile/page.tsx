"use client";

import React, { useEffect, useState} from 'react';
import Link from "next/link";
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

const UserProfilePage = () => {
    const [username, setUsername] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserInfo(); // como obter o ID?
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
        <Card className="mx-auto max-w-sm">
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
    );
};

export default UserProfilePage;