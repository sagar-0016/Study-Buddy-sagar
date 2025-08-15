
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { AccessLevel } from '@/context/auth-context';

const LIMITED_ACCESS_KEY = 'p';
const FULL_ACCESS_KEY = '_';
const SETUP_USERNAME = 'pranjal';

interface UnlockScreenProps {
  onUnlock: (accessLevel?: AccessLevel) => void;
  isRelocking?: boolean;
}

export default function UnlockScreen({ onUnlock, isRelocking = false }: UnlockScreenProps) {
    const [keyInput, setKeyInput] = useState('');
    const [error, setError] = useState('');
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const storedAccessLevel = typeof window !== 'undefined' 
            ? localStorage.getItem('study-buddy-access-level') as AccessLevel | null 
            : null;

        if (isRelocking) {
            // Re-locking just checks if the key matches the currently stored access level
            const correctKey = storedAccessLevel === 'full' ? FULL_ACCESS_KEY : LIMITED_ACCESS_KEY;
            if (keyInput === correctKey) {
                // onUnlock here is the `unlockApp` function from context, which doesn't need an arg
                onUnlock(); 
            } else {
                 setError('The key is incorrect. Try again.');
            }
        } else {
            // This is the initial login flow. It determines the access level.
            if (keyInput === FULL_ACCESS_KEY) {
                toast({
                  title: `Welcome back, ${SETUP_USERNAME}!`,
                  description: "Full access granted.",
                });
                onUnlock('full');
            } else if (keyInput === LIMITED_ACCESS_KEY) {
                toast({
                  title: `Welcome back, User`,
                });
                onUnlock('limited');
            }
            else {
                setError('The key is incorrect. Try again.');
            }
        }
    };

    return (
        <Card className="w-full max-w-sm animate-in fade-in-50 zoom-in-95 duration-500">
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
