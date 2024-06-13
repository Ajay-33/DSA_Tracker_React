import React from "react";

function CircularProgressBar({ percentage }) {
  const normalizedPercentage = isNaN(percentage) ? 0 : percentage;

  return (
    <>
      <svg viewBox="0 0 50 50" width="50" height="50">
        <circle
          cx="25"
          cy="25"
          r="23"
          fill="none"
          strokeWidth="4"
          className="stroke-sky-400 dark:stroke-amber-500"
        />
        <circle
          cx="25"
          cy="25"
          r="23"
          fill="none"
          strokeWidth="4"
          strokeDasharray="144.513"
          strokeDashoffset={144.513 * (1 - normalizedPercentage / 100)}
          strokeLinecap="round"
          className={`${
            percentage === 100.0
              ? "stroke-green-600 dark:stroke-emerald-500"
              : percentage > 50
              ? "stroke-blue-700 dark:stroke-orange-600"
              : "stroke-sky-800 dark:stroke-yellow-900"
          } progress`}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="12px"
          className="fill-black dark:fill-white"
        >
          {normalizedPercentage}%
        </text>
      </svg>
    </>
  );
}

export default CircularProgressBar;
