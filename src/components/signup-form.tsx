"use client";
import Link from "next/link";
import { useState, useRef } from "react";
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
import { uploadToCloudinary } from "@/utils/cloudinaryService";
import Image, { StaticImageData } from "next/image";
import { ProfileIcon } from "@/assets";
import signup from "@/services/auth";


export function SignupForm() {

  const [profilePicture, setProfilePicture] = useState<string | StaticImageData | null>(ProfileIcon);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password === confirmPassword;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    setProfilePicture(imageUrl);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordsMatch) return;
    try {
      await signup({
        name,
        email,
        password,
        url_img: profilePicture as string,
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Card className=" max-w-lg w-full p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account to join our community</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="profile_picture">Profile Picture</Label>
            <Input
              ref={fileInputRef}
              id="profile_picture"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="cursor-pointer hidden" />
            {profilePicture && <Image src={profilePicture} width={90} height={0} alt="Profile Picture" onClick={handleFileInput} className="rounded-full mx-auto border-2 border-primary cursor-pointer hover:opacity-60" />}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={!passwordsMatch ? "border-red-500" : ""}
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full "
              disabled={!passwordsMatch}
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
