// WHO CAN EDIT: Senior

"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./VimeoBackground.module.scss";
import Player from "@vimeo/player";
import { useElementSize } from "@mantine/hooks";
import LoadingSpinner from "@/components/general/LoadingSpinner/LoadingSpinner";

type VimeoBackgroundProps = {
  videoId: number;
  autoplay?: boolean;
  paused?: boolean;
  zIndex?: number;
  bgColor?: string;
  audioControls?: boolean;
  aspectRatio?: number;
};

const VimeoBackground = ({
  videoId,
  autoplay,
  paused = false,
  zIndex = 0,
  bgColor = `transparent`,
  audioControls = false,
  aspectRatio = 16 / 9,
}: VimeoBackgroundProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const playerLoadedRef = useRef<boolean>(false);
  const [vidWidth, setVidWidth] = useState(0);
  const [vidHeight, setVidHeight] = useState(0);
  const { ref, width, height } = useElementSize();
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let windowAspectRatio = aspectRatio; // default value
    let newWidth = 0;
    let newHeight = 0;
    if (width && height) {
      windowAspectRatio = width / height;

      if (windowAspectRatio > aspectRatio) {
        // Window is wider than the video aspect ratio
        newWidth = width;
        newHeight = width / aspectRatio;
      } else {
        // Window is taller than the video aspect ratio
        newWidth = height * aspectRatio;
        newHeight = height;
      }
    }
    setVidWidth(newWidth);
    setVidHeight(newHeight);
  }, [vidWidth, vidHeight, aspectRatio, width, height]);

  useEffect(() => {
    const options = {
      id: videoId,
      loop: true,
      badge: false,
      autoplay: autoplay,
      responsive: true,
      background: true,
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
  }, [ref, videoId, autoplay]);

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
    <div
      ref={ref}
      className={styles.Holder}
      style={{ zIndex: zIndex, backgroundColor: bgColor }}
    >
      <LoadingSpinner />
      <div
        ref={innerRef}
        className={styles.Inner}
        style={{ width: `${vidWidth}px`, height: `${vidHeight}px` }}
      ></div>
      {audioControls && (
        <button onClick={handleMuteToggle}>
          {muted ? "play audio" : "mute"}
        </button>
      )}
    </div>
  );
};

export default VimeoBackground;
