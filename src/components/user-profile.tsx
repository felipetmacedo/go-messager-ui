"use client";

import React, { useEffect, useState } from "react";
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

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [tempPhotoUrl, setTempPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const defaultImageBase64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAOVBMVEX///+ZmZmWlpbGxsaTk5OQkJD8/PydnZ3b29vx8fHu7u7AwMCmpqbl5eXp6emxsbHV1dW3t7fMzMyFEIGuAAAFIklEQVR4nO1c2bKbMAwF44XdkP//2JqEtEkwaLEgmY7P251p1IMsy9rsosjIyMjIyMjIyMj472FtW98636+Yu1vdWvttViuaYer60hitlSrvUEprY5TrpqH5Njtbz30ZqJURBJplP9dfVGRT+6AoFWX3JKm08fV39DhULq65rSZdNS52eim90ZeHqvvQY+nHS/kN3qDZrRyNH8IPr2HZzCWR3p2im6+xxabCmV6Eoq4uoDj0mkdvgemHU8nZwlac1X1RYlmdaoatNyn07kr0Jy7z4JLUtyrRDSftZntLsL5XhuZ2Br2iqATU94CuzuDXyejvwbATX2U7C/ILW2WWtkJJ/S1YdPjL/IIOO8lFrsT5hc0suJdrpHtWK3D/2tQy7Gwx4Nhp5+euqrrZIyPZUuhgtr1yMD3T18+YtBlrVLyoegErDCI8bICqnNv337UzzNBpn06wKCaYn+4/zSl8V42Iy/SUzq+Fl1f76FJZWPXKtbFfkoD4Xzobd2kW9p6pixx2MOhh9P6pFc5HSP+pvqbpQf0dbcXgAKDf92nxKxwCuvHo9yNowWkHSgOJB0O7CjQRl+IMYfEaEgGucUr02oA5CCTdYlTIt0JEkA/6sRYUodlW2IB7UMVd9Cushwgq9kaGfaBC2A+8DJrrC2EnphBn6QRL6Xn8GkSYiojoENGk4a0xJk8/9NIPjLAUnrO2HhFzIoIReBuXJbzXIoBPqVJKg8B5uQNEoCplg7zAFVNKQO1iDEFGGm8xpTYZP7iAboQYJ4M7STAEGY4GmayD1o3ZI6zAGleNgWMlOJq5y6EbIWplwiJDcnBVHUVOniyYjKyfDkXUyLKTo7byGoybvks+zkmQUuhRK65gVKZndU9Qz5IaKzgxL/4L6jaGo7i/2K0sFB1BCPWwuxF6Dnu1GUpXjxxxUQhGqlsFrrp1FcEgP1IfJEk4m+BSYZ2eFVY7TvSO/NkElwo6uUZ9LcEHSXyRP5XgCZ0RWYIEPSyjUBGQdEkmiHbUWjtf1dupmGasq9kp7EKQHTXyqNNmrtv9o66tZ4OkSD3qUEmnch0YhDQVbo6A2nXChFuqQzUR2g5hjORwCw5YtUN/NGIYgxywgiH/EsPgPxeKa+ghP5S3Uyc3AL+qZjJBIO0kp4nHboGRdh4m7pz+0OEXMxJ3e7CNeZ2DgwxZcZol+5k7d2JDWOK098Gsz12wX49ild92zxLNHjUY9uJEVgFzryylEkZydhYZUSSLYcd1sb52xc6qMHtNNmqEaTNNcRUaplFH6xbMnsaKqHflNnKCTcfMJYVf/Ihnt8Ji8wBsYSvq7Ufzm4mRxESlbJEFkW2S0NGORK08h/APEecVYlW20E19NMUJPrCJDA1fgXY7VEFOvjbYpIuuSVmUT2etE00wGOGHxMQ5x8+NrJPHyJsPgomDPZ9hJth1gPG+xImjUZvpQWmCAhOE7+N50gQFxvPe+8bCBCUGHN8XWZagzIjoezcmXdzrDhYa9X7tOlXJeBEmdn/oxdeoZEh5mDecMioveakEMS5LhZG8DmF//7pGYefk+2Bv/MQvvMiusrj+7pC7dJUe9sZxozbgdsCfCYUwOIFlVmfe7/z1q5PFz18+LRKv7+r+rHudL0i6AH3ZFXKGFnV50RXyBexL+NdhID9jcCm9BSPhIYjuWu09sTylAXH84lMad9jp4DEStTxGMn39VZfncy7m+ZzLEteHP1X/C8+5rFgexJl+9UGcjIyMjIyMjIyMjBPxB7s8Ofx2ncRQAAAAAElFTkSuQmCC";

  useEffect(() => {
    if (isOpen) {
      const fetchUserProfile = async () => {
        try {
          const userProfile = await getUserInfo();
          setUsername(userProfile.name);
          setPhotoUrl(userProfile.photo);
          setTempUsername(userProfile.name);
          setTempPhotoUrl(userProfile.photo);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserProfile();
    }
  }, [isOpen]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editUserInfo({ name: tempUsername, photo: tempPhotoUrl });
      setUsername(tempUsername);
      setPhotoUrl(tempPhotoUrl);
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
                <AvatarImage src={tempPhotoUrl || defaultImageBase64} alt="User Photo" className="w-10 h-10" />
              </Avatar>
              <Label>{username}</Label>
            </div>
            <Label>Username</Label>
            <Input value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} />
            <Label>Photo URL</Label>
            <Input value={tempPhotoUrl} onChange={(e) => setTempPhotoUrl(e.target.value)} />
          </>
        )}
        <DialogFooter>
          <Button onClick={handleSave} disabled={isSaving}>{isSaving ? "Saving..." : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
