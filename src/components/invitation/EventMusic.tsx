"use client";

import { useEffect, useRef, useState } from "react";
import type { EventMusic as Music } from "@/types/invitation";

export function EventMusic({ music }: { music?: Music }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isAvailable = Boolean(music?.src?.trim() && music.enabled !== false);

  useEffect(() => {
    if (!isAvailable || !music) return;

    const audio = new Audio(music.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const markPlaying = () => setIsPlaying(true);
    const markPaused = () => setIsPlaying(false);
    audio.addEventListener("play", markPlaying);
    audio.addEventListener("pause", markPaused);
    audio.addEventListener("ended", markPaused);

    return () => {
      audio.pause();
      audio.removeEventListener("play", markPlaying);
      audio.removeEventListener("pause", markPaused);
      audio.removeEventListener("ended", markPaused);
      audio.src = "";
      audioRef.current = null;
    };
  }, [isAvailable, music]);

  if (!isAvailable) return null;

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  const action = isPlaying ? "Pausar" : "Reproducir";
  const title = music?.title?.trim() ? `${action} ${music.title}` : `${action} música`;

  return <button className={`music-control ${isPlaying ? "is-playing" : ""}`} type="button" onClick={togglePlayback} aria-label={title} aria-pressed={isPlaying} title={title}><span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span><small>{isPlaying ? "Pausar" : "Música"}</small></button>;
}
