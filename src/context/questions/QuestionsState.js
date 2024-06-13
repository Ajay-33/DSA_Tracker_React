import { useState } from "react";
import QuestionsContext from "./QuestionsContext";

const QuestionsState = (props) => {
  const host = "http://localhost:8080";
  const dataInitial = [];
  const [data, setData] = useState(dataInitial);
  const responseInitial = [];
  const [userResponses, setUserResponses] = useState(responseInitial);
  const defaultMode=localStorage.getItem("mode")||"dark";
  const [mode, setMode] = useState(defaultMode);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const getAllData = async () => {
    try {
      setIsLoading(true);
      setProgress(25);
      const response = await fetch(`${host}/api/v1/data/get-all-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch responses");
      }
      setProgress(50);
      const json = await response.json();
      setProgress(75);
      console.log(json);
      setUserResponses(json["responses"]);
      setData(json["data"]);
      setIsLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching responses", error.message);
    }
  };

  const getUserResponses = async () => {
    try {
      const response = await fetch(`${host}/api/v1/data/get-user-responses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch responses");
      }
      const json = await response.json();
      console.log(json);
      setUserResponses(json);
    } catch (error) {
      console.error("Error fetching responses", error.message);
    }
  };

  return (
    <QuestionsContext.Provider
      value={{
        progress,
        isLoading,
        getAllData,
        userResponses,
        getUserResponses,
        data,
        mode,
        setMode,
        setError,
        error,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsState;
