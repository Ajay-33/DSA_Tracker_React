import React, { useContext, useEffect, useState } from "react";
import Category from "./Category";
import QuestionsContext from "../context/questions/QuestionsContext";
import HorizontalProgressBar from "./HorizontalProgressBar";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Categories() {

  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { getAllData, userResponses, data,error,setError,isLoading} = context;
  const totalValues = userResponses && userResponses["Total_values"];
  const { Total_Questions, Questions_done, Total_percentage } =
    totalValues || {};

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setError(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [setError,error,navigate]);

  if (isLoading) {
    return (
        <div className="text-center py-2">
          <Spinner/>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-7 pb-4 w-full relative">
      <div className="error-container flex justify-center items-center absolute top-0 left-0 w-full z-50 pointer-events-none">
        {showError && (
          <div className="bg-slate-700 border border-orange-500 text-gray-300 w-2/3 md:w-1/2 rounded-md p-4 mb-4 text-center shadow-md transition-opacity duration-500">
            {error}
          </div>
        )}
      </div>
      <div className="pb-6">
        <HorizontalProgressBar
          percentage={Total_percentage}
          done={Questions_done}
          total={Total_Questions}
        />
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center sm:justify-items-stretch">
          {data.map((element) => (
            <div key={element._id}>
              <Category category={element} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
