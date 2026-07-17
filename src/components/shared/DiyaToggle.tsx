"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DiyaIcon = ({ isLit }: { isLit: boolean }) => (
  <svg viewBox="0 0 64 64" className="w-6 h-6 transition-all duration-300" fill="currentColor">
    {/* Lamp Body */}
    <path
      d="M12,40 C12,50 20,54 32,54 C44,54 52,50 52,40 C52,40 50,38 46,38 C40,38 38,42 32,42 C26,42 24,38 18,38 C14,38 12,40 12,40 Z"
      className="text-amber-700 dark:text-amber-600"
    />
    <path
      d="M18,38 C24,38 26,42 32,42 C38,42 40,38 46,38 C42,38 38,40 32,40 C26,40 22,38 18,38 Z"
      className="text-amber-800 dark:text-amber-700"
    />
    {/* Wick holder */}
    <path d="M30,38 L34,38 L32,34 Z" className="text-amber-900" />
    
    {/* Flame (Only animates/glows when lit) */}
    {isLit && (
      <motion.g
        animate={{
          scale: [1, 1.06, 0.96, 1.08, 1],
          y: [0, -1, 0.5, -1.5, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="origin-bottom"
        style={{ transformOrigin: "32px 34px" }}
      >
        {/* Outer Flame Glow */}
        <path
          d="M32,8 C32,8 24,20 24,28 C24,33 27.5,36 32,36 C36.5,36 40,33 40,28 C40,20 32,8 32,8 Z"
          fill="url(#flameOuter)"
          className="opacity-75 blur-[1px]"
        />
        {/* Inner Core Flame */}
        <path
          d="M32,16 C32,16 28,24 28,29 C28,32 30,34 32,34 C34,34 36,32 36,29 C36,24 32,16 32,16 Z"
          fill="url(#flameInner)"
        />
        <defs>
          <radialGradient id="flameOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="35%" stopColor="#FED7AA" />
            <stop offset="75%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="55%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
      </motion.g>
    )}
  </svg>
);

export function DiyaToggle() {
  const [isLit, setIsLit] = useState(false);
  const [particles, setParticles] = useState<{ id: number; size: number; left: string; duration: number; delay: number }[]>([]);

  // Load initial state
  useEffect(() => {
    const stored = localStorage.getItem("diya-lit") === "true";
    setIsLit(stored);
    if (stored) {
      document.documentElement.classList.add("diya-active");
    }

    // Generate random particles for floating embers
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  const handleToggle = () => {
    const nextState = !isLit;
    setIsLit(nextState);
    localStorage.setItem("diya-lit", String(nextState));
    if (nextState) {
      document.documentElement.classList.add("diya-active");
    } else {
      document.documentElement.classList.remove("diya-active");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        type="button"
        title={isLit ? "Extinguish Diya" : "Light a Diya for auspiciousness"}
        className={`relative p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
          isLit
            ? "border-amber-400/50 bg-amber-500/10 text-amber-500 shadow-md shadow-amber-500/25 scale-105"
            : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        }`}
      >
        <DiyaIcon isLit={isLit} />
        {/* {isLit && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
        )} */}
      </button>

      {/* Floating Embers */}
      <AnimatePresence>
        {isLit && (
          <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: "105vh", x: 0, opacity: 0 }}
                animate={{
                  y: "-5vh",
                  x: [0, Math.sin(p.id) * 30, Math.cos(p.id) * 20, 0],
                  opacity: [0, 0.7, 0.7, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear",
                }}
                className="absolute rounded-full bg-gradient-to-t from-amber-400 to-orange-500 blur-[0.5px]"
                style={{
                  width: p.size,
                  height: p.size,
                  left: p.left,
                  boxShadow: "0 0 8px #f59e0b, 0 0 16px #d97706",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
