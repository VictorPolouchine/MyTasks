"use client"
import { createClient } from "@/utils/supabase/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
export default function ConnectionForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleLogin = async (e: FormEvent) => {
        const supabase = createClient()
        e.preventDefault();
        const { error } = await supabase.auth.signInWithOtp({
            email, options: {
                // set this to false if you do not want the user to be automatically signed up
                shouldCreateUser: true,
                emailRedirectTo: "https://localhost:3000",
            }
        });
        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Un lien magique a été envoyé à votre adresse email.');
        }
    };

    return (
        <>
            <form className="flex-1 flex flex-col min-w-64" onSubmit={handleLogin}>
                <h1 className="text-2xl font-medium">Sign in / Sign up</h1>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email"
                        value={email}
                        onChange={(e: ChangeEvent) => setEmail((e.target as HTMLInputElement).value)}
                        placeholder="Votre email"
                        required />
                </div>
                <SubmitButton pendingText="Signing In / Up..." type="submit">
                    Sign in / Sign up
                </SubmitButton>
            </form>

            {message && <p>{message}</p>}
        </>)

}