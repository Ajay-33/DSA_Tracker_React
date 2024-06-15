import React from "react";
import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";

function Category({ category, userResponses }) {
  const category_name = category.category_name;
  const categoryValues = userResponses && userResponses.category_values;
  const categoryData = categoryValues && categoryValues[category_name];
  const { categoryQuestions, categoryDone, categoryPercentage } =
    categoryData || {};

  return (
    <Link to={`/${category._id}`}>
      <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition-transform hover:scale-105 hover:z-50 hover:dark:border-gray-300 hover:border-gray-300 hover:shadow-lg hover:cursor-pointer">
        <div className="flex justify-between">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {category.category_name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Total Number of Questions: {categoryQuestions}
            </p>
          </div>
          <div>
            <div className="flex-col items-center mb-3">
              <CircularProgressBar percentage={categoryPercentage} />
              <span className="ml-2 text-gray-800 dark:text-white">
                {categoryDone}/{categoryQuestions}
              </span>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600">
          Solve Now
        </div>
      </div>
    </Link>
  );
}

export default Category;
