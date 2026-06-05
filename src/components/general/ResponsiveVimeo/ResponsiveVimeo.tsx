// WHO CAN EDIT: Senior

"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ResponsiveVimeo.module.scss";
import Player from "@vimeo/player";
import LoadingSpinner from "@/components/general/LoadingSpinner/LoadingSpinner";

type ResponsiveVimeoProps = {
  videoId: number;
  autoplay?: boolean;
  paused?: boolean;
  bgColor?: string;
  audioControls?: boolean;
  background?: boolean;
};

const ResponsiveVimeo = ({
  videoId,
  autoplay,
  paused = false,
  bgColor = `transparent`,
  audioControls = false,
  background = true,
}: ResponsiveVimeoProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const playerLoadedRef = useRef<boolean>(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const options = {
      id: videoId,
      loop: true,
      badge: false,
      autoplay: autoplay,
      responsive: true,
      background: background,
      controls: !autoplay,
    };

    // Create the video and play if autoplay is enabled
    playerRef.current = new Player(innerRef.current, options);
    playerRef.current.on("loaded", () => {
      playerLoadedRef.current = true;
    });

    // Cleanup
    return () => {
      if (playerRef.current && playerLoadedRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, autoplay]);

  useEffect(() => {
    if (playerRef.current && playerLoadedRef.current) {
      paused ? playerRef.current.pause() : playerRef.current.play();
    }
  }, [paused]);

  const handleMuteToggle = () => {
    let currentValue = muted;
    if (currentValue) {
      playerRef.current.setVolume(1.0);
    } else {
      playerRef.current.setVolume(0.0);
    }

    setMuted(!currentValue);
  };

  return (
    <div className={styles.Holder} style={{ backgroundColor: bgColor }}>
      <LoadingSpinner />
      <div ref={innerRef} className={styles.Inner}></div>
      {audioControls && (
        <button onClick={handleMuteToggle}>
          {muted ? "play audio" : "mute"}
        </button>
      )}
    </div>
  );
};

export default ResponsiveVimeo;
