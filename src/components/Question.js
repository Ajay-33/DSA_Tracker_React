import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';

function Question({ question, Status }) {
  const [status,setStatus]=useState(Status);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <tr className={`border-b dark:border-gray-700 ${status === 'Pending' ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700' : status === 'Revisit' ? 'bg-orange-500 dark:bg-orange-700 hover:bg-orange-600 dark:hover:bg-orange-800' : 'bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800'}`}>
      <td className="px-6 py-4">
        <select
          className="border bg-gray-900 border-gray-300 rounded px-2 py-1 mr-2"
          defaultValue={Status}
          onChange={handleStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Done</option>
          <option value="Revisit">Revisit</option>
        </select>
      </td>
      <td className="px-6 py-4 font-medium text-xl text-gray-900 whitespace-nowrap dark:text-white">
        {question.question_name}
      </td>
      <td className="px-6 py-4 font-semibold">{question.question_difficulty}</td>
      <td className="px-6 py-4 flex justify-between">
        <a
          className="text-gray-100 text-2xl"
          href={question.question_link[0]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="simple-icons:leetcode" />
        </a>
        <a
          className="text-gray-100 text-2xl"
          href='/'
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="simple-icons:codingninjas" />
        </a>
      </td>
      <td className="px-6 py-4">
        <a
          className="text-gray-100 ml-2 text-2xl"
          href={question.question_solution}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="streamline:ecology-science-erlenmeyer-flask-experiment-lab-flask-science-chemistry-solution" />

        </a>
      </td>
      <td className="px-6 py-4 text-2xl ">
        <a
          className="text-gray-100 ml-2 text-2xl"
          href='/'
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="icon-park-outline:notes" />
        </a>
      </td>
      <td className="px-6 py-4 text-2xl ">
        <a
          className="text-gray-100 ml-2 text-2xl"
          href='/'
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="material-symbols:bookmark-outline" />
        </a>

      </td>
    </tr>
  );
}

export default Question;
