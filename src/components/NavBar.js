import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionsContext from '../context/questions/QuestionsContext';

function NavBar() {
  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { mode, updateMode } = context;
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    navigate('/login');
  };

  return (
    <nav className={`${mode} top-0 left-0 w-full bg-white border-gray-200 dark:bg-gray-900 shadow-md z-10`}>
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">A2Z-DSA-Tracker</span>
        </Link>
        <div className="flex items-center">
          {!localStorage.getItem('token') ? (
            <div className="flex">
              <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" to='/login'>Login</Link>
              <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" to='/signup'>Signup</Link>
            </div>
          ) : (
            <Link onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" to="/login">Logout</Link>
          )}
          <div className="dark-mode-toggler ml-auto">
            <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
              <div className={`relative w-10 h-6 rounded-full shadow-inner ${mode === 'light' ? 'bg-gray-400' : 'bg-blue-600'}`}>
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
      </div>
    </nav>
  );
}

export default NavBar;
