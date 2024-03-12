import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import questionsContext from '../context/questions/QuestionsContext';
import CircularProgressBar from './CircularProgressBar';

function Category({ category }) {
    const context = useContext(questionsContext);
    const category_name = category.category_name;
    const { Category_data, percentages } = context;
    const { categoryQuestions, categoryDone, categoryPercentage } = percentages.category_values[category_name];

    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className='flex justify-between'>
                <div>
                    <Link
                        to={`/${category_name}`}
                        onClick={() => Category_data(category)}
                        className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {category.category_name}
                        </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Total Number of Questions: {categoryQuestions}
                    </p>
                </div>
                <div>
                    <div className="flex-col items-center mb-3">
                        <CircularProgressBar percentage={categoryPercentage} />
                        <span className="ml-2 text-blue-400">
                            {categoryDone}/{categoryQuestions}
                        </span>
                    </div>
                </div>
            </div>
            <Link
                to={`/${category_name}`}
                onClick={() => Category_data(category)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Solve Now
            </Link>
        </div>
    );
}

export default Category;