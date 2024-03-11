import React from 'react';
import Question from './Question';

function Questions({ c_data }) {
  const questions = c_data.questions;

  return (
    <div className='bg-gray-400 '>
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            {questions.map((element) => (
              <Question key={element._id} question={element} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Questions;