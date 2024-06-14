import "./App.css";
import React, { useContext } from "react";
import Categories from "./components/Categories";
import NavBar from "./components/NavBar";
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Questions from "./components/Questions";
import QuestionsContext from "./context/questions/QuestionsContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

function App() {
  const context = useContext(QuestionsContext);
  const { mode, progress } = context;
  return (
    <div className={`${mode} min-h-screen bg-gray-100 dark:bg-slate-700`}>
      <Router>
        <NavBar className="flex-wrap" />
        <LoadingBar
          color={mode === "dark" ? "#FF7518" : "#f11946"}
          progress={progress}
        />
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Categories />} />
          <Route exact path="/admin" element={<AdminPanel/>}/>
          <Route exact path="/:id" element={<Questions />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
