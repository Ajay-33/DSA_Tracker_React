import React, { useContext, useState } from "react";
import { Icon } from "@iconify-icon/react";
import QuestionsContext from "../context/questions/QuestionsContext";

function Question({ question, Status, updateNote, notes }) {
  const [status, setStatus] = useState(Status);
  const context = useContext(QuestionsContext);
  const { getUserResponses } = context;
  const host = "http://localhost:8080";

  const updateActions = async (qid, status) => {
    try {
      const response = await fetch(
        `${host}/api/v1/response/status/add/${qid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      getUserResponses();
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleStatusChange = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    updateActions(question._id, e.target.value);
  };

  return (
    <>
      <tr
        className={`border-b dark:border-gray-700 ${
          status === "Pending"
            ? "bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            : status === "Revisit"
            ? "bg-yellow-100 dark:bg-orange-700 hover:bg-yellow-200 dark:hover:bg-orange-800"
            : "bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-800"
        }`}
      >
        <td className="px-4 sm:px-6 py-4">
          <select
            className="border rounded px-2 py-1 mr-2 bg-white dark:bg-gray-200 dark:text-gray-800 dark:border-gray-400"
            defaultValue={Status}
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Done</option>
            <option value="Revisit">Revisit</option>
          </select>
        </td>
        <td className="px-4 sm:px-6 py-4 font-medium text-base sm:text-xl text-gray-900 dark:text-white whitespace-nowrap">
          {question.question_name}
        </td>
        <td className="px-4 sm:px-6 py-4 font-semibold text-base sm:text-xl text-gray-900 dark:text-white">
          {question.question_difficulty}
        </td>
        <td className="px-4 sm:px-6 py-4 flex justify-between">
          <a
            className="dark:text-gray-100 text-black text-2xl"
            href={question.question_link[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="simple-icons:leetcode" />
          </a>
          <a
            className="dark:text-gray-100 text-black sm:text-2xl text-xl"
            href={question.question_link[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="simple-icons:codingninjas" />
          </a>
        </td>
        <td className="px-4 sm:px-6 py-4">
          <a
            className="dark:text-gray-100 text-black ml-2 sm:text-2xl text-xl"
            href={question.question_solution}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="streamline:ecology-science-erlenmeyer-flask-experiment-lab-flask-science-chemistry-solution" />
          </a>
        </td>
        <td className="px-4 sm:px-6 py-4 text-base sm:text-xl">
          <button
            className="dark:text-gray-100 text-black ml-2 sm:text-2xl text-xl"
            onClick={() => updateNote(notes, question._id)}
          >
            <Icon icon="icon-park-outline:notes" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default Question;
