
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, KeyRound, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// The secret key letter for subsequent logins.
const SECRET_KEY = 'p';

export default function LoginScreen() {
    const { login } = useAuth();
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // State for first-time setup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // State for subsequent logins
    const [keyInput, setKeyInput] = useState('');

    const [error, setError] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('study-buddy-user');
            if (!storedUser) {
                setIsFirstTime(true);
            }
        } catch (error) {
            console.error("Could not access local storage", error);
            setError("Local storage is disabled. Please enable it to use the app.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFirstTimeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please provide a username and password.');
            return;
        }
        const userData = { username, password };
        try {
            localStorage.setItem('study-buddy-user', JSON.stringify(userData));
            toast({
                title: `Welcome, ${username}!`,
                description: "Your setup is complete. You'll use your secret key next time.",
            });
            login();
        } catch (error) {
            setError("Could not save settings. Please ensure local storage is enabled.");
        }
    };

    const handleSubsequentLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const storedUser = localStorage.getItem('study-buddy-user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                if (keyInput === userData.password && keyInput === SECRET_KEY) {
                     toast({
                        title: `Welcome back, ${userData.username}!`,
                     });
                    login();
                } else {
                    setError('The key is incorrect. Try again.');
                }
            } else {
                 setError('No user data found. Please refresh to set up.');
                 setIsFirstTime(true);
            }
        } catch (error) {
             setError("Could not verify. Please ensure local storage is enabled.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
            <Card className="w-full max-w-sm animate-in fade-in-50 zoom-in-95 duration-500">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <GraduationCap className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="mt-4 text-2xl">
                        {isFirstTime ? 'Welcome to Your Study Buddy' : 'Welcome Back, Pranjal'}
                    </CardTitle>
                    <CardDescription>
                        {isFirstTime ? 'Let\'s get you set up for the first time.' : 'Please enter your secret key to continue.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isFirstTime ? (
                        <form onSubmit={handleFirstTimeSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                     <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                     <Input 
                                        id="username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        placeholder="e.g., Pranjal"
                                        className="pl-9"
                                        required 
                                     />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Secret Key (A single letter)</Label>
                                 <div className="relative">
                                     <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your secret letter"
                                        maxLength={1}
                                        className="pl-9"
                                        required 
                                    />
                                 </div>
                            </div>
                             {error && <p className="text-sm text-destructive text-center">{error}</p>}
                             <Button type="submit" className="w-full">Save & Continue</Button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubsequentLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="key-input">Secret Key</Label>
                                 <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="key-input"
                                        type="password"
                                        value={keyInput}
                                        onChange={(e) => setKeyInput(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-9 text-center tracking-[0.5em]"
                                        required
                                    />
                                </div>
                            </div>
                            {error && <p className="text-sm text-destructive text-center">{error}</p>}
                            <Button type="submit" className="w-full">Unlock</Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
