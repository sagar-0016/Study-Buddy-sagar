
"use client";

import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AuthProvider, useAuth } from '@/context/auth-context';
import LoginFlow from '@/components/auth/login-flow';
import { getUnreadMessages, markMessageAsRead } from '@/lib/messages';
import { useToast } from '@/hooks/use-toast';
import { MessageSquareWarning, Loader2 } from 'lucide-react';
import UnlockScreen from '@/components/auth/unlock-screen';

function AppContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLocked, lockApp, unlockApp, isReloading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const lock = () => {
      if (isAuthenticated && !isLocked) {
        lockApp();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lock();
      }
    };

    // For app/desktop/window switching
    window.addEventListener('blur', lock);
    // For tab switching
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
            const accessLevel = localStorage.getItem('study-buddy-access-level') || 'unknown';
            await addDoc(collection(db, "opened"), {
              time: new Date(),
              accessLevel: accessLevel,
              device: {
                userAgent: navigator.userAgent,
                screenWidth: window.screen.width,
                screenHeight: window.screen.height,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                online: navigator.onLine,
              }
            });
            console.log("App open event logged to Firestore.");

            if (accessLevel === 'full') {
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
        }
      } catch (error) {
        console.error("Error during app startup tasks: ", error);
      }
    };

    logAppOpenAndCheckMessages();
  }, [isAuthenticated, toast]);

  if (isReloading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

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
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppContent>{children}</AppContent>
      <Toaster />
    </AuthProvider>
  );
}
