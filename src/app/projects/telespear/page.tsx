"use client";

import { motion } from "framer-motion";
import { Expand, Minimize } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const GAME_URL =
  "https://r2.deskfluence.com/personal-site/projects/telespear/SuperTeleSpear.html";

const controls = [
  { key: "WASD / Arrow Keys", action: "Move" },
  { key: "Space", action: "Jump" },
  { key: "Mouse", action: "Aim" },
  { key: "Left Click", action: "Throw spear / Teleport" },
  { key: "Right Click", action: "Retract spear" },
  { key: "Esc", action: "Pause / Menu" },
];

export default function TeleSpearPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pb-8 pt-24 md:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
        >
          SuperTeleSpear
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          A technical platformer built in Godot. Throw your spear, then teleport
          to it. Chain movement to clear levels as fast as possible.
          Deterministic physics enable replays and ghost training for
          speedrunning.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex gap-3"
        >
          <a
            href="https://r2.deskfluence.com/personal-site/projects/telespear/SuperTeleSpear.dmg"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 384 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            Mac
          </a>
          <a
            href="https://r2.deskfluence.com/personal-site/projects/telespear/SuperTeleSpear.exe.zip"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 448 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
            </svg>
            Windows
          </a>
        </motion.div>
      </section>

      {/* Game embed */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pb-8"
      >
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-xl border border-border bg-black"
        >
          <iframe
            src={GAME_URL}
            className={isFullscreen ? "h-full w-full" : "aspect-[16/9] w-full"}
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
          />
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-3 right-3 rounded-lg bg-black/30 p-2 text-white backdrop-blur-md transition-transform hover:scale-110"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Expand className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.section>

      {/* Controls */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pb-24"
      >
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Controls
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
          {controls.map((c) => (
            <div key={c.key} className="flex items-baseline gap-2 text-sm">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
                {c.key}
              </kbd>
              <span className="text-muted-foreground">{c.action}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
