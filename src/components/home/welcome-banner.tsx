
import Image from "next/image";

export default function WelcomeBanner() {
  return (
    <div className="relative rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 md:p-12 z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">Conquer JEE, Pranjal!</h2>
          <p className="text-muted-foreground mt-4 text-lg text-primary-foreground/80">
            Your journey to IIT Delhi starts now. Seize the day!
          </p>
        </div>
        <div className="relative h-60 md:h-auto min-h-[15rem]">
           <Image
              src="https://placehold.co/800x400.png"
              alt="IIT Delhi Emblem in a serene landscape"
              data-ai-hint="logo university"
              fill
              className="object-cover"
            />
        </div>
      </div>
    </div>
  );
}
