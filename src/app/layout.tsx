
"use client";

import { useEffect } from 'react';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    const logAppOpen = async () => {
      try {
        await addDoc(collection(db, "opened"), {
          time: new Date(),
        });
        console.log("App open event logged to Firestore.");
      } catch (error) {
        console.error("Error logging app open event: ", error);
      }
    };

    logAppOpen();
  }, []);


  return (
    <html lang="en">
      <head>
        <title>Pranjal's Study Buddy</title>
        <meta name="description" content="Your personalized companion for JEE preparation." />
        <link rel="icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
