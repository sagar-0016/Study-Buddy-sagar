import Image from "next/image";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 md:p-12 z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Welcome back, Pranjal!</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Let's make today a productive day. You've got this!
          </p>
        </div>
        <div className="relative h-48 md:h-full">
           <Image
              src="https://placehold.co/600x400.png"
              alt="Person studying"
              data-ai-hint="person studying"
              fill
              className="object-cover"
            />
        </div>
      </div>
    </div>
  );
}
