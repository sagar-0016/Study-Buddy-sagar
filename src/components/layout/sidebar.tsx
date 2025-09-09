
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
  Library,
  Settings,
  Brain,
  Newspaper,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavLink } from '@/lib/types';
import { useClassMode } from "@/context/class-mode-context";

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/syllabus", label: "Syllabus", icon: BookCheck },
  { href: "/pyq", label: "PYQ Tracker", icon: ClipboardList },
  { href: "/planner", label: "Planner", icon: CalendarClock },
  { href: "/questions", label: "Questions", icon: ClipboardList },
  { href: "/flashcards", label: "Flashcards", icon: Notebook },
  { href: "/lectures", label: "Lectures", icon: Library },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/revisions", label: "Revisions", icon: BrainCircuit },
  { href: "/feedback", label: "AI Feedback", icon: BotMessageSquare },
];

const secondaryNavLinks: NavLink[] = [
    { href: "/tricky-topics", label: "Tricky Questions", icon: Flame },
    { href: "/brainstorming", label: "Brainstorming", icon: Brain },
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
  const { isClassMode } = useClassMode();

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 hidden flex-col border-r bg-glass transition-all duration-300 md:flex",
      isClassMode ? "w-[72px]" : "w-[220px] lg:w-[280px]"
    )}>
      <TooltipProvider>
        <div className={cn(
          "flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6",
          isClassMode && "justify-center"
        )}>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <GraduationCap className="h-6 w-6 text-primary" />
              {!isClassMode && <span className="">Sagar's Study Buddy</span>}
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-y-2 overflow-y-auto">
             <div className="flex-1 py-2">
                <SidebarNav links={navLinks} isCollapsed={isClassMode} />
             </div>
             <div className="mt-auto p-4 border-t">
                <SidebarNav links={secondaryNavLinks} isCollapsed={isClassMode} />
             </div>
          </div>
      </TooltipProvider>
    </aside>
  );
}
