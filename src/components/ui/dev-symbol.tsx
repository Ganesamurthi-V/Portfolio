"use client";

/**
 * Developer symbol: </>
 *
 * Clean gradient logo with rounded bars forming angle brackets and a slash.
 * Blue-to-cyan gradient from left to right.
 */

export function DevSymbol() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Developer symbol"
    >
      <defs>
        <linearGradient id="dev-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="dev-gradient-center" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="dev-gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>

      {/* Left angle bracket < */}
      <path
        d="M 75 45 L 75 50 Q 75 55 70 58 L 35 90 Q 30 95 30 100 Q 30 105 35 110 L 70 142 Q 75 145 75 150 L 75 155 Q 75 160 70 157 L 25 120 Q 15 112 15 100 Q 15 88 25 80 L 70 43 Q 75 40 75 45 Z"
        fill="url(#dev-gradient-left)"
      />

      {/* Center slash / */}
      <rect
        x="88"
        y="35"
        width="24"
        height="130"
        rx="12"
        ry="12"
        fill="url(#dev-gradient-center)"
        transform="rotate(15 100 100)"
      />

      {/* Right angle bracket > */}
      <path
        d="M 125 45 L 125 50 Q 125 55 130 58 L 165 90 Q 170 95 170 100 Q 170 105 165 110 L 130 142 Q 125 145 125 150 L 125 155 Q 125 160 130 157 L 175 120 Q 185 112 185 100 Q 185 88 175 80 L 130 43 Q 125 40 125 45 Z"
        fill="url(#dev-gradient-right)"
      />
    </svg>
  );
}
