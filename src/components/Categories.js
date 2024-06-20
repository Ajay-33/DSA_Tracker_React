import React, { useContext, useEffect, useState } from "react";
import Category from "./Category";
import QuestionsContext from "../context/questions/QuestionsContext";
import HorizontalProgressBar from "./HorizontalProgressBar";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Categories() {
  const dataInitial = [];
  const [data, setData] = useState(dataInitial);
  const responseInitial = [];
  const [userResponses, setUserResponses] = useState(responseInitial);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { setProgress, setError } = context;
  const totalValues = userResponses && userResponses["Total_values"];
  const { Total_Questions, Questions_done, Total_percentage } =
    totalValues || {};

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllData = async () => {
    try {
      setIsLoading(true);
      setProgress(25);
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/v1/data/get-all-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setProgress(50);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setProgress(75);
      console.log(json);
      setUserResponses(json["responses"]);
      setData(json["data"]);
      setIsLoading(false);
      setProgress(100);
    } catch (error) {
      setError(error.message || "Error fetching responses");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-2">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container max-w-full px-4 pt-7 pb-4 w-full relative">
      <div className="pb-6">
        <HorizontalProgressBar
          percentage={Total_percentage}
          done={Questions_done}
          total={Total_Questions}
        />
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center sm:justify-items-stretch">
          {data.map((element) => (
            <div key={element._id}>
              <Category category={element} userResponses={userResponses} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
