import { useEffect, useState } from "react";
import chihuahua from "@/assets/chihuahua.png";

interface ChihuahuaCharacterProps {
  currentReminder: string | null;
}

const ChihuahuaCharacter = ({ currentReminder }: ChihuahuaCharacterProps) => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating hearts
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * 200 - 100, // Random x position
        delay: Math.random() * 2,
      };
      setHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center px-4">
      {/* Speech Bubble */}
      {currentReminder && (
        <div className="relative mb-4 md:mb-8 bounce-in">
          <div className="bg-white border-2 md:border-4 border-primary rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 shadow-lg max-w-[280px] md:max-w-xs">
            <p className="text-center text-foreground font-medium text-sm md:text-base">
              {currentReminder}
            </p>
          </div>
          {/* Bubble tail */}
          <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[12px] md:border-l-[15px] border-l-transparent border-r-[12px] md:border-r-[15px] border-r-transparent border-t-[16px] md:border-t-[20px] border-t-primary" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[13px] md:-translate-y-[16px]">
              <div className="w-0 h-0 border-l-[10px] md:border-l-[12px] border-l-transparent border-r-[10px] md:border-r-[12px] border-r-transparent border-t-[13px] md:border-t-[16px] border-t-white" />
            </div>
          </div>
        </div>
      )}

      {/* Chihuahua Character */}
      <div className="relative wiggle">
        <img
          src={chihuahua}
          alt="Mi perrita chihuahua"
          className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
        />
        
        {/* Floating Hearts */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 heart-float hidden md:block"
            style={{
              left: `calc(50% + ${heart.x}px)`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                fill="hsl(330, 80%, 75%)"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="flex gap-2 md:gap-3 mt-2 md:mt-4">
        <span className="text-xl md:text-3xl animate-bounce" style={{ animationDelay: "0s" }}>⭐</span>
        <span className="text-xl md:text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>💕</span>
        <span className="text-xl md:text-3xl animate-bounce" style={{ animationDelay: "0.4s" }}>🐾</span>
      </div>
    </div>
  );
};

export default ChihuahuaCharacter;
