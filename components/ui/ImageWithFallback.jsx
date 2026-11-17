"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Shows the real image when the file exists, a placeholder when it doesn't.
 * Size it with `className` (it fills its box).
 */
export default function ImageWithFallback({
  src,
  alt = "",
  className = "",
  placeholder = "bg-gradient-to-br from-neutral-300 to-neutral-500",
  label,
  fetchPriority = priority ? "high" : "auto",
  priority = false,
}) {
  const [status, setStatus] = useState("loading"); // loading | loaded | error
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete) setStatus(el.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status !== "loaded" && (
        <div className={`absolute inset-0 ${placeholder}`}>
          {label && (
            <span className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-widest text-white/50">
              {label}
            </span>
          )}
        </div>
      )}
      {status !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          fetchPriority={fetchPriority}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${status === "loaded" ? "opacity-100" : "opacity-0"
            }`}
        />
      )}
    </div>
  );
}
