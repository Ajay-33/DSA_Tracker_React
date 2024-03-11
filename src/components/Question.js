import React from 'react';
import { HiOutlineBookmark, HiOutlineClipboard } from 'react-icons/hi';

function Question({ question }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        <select className="border bg-black border-gray-300 rounded px-2 py-1 mr-2">
          <option value="done">Done</option>
          <option value="revisit">Revisit</option>
          <option value="pending">Pending</option>
        </select>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {question.question_name}
      </td>
      <td className="px-6 py-4">{question.question_difficulty}</td>
      <td className="px-6 py-4">
        <a
          className="text-blue-500 hover:underline"
          href={question.question_link[0]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Question Link
        </a>
      </td>
      <td className="px-6 py-4">
        <a
          className="text-blue-500 hover:underline ml-2"
          href={question.question_solution}
          target="_blank"
          rel="noopener noreferrer"
        >
          Solution Link
        </a>
      </td>
      <td className="px-6 py-4 text-xl ">
        <HiOutlineClipboard className="mr-1" /> 
      </td>
      <td className="px-6 py-4 text-xl ">
        <HiOutlineBookmark className="mr-1" /> 
      </td>
    </tr>
  );
}

export default Question;
