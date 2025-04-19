import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";  // Assuming the cn function is still in use

export const WelcomeAnimation = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Adjust the timer for how long the animation stays on screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 bg-purple-900/90 z-50 flex items-center justify-center transition-opacity duration-1000",
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <h1 className="text-4xl md:text-6xl text-white font-bold text-center animate-fade-in">
        Welcome to The Magic Ball
        <p className="text-xl md:text-2xl mt-4 text-purple-200">
          Ask any question that's on your mind...
        </p>
      </h1>
    </div>
  );
};
