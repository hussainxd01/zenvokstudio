"use client";
import { useState } from "react";
import ImageWithFallback from "./ImageWithFallback";

/** Pill that replaces a letter in the services headline. Image, gif or video. */
export default function Capsule({ src, placeholder }) {
  const isVideo = /\.(mp4|webm)$/i.test(src);
  const [videoFailed, setVideoFailed] = useState(false);
  const grad = `bg-gradient-to-br ${placeholder}`;

  return (
    <span
      className="mx-[0.03em] inline-block h-[0.84em] w-[1.6em] overflow-hidden rounded-full align-[-0.06em] transition-[width] duration-500 ease-out md:group-hover:w-[2.3em]"
      aria-hidden="true"
    >
      {isVideo && !videoFailed ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : isVideo ? (
        <span className={`block h-full w-full ${grad}`} />
      ) : (
        <ImageWithFallback src={src} className="h-full w-full" placeholder={grad} />
      )}
    </span>
  );
}
