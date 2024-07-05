import { useState } from "react";
import QuestionsContext from "./QuestionsContext";

const QuestionsState = (props) => {
  const defaultMode = localStorage.getItem("mode") || "dark";
  const [mode, setMode] = useState(defaultMode);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const defaultType = localStorage.getItem("userType") || "Guest";
  const [userType, setUserType] = useState(defaultType);
  const [userName, setUserName] = useState(null);
  return (
    <QuestionsContext.Provider
      value={{
        progress,
        setProgress,
        mode,
        setMode,
        setError,
        error,
        userType,
        setUserType,
        setUserName,
        userName,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsState;
