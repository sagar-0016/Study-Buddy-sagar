
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Bot, User, Blend, Target } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export type MotivationMode = "ai" | "personal" | "mixed";

const ProfileCard = () => {
    return (
        <Card className="border-0 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal details and current focus.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
                 <Image
                    src="/avatar.png"
                    width={80}
                    height={80}
                    alt="Avatar"
                    className="overflow-hidden rounded-full border-2 border-primary p-1"
                />
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <p className="font-semibold text-lg">Pranjal</p>
                    </div>
                     <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-muted-foreground" />
                        <p className="font-semibold text-lg">IIT Delhi</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const DirectEditSettings = () => {
    const [isDirectEdit, setIsDirectEdit] = useLocalStorage('direct-edit-enabled', false);

    return (
        <Card className="border-0 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                    Control advanced features of the application.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="direct-edit-mode" className="text-base">
                            Bypass Discipline Check
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Enable direct editing of schedules without the reflection questions.
                        </p>
                    </div>
                    <Switch
                        id="direct-edit-mode"
                        checked={isDirectEdit}
                        onCheckedChange={setIsDirectEdit}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default function SettingsPage() {
    const [motivationMode, setMotivationMode] = useLocalStorage<MotivationMode>('motivation-mode', 'mixed');

    return (
        <div className="space-y-6">
            <ProfileCard />
            <Card className="border-0 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Motivation Corner</CardTitle>
                    <CardDescription>
                        Choose the style of motivational messages you'd like to receive on the home page. Your choice is saved on this device.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={motivationMode}
                        onValueChange={(value: string) => setMotivationMode(value as MotivationMode)}
                        className="space-y-4"
                    >
                        <Label
                            htmlFor="mixed"
                            className="flex flex-col items-start gap-4 rounded-lg border p-4 transition hover:bg-muted/50 [&:has([data-state=checked])]:border-primary"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="mixed" id="mixed" />
                                <Blend className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Mixed</p>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        A random mix of personal and AI-generated messages.
                                    </span>
                                </div>
                            </div>
                        
                        </Label>
                        <Label
                            htmlFor="personal"
                            className="flex flex-col items-start gap-4 rounded-lg border p-4 transition hover:bg-muted/50 [&:has([data-state=checked])]:border-primary"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="personal" id="personal" />
                                <User className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-semibold">Personal</p>
                                </div>
                            </div>
                        </Label>

                        <Label
                            htmlFor="ai"
                            className="flex flex-col items-start gap-4 rounded-lg border p-4 transition hover:bg-muted/50 [&:has([data-state=checked])]:border-primary"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="ai" id="ai" />
                                <Bot className="h-6 w-6 text-destructive" />
                                <div>
                                    <p className="font-semibold">AI Powered</p>
                                </div>
                            </div>
                        </Label>
                    </RadioGroup>
                </CardContent>
            </Card>
            <DirectEditSettings />
        </div>
    )
}
