import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionsContext from '../context/questions/QuestionsContext';
import { Menu, X } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { mode, updateMode } = context;
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    navigate('/login');
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${mode} top-0 left-0 w-full bg-gray-100 border-gray-800 dark:bg-gray-800 shadow-md z-10`}>
      <nav>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="dsaTracker.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-mono font-semibold whitespace-nowrap text-gray-800 dark:text-white">A2Z-DSA-Tracker</span>
          </Link>

          <div className=" hidden sm:flex items-center">
            {!localStorage.getItem('token') ? (
              <div className="flex">
                <Link className="bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mx-2" to='/login'>Login</Link>
                <Link className="bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mx-2" to='/signup'>Signup</Link>
              </div>
            ) : (
              <Link onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mx-2" to="/login">Logout</Link>
            )}
            <div className="dark-mode-toggler ml-auto">
              <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
                <div className={`relative w-10 h-6 rounded-full shadow-inner bg-gray-300 dark:bg-orange-500`}>
                  <input
                    type="checkbox"
                    className="absolute w-6 h-6 rounded-full appearance-none cursor-pointer"
                    id="darkModeToggle"
                    checked={mode === 'dark'}
                    onChange={updateMode}
                  />
                  <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ${mode === 'light' ? 'translate-x-0 bg-gray-200' : 'translate-x-4 bg-white'}`}></div>
                </div>
                <div className="ml-2 text-white dark:text-gray-300">🌙</div>
              </label>
            </div>
          </div>
          <div className="flex w-[75px] justify-end sm:hidden">
            <div className="dark-mode-toggler mr-2">
              <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
                <div className='relative w-10 h-6 rounded-full shadow-inner bg-gray-300 dark:bg-orange-500'>
                  <input
                    type="checkbox"
                    className="absolute w-6 h-6 rounded-full appearance-none cursor-pointer"
                    id="darkModeToggle"
                    checked={mode === 'dark'}
                    onChange={updateMode}
                  />
                  <div className="ml-1 text-white dark:text-gray-300 text-sm">🌙</div>
                  <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ${mode === 'light' ? 'translate-x-0 bg-gray-200' : 'translate-x-4 bg-white'}`}></div>
                </div>
              </label>
            </div>
            <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className='flex basis-full flex-col items-center w-full dark:text-white text-gray-800 hover:underline font-semibold font-mono'>
          {!localStorage.getItem('token') ? (
            <>
              <Link className=" flex justify-center py-2 px-4  mx-2" to='/login'>Login</Link>
              <Link className=" flex justify-center py-2 px-4  mx-2" to='/signup'>Signup</Link>
            </>
          ) : (
            <Link onClick={handleLogout} className="flex justify-center py-2 px-4 rounded mx-2" to="/login">Logout</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
