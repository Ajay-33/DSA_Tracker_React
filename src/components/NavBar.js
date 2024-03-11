import React from 'react';

function NavBar() {
  return (
    <nav className=" top-0 left-0 w-full bg-white border-gray-200 dark:bg-gray-900 shadow-md z-10">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DSA-Tracker</span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a href="/" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
