import React, { useContext } from 'react';
import { FaYoutube } from 'react-icons/fa';
import Question from './Question';
import QuestionsContext from '../context/questions/QuestionsContext';
import HorizontalProgressBar from './HorizontalProgressBar';

function Questions({ c_data }) {
  const questions = c_data.questions;
  const context = useContext(QuestionsContext);
  const { Responses } = context;
  const { categoryQuestions, categoryDone, categoryPercentage, Modified_Questions } = Responses.category_values[c_data.category_name];

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <div className='flex text-5xl font-bold text-black justify-between items-center pb-6'>
          <a href={c_data.category_resources[0]} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="mr-2" />
          </a>
          <div>{c_data.category_name}</div>
          <a href={c_data.category_resources[0]} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="ml-2" />
          </a>
        </div>
        <div className='pb-6'>
          <HorizontalProgressBar percentage={categoryPercentage} done={categoryDone} total={categoryQuestions} />
        </div>
        <div className='overflow-auto' style={{ maxHeight: '430px' }}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Problem</th>
                <th className="px-6 py-3">Difficulty</th>
                <th className="px-6 py-3">Links</th>
                <th className="px-6 py-3">Solution</th>
                <th className="px-6 py-3">Notes</th>
                <th className="px-6 py-3">BookMark</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((element) => {
                const ModifiedQuestion = Modified_Questions.find((item) => item.Question_id === element._id);
                const status = ModifiedQuestion ? ModifiedQuestion.Question_Status : 'Pending';
                return <Question key={element._id} question={element} Status={status} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Questions;
