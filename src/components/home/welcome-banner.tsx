import Image from "next/image";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-primary/5 p-8 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center">
        <div className="z-10">
          <h2 className="text-3xl font-bold">Welcome back, Pranjal!</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Let's make today a productive day. You've got this!
          </p>
        </div>
        <div className="absolute -right-10 -bottom-16 opacity-10 dark:opacity-5 pointer-events-none">
          <Image
              src="https://placehold.co/300x300.png"
              alt="Abstract background"
              data-ai-hint="abstract geometric"
              width={300}
              height={300}
            />
        </div>
      </div>
    </div>
  );
}
