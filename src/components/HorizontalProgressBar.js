import React from 'react';

function HorizontalProgressBar({ percentage, done, total }) {
  return (
    <div className="relative h-7 bg-gray-600">
      <div
        className={`h-full ${percentage > 50 ? 'bg-blue-700' : 'bg-green-600'} transition-width duration-300 ease-in-out`}
        style={{ width: `${percentage}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-lg font-medium text-black">
        {percentage}%
      </span>
      <span className="absolute inset-0 flex items-center justify-end text-lg font-medium mr-3 text-black">
        {done}/{total}
      </span>
    </div>
  );
}

export default HorizontalProgressBar;
