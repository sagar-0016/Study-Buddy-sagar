
"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import OneLinerMotivation from './one-liner-motivation';

export default function WelcomeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [shadow, setShadow] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor position from the center of the element (-0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // Apply the 3D transform. The multiplier adjusts the "intensity" of the effect.
    const rotateY = x * 10; // Rotate around Y-axis
    const rotateX = -y * 10; // Rotate around X-axis
    setTransform(`perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);

    // Apply the dynamic shadow. Shadow moves opposite to the cursor.
    const shadowX = -x * 80;
    const shadowY = -y * 80;
    setShadow(`${shadowX}px ${shadowY}px 30px rgba(0, 50, 0, 0.6)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShadow('0px 0px 15px rgba(0, 50, 0, 0.5)');
  };

  return (
    <div className="relative transition-transform duration-300 ease-in-out">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 md:p-12 z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Conquer JEE, Sagar!</h2>
          <OneLinerMotivation />
        </div>
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-80 md:h-[calc(100vh-200px)] max-h-[90vh] group"
        >
           <Image
              src="/welcome-banner.png"
              alt="IIT Delhi Emblem in a serene landscape"
              data-ai-hint="logo university"
              fill
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              style={{ 
                  transform: transform, 
                  boxShadow: shadow,
                  transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out' 
              }}
              priority
            />
        </div>
      </div>
    </div>
  );
}
