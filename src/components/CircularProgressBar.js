import React from 'react';

function CircularProgressBar({ percentage }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * percentage) / 100;

  return (
    <svg viewBox="0 0 50 50" width="50" height="50">
      <circle
        cx="25"
        cy="25"
        r={radius}
        fill="none"
        strokeWidth="5"
        stroke="#e6e6e6"
      />
      <circle
        cx="25"
        cy="25"
        r={radius}
        fill="none"
        strokeWidth="5"
        stroke="#007bff"
        strokeDasharray={circumference}
        strokeDashoffset={progress}
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="1s"
          from="0"
          to={progress}
          repeatCount="1"
          fill="freeze"
        />
      </circle>
      <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fontSize="12px" fill="#007bff">
        {percentage}%
      </text>
    </svg>
  );
}

export default CircularProgressBar;
