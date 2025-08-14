
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
import { MessageSquareWarning } from 'lucide-react';

function AppContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const logAppOpenAndCheckMessages = async () => {
      try {
        if (isAuthenticated) {
            // Log the app open event
            await addDoc(collection(db, "opened"), {
              time: new Date(),
              device: navigator.userAgent,
            });
            console.log("App open event logged to Firestore.");

            // Check for unread messages if user has full access
            const accessLevel = localStorage.getItem('study-buddy-access-level');
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

  if (!isAuthenticated) {
    return <LoginFlow />;
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
