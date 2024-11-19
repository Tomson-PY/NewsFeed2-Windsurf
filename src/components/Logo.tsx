import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Robot head outline */}
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="12"
        className="stroke-current"
        strokeWidth="6"
      />
      {/* Eyes */}
      <circle cx="35" cy="45" r="6" className="fill-current" />
      <circle cx="65" cy="45" r="6" className="fill-current" />
      {/* Antenna */}
      <path
        d="M50 20 L50 10 M40 10 L60 10"
        className="stroke-current"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Smile */}
      <path
        d="M35 65 Q50 75 65 65"
        className="stroke-current"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};