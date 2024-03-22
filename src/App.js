import './App.css';
import React, { useContext, useEffect } from 'react'
import Categories from './components/Categories';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Questions from './components/Questions';
import QuestionsContext from './context/questions/QuestionsContext';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  const context = useContext(QuestionsContext);
  const { category,mode } = context;
  return (
    <div className={`${mode} min-h-screen bg-gray-100 dark:bg-slate-700`}>
      <Router>
        <NavBar className='flex-wrap' />
        <Routes>
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/' element={<Categories/>} />
          <Route exact path={`/${category.category_name}`} element={<Questions c_data={category} />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
