
import Image from "next/image";

export default function WelcomeBanner() {
  return (
    <div className="relative transition-transform duration-300 ease-in-out">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 md:p-12 z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Conquer JEE, Pranjal!</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Your journey to IIT Delhi starts now. Seize the day!
          </p>
        </div>
                <div className="relative min-h-[15rem] h-60 md:h-full group">
           <Image
              src="https://raw.githubusercontent.com/sagar-0016/Pranjal-Study-Buddy/refs/heads/main/IIT%20Delhi%20Emblem%20in%20Serene%20Landscape.png"
              alt="IIT Delhi Emblem in a serene landscape"
              data-ai-hint="logo university"
              fill
              className="object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1"
            />
        </div>
      </div>
    </div>
  );
}
