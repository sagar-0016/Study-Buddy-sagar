
"use client";

import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/context/auth-context';
import LoginFlow from '@/components/auth/login-flow';
import { getUnreadMessages, markMessageAsRead } from '@/lib/messages';
import { useToast } from '@/hooks/use-toast';
import { MessageSquareWarning } from 'lucide-react';
import UnlockScreen from '@/components/auth/unlock-screen';
import type { AccessLevel } from '@/context/auth-context';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLocked, login, lockApp, unlockApp } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const lock = () => {
      if (isAuthenticated && !isLocked) {
        lockApp();
      }
    }
    
    // For tab/window switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lock();
      }
    };
    
    // For app/desktop switching
    window.addEventListener('blur', lock);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', lock);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, isLocked, lockApp]);

  useEffect(() => {
    const logAppOpenAndCheckMessages = async () => {
      try {
        if (isAuthenticated) {
            const accessLevel = localStorage.getItem('study-buddy-access-level') as AccessLevel | 'unknown';
            
            if (accessLevel !== 'full') {
              console.log("Access level is not 'full', skipping message check.");
              return;
            }

            const messages = await getUnreadMessages();
            messages.forEach(async (msg) => {
                toast({
                    title: (
                        <div className="flex items-center gap-2">
                            <MessageSquareWarning className="h-5 w-5 text-primary" />
                            <span>New Message</span>
                        </div>
                    ),
                    description: msg.text,
                    duration: 10000,
                });
                await markMessageAsRead(msg.id);
            });
        }
      } catch (error) {
        console.error("Error during app startup tasks: ", error);
      }
    };

    logAppOpenAndCheckMessages();
  }, [isAuthenticated, toast]);

  if (!isAuthenticated) {
    return <LoginFlow />;
  }
  
  if (isLocked) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
        <UnlockScreen onUnlock={unlockApp} isRelocking={true} />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-[220px] lg:pl-[280px]">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
