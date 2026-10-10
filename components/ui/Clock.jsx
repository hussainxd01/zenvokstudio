"use client";
import { useEffect, useState } from "react";

function offset(d) {
  const m = -d.getTimezoneOffset();
  const a = Math.abs(m);
  return `UTC${m >= 0 ? "+" : "-"}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}

/** Live local time + UTC offset (client only, avoids hydration mismatch). */
export default function Clock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <span>({now ? offset(now) : "UTC"})</span>
      <span className="tabular-nums">
        {now ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
      </span>
    </>
  );
}
