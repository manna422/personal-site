"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface VideoDialogProps {
  posterSrc: string;
  videoSrc: string;
  posterAlt?: string;
  aspectRatio?: string;
  className?: string;
}

export function VideoDialog({
  posterSrc,
  videoSrc,
  posterAlt = "Preview",
  aspectRatio = "16/9",
  className,
}: VideoDialogProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleOpen = () => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (isMobile && mobileVideoRef.current) {
      const video = mobileVideoRef.current;
      video.currentTime = 0;

      video
        .play()
        .then(() => {
          if (
            "webkitEnterFullscreen" in video &&
            typeof (video as unknown as Record<string, unknown>)
              .webkitEnterFullscreen === "function"
          ) {
            (
              video as unknown as { webkitEnterFullscreen: () => void }
            ).webkitEnterFullscreen();
          } else if (video.requestFullscreen) {
            video.requestFullscreen();
          }
        })
        .catch(() => {
          // Fallback to custom dialog if fullscreen fails
          setVideoOpen(true);
        });

      return;
    }

    setVideoOpen(true);
  };

  const handleClose = () => {
    setVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const resetMobileVideo = useCallback(() => {
    const video = mobileVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  // Clean up mobile video when exiting fullscreen
  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;

    const handleFullscreenExit = () => {
      if (!document.fullscreenElement) {
        resetMobileVideo();
      }
    };

    // iOS fires this event when leaving native video fullscreen
    video.addEventListener("webkitendfullscreen", resetMobileVideo);
    document.addEventListener("fullscreenchange", handleFullscreenExit);

    return () => {
      video.removeEventListener("webkitendfullscreen", resetMobileVideo);
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
    };
  }, [resetMobileVideo]);

  const updateProgress = () => {
    if (videoRef.current && !isSeeking) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        setProgress(currentTime / duration);
      }
    }
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const seekToPosition = (clientX: number) => {
    if (!seekBarRef.current || !videoRef.current) return;
    const rect = seekBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * videoRef.current.duration;
    setProgress(ratio);
  };

  const handleSeekStart = (e: React.MouseEvent) => {
    setIsSeeking(true);
    seekToPosition(e.clientX);

    const handleSeekMove = (moveEvent: MouseEvent) => {
      seekToPosition(moveEvent.clientX);
    };
    const handleSeekEnd = () => {
      setIsSeeking(false);
      document.removeEventListener("mousemove", handleSeekMove);
      document.removeEventListener("mouseup", handleSeekEnd);
    };

    document.addEventListener("mousemove", handleSeekMove);
    document.addEventListener("mouseup", handleSeekEnd);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  useEffect(() => {
    if (!videoOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [videoOpen]);

  useEffect(() => {
    if (videoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  return (
    <>
      {/* Poster / Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          "group relative block w-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg focus:outline-none",
          className
        )}
        style={{ aspectRatio }}
      >
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 fill-black text-black ml-0.5" />
          </div>
        </div>
      </button>

      {/* Hidden video for mobile native fullscreen */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={mobileVideoRef}
        src={videoSrc}
        controls
        playsInline
        preload="metadata"
        className="fixed -left-[9999px] -top-[9999px] h-px w-px"
      />

      {/* Video Overlay (desktop) */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 dark:bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-[90vw] max-w-[1200px] aspect-video rounded-lg overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                className="h-full w-full object-contain"
                onLoadedData={handleVideoLoad}
                playsInline
              />

              <AnimatePresence>
                {showControls && (
                  <>
                    {/* Close button */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onClick={handleClose}
                      className="absolute right-4 top-4 z-10 rounded-full bg-black/30 p-2 text-white backdrop-blur-md transition-transform hover:scale-110"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>

                    {/* Bottom controls */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/30 px-5 pb-4 pt-4 text-white backdrop-blur-md"
                    >
                      {/* Seek bar */}
                      <div
                        ref={seekBarRef}
                        className="group/seek mb-3 flex h-3 cursor-pointer items-center"
                        onMouseDown={handleSeekStart}
                      >
                        <div className="relative h-1 w-full rounded-full bg-white/30 transition-all group-hover/seek:h-1.5">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-white"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handlePlayPause}
                          className="transition-transform hover:scale-110"
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5 fill-current" />
                          ) : (
                            <Play className="h-5 w-5 fill-current" />
                          )}
                        </button>
                        <button
                          onClick={handleMuteToggle}
                          className="transition-transform hover:scale-110"
                        >
                          {isMuted ? (
                            <VolumeX className="h-5 w-5" />
                          ) : (
                            <Volume2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
