
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { AccessLevel } from '@/context/auth-context';

const LIMITED_ACCESS_KEY = 's';
const FULL_ACCESS_KEY = 's';
const SETUP_USERNAME = 'sagar';

interface UnlockScreenProps {
  onUnlock: (accessLevel: AccessLevel) => void;
  isRelocking?: boolean;
}

export default function UnlockScreen({ onUnlock, isRelocking = false }: UnlockScreenProps) {
    const [keyInput, setKeyInput] = useState('');
    const [error, setError] = useState('');
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (keyInput === FULL_ACCESS_KEY) {
            if (isRelocking) {
                // If re-locking, onUnlock is the `unlockApp` function,
                // but we call the full login flow to handle potential access level change.
                onUnlock('full');
            } else {
                toast({
                  title: `Welcome back, ${SETUP_USERNAME}!`,
                  description: "Full access granted.",
                });
                onUnlock('full');
            }
        } else if (keyInput === LIMITED_ACCESS_KEY) {
             if (isRelocking) {
                onUnlock('limited');
            } else {
                toast({
                  title: `Welcome back, User`,
                });
                onUnlock('limited');
            }
        } else {
            setError('The key is incorrect. Try again.');
        }
    };

    return (
        <Card className="w-full max-w-sm animate-in fade-in-50 zoom-in-95 duration-500 card-glass">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <GraduationCap className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4 text-2xl">Welcome Back</CardTitle>
                <CardDescription>Please enter your password to unlock.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="key-input">Password</Label>
                            <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="key-input"
                                type="password"
                                value={keyInput}
                                onChange={(e) => setKeyInput(e.target.value)}
                                placeholder="••••••••"
                                className="pl-9"
                                required
                                autoFocus
                            />
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive text-center">{error}</p>}
                    <Button type="submit" className="w-full">Unlock</Button>
                </form>
            </CardContent>
        </Card>
    );
}
