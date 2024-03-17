import React from 'react';

function HorizontalProgressBar({ percentage, done, total }) {
  return (
    <div className='relative h-7 bg-sky-400 dark:bg-yellow-700 rounded-full overflow-hidden'>
      <div
        className={`h-full ${percentage === 100.00 ? 'bg-green-600 dark:bg-emerald-500' : percentage > 50 ? 'bg-blue-700 dark:bg-orange-600' : 'bg-sky-700 dark:bg-amber-500'} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-lg font-medium text-white">
        {percentage}%
      </span>
      <span className="absolute inset-0 flex items-center justify-between px-2 sm:px-3 text-xs sm:text-sm font-medium text-white">
        <span>{done}/{total}</span>
        <span>{percentage === 100 ? 'Completed' : (percentage > 50 ? 'Keep Going' : 'Getting Started')}</span>
      </span>
    </div>
  );
}

export default HorizontalProgressBar;
