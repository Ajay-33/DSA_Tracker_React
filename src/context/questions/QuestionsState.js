import { useState } from "react";
import QuestionsContext from "./QuestionsContext";

const QuestionsState = (props) => {
  const defaultMode = localStorage.getItem("mode") || "dark";
  const [mode, setMode] = useState(defaultMode);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const defaultType=localStorage.getItem("userType")||"User";
  const [userType,setUserType]=useState(defaultType);
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
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsState;
