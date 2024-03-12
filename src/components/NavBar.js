import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    
    <nav className=" top-0 left-0 w-full bg-white border-gray-200 dark:bg-gray-900 shadow-md z-10">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">A2Z-DSA-Tracker</span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <Link href="/" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
