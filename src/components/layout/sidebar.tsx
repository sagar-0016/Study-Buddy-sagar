
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Home,
  BookCheck,
  BarChart3,
  BotMessageSquare,
  CalendarClock,
  ClipboardList,
  Flame,
  MessageSquareQuote,
  LifeBuoy,
  Notebook,
  BrainCircuit,
  BookPlay,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavLink } from '@/lib/types';

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/syllabus", label: "Syllabus", icon: BookCheck },
  { href: "/planner", label: "Planner", icon: CalendarClock },
  { href: "/questions", label: "Questions", icon: ClipboardList },
  { href: "/flashcards", label: "Flashcards", icon: Notebook },
  { href: "/lectures", label: "Lectures", icon: BookPlay },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/revisions", label: "Revisions", icon: BrainCircuit },
  { href: "/feedback", label: "AI Feedback", icon: BotMessageSquare },
];

const secondaryNavLinks: NavLink[] = [
    { href: "/tricky-topics", label: "Ticky & Brainstormers", icon: Flame },
    { href: "/doubts", label: "Doubt Centre", icon: MessageSquareQuote },
    { href: "/help", label: "Technical Help", icon: LifeBuoy },
]

function SidebarNav({ links, isCollapsed }: { links: NavLink[]; isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
     <nav className={cn("grid gap-1 px-2", isCollapsed ? "justify-center" : "")}>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/');
        const navLink = (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-primary/10 text-primary",
              isCollapsed && "rounded-lg"
            )}
          >
            <link.icon className="h-4 w-4" />
            {!isCollapsed && link.label}
          </Link>
        );

        if (isCollapsed) {
          return (
            <Tooltip key={link.href} delayDuration={0}>
              <TooltipTrigger asChild>{navLink}</TooltipTrigger>
              <TooltipContent side="right">
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        }
        return navLink;
      })}
    </nav>
  );
}


export default function Sidebar() {
  const isCollapsed = false; // Add logic to collapse sidebar if needed

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col border-r bg-muted/40 md:flex lg:w-[280px]">
      <TooltipProvider>
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="">Pranjal's Study Buddy</span>
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-y-2 overflow-y-auto">
             <div className="flex-1">
                <SidebarNav links={navLinks} isCollapsed={isCollapsed} />
             </div>
             <div className="mt-auto p-4">
                <SidebarNav links={secondaryNavLinks} isCollapsed={isCollapsed} />
             </div>
          </div>
      </TooltipProvider>
    </aside>
  );
}
