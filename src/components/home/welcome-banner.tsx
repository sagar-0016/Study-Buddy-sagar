
"use client";

import Image from "next/image";
import OneLinerMotivation from "./one-liner-motivation";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-card shadow-lg border">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 md:p-12 z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Conquer JEE, Pranjal!</h2>
          <OneLinerMotivation />
        </div>
        <div className="relative h-60 md:h-full group">
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background to-transparent z-10"></div>
          <Image
            src="https://raw.githubusercontent.com/sagar-0016/Pranjal-Study-Buddy/refs/heads/main/IIT%20Delhi%20Emblem%20in%20Serene%20Landscape.png"
            alt="IIT Delhi Emblem in a serene landscape"
            data-ai-hint="logo university"
            fill
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
