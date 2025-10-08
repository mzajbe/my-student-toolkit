import React, { useEffect, useState } from "react";

const MechanicalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Smooth-ish angles
  const hourAngle = hours * 30 + minutes * 0.5 + seconds * (0.5 / 60);
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  // Dial metrics
  const dialRadius = 128; // matches the w-64 h-64 container (256x256 total)
  // Radius for potential internal elements (markers sit near this radius)
  const markerRadius = dialRadius * 0.9;
  // (Labels removed as requested)

  return (
    <div
      className="relative w-64 h-64"
      aria-label="Mechanical clock"
      style={{ maxWidth: 256, maxHeight: 256 }}
    >
      {/* Face background */}
      <div className="absolute inset-0 rounded-full bg-white/6 dark:bg-black/20 border-2 border-white/10 shadow-2xl" />

      {/* Hour markers (lines) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30;
        const isQuarter = i % 3 === 0;
        return (
          <div
            key={`marker-${i}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `rotate(${angle}deg) translate(${0}px, -${markerRadius}px) rotate(${-angle}deg)`,
              transformOrigin: "center",
              width: 0,
              height: 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "0",
                transform: `translateX(-50%)`,
                width: isQuarter ? 4 : 2,
                height: isQuarter ? 18 : 10,
                backgroundColor: isQuarter ? "#374151" : "#9ca3af",
                borderRadius: 2,
              }}
            />
          </div>
        );
      })}

      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 10,
          height: 10,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          backgroundColor: "#111827",
          boxShadow: "0 2px 6px rgba(0,0,0,.35)",
          zIndex: 30,
        }}
      />

      {/* Hour hand */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 8,
          height: "30%", // relative to the clock container (w-64 h-64)
          transformOrigin: "50% 100%", // pivot at the bottom of the element
          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          borderRadius: 4,
          backgroundColor: "#111827",
          boxShadow: "0 2px 8px rgba(0,0,0,.35)",
          zIndex: 20,
        }}
      />

      {/* Minute hand */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 6,
          height: "38%",
          transformOrigin: "50% 100%",
          transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
          borderRadius: 3,
          backgroundColor: "#374151",
          boxShadow: "0 2px 8px rgba(0,0,0,.28)",
          zIndex: 25,
        }}
      />

      {/* Second hand */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 2,
          height: "45%",
          transformOrigin: "50% 100%",
          transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
          borderRadius: 2,
          backgroundColor: "#ef4444",
          boxShadow: "0 2px 6px rgba(0,0,0,.25)",
          transition: "transform 0.25s linear",
          zIndex: 28,
        }}
      />

      {/* Outer styling ring */}
      <div
        className="absolute inset-0 rounded-full border-4 border-white/20"
        style={{ transform: "scale(1.03)", pointerEvents: "none" }}
        aria-hidden
      />
    </div>
  );
};

export default MechanicalClock;