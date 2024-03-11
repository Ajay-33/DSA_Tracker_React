import React from 'react';
import { HiOutlineBookmark, HiOutlineClipboard } from 'react-icons/hi';
import { Icon } from '@iconify-icon/react';

function Question({ question }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        <select className="border bg-gray-900 border-gray-300 rounded px-2 py-1 mr-2">
          <option value="done">Done</option>
          <option value="revisit">Revisit</option>
          <option value="pending">Pending</option>
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
