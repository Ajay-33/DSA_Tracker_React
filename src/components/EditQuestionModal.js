import React, { useState, useEffect, useContext } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import Spinner from "./Spinner";

function EditQuestionModal({ question, onClose, fetchCategories }) {
  const context = useContext(QuestionsContext);
  const { setError } = context;
  const [questionName, setQuestionName] = useState("");
  const [questionLink1, setQuestionLink1] = useState("");
  const [questionLink2, setQuestionLink2] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [questionSolutionLink, setQuestionSolutionLink] = useState("");
  const[isLoading,setIsLoading]=useState(false);
  const saveQuestion = async (updatedQuestion) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/question/update/${updatedQuestion._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            question_name: updatedQuestion.question_name,
            question_difficulty: updatedQuestion.question_difficulty,
            question_solution: updatedQuestion.question_solution,
            question_link: updatedQuestion.question_link,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      fetchCategories();
      onClose();
      setError("Succesfully updated question");
      setIsLoading(false);
    } catch (error) {
      setError(error.message || "Fail to Edit Question");
      setIsLoading(false)
    }
  };
  useEffect(() => {
    if (question) {
      setQuestionName(question.question_name);
      setQuestionLink1(question.question_link[0] || "");
      setQuestionLink2(question.question_link[1] || "");
      setQuestionDifficulty(question.question_difficulty || "Easy");
      setQuestionSolutionLink(question.question_solution || "");
    }
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedQuestion = {
      ...question,
      question_name: questionName,
      question_link: [questionLink1, questionLink2],
      question_difficulty: questionDifficulty,
      question_solution: questionSolutionLink,
    };
    saveQuestion(updatedQuestion);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 p-4 sm:p-8">
    <div className="w-8 h-8">{isLoading && <Spinner />}</div>
      <div className="bg-white dark:bg-gray-800 p-4 mt-2 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          Edit Question
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 sm:mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Question Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={questionName}
              onChange={(e) => setQuestionName(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Question Name"
              required
            />
          </div>
          <div className="mb-2 sm:mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Question Difficulty <span className="text-red-500">*</span>
            </label>
            <select
              value={questionDifficulty}
              onChange={(e) => setQuestionDifficulty(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="mb-2 sm:mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Question Link 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={questionLink1}
              onChange={(e) => setQuestionLink1(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="LeetCode Link"
              required
            />
          </div>
          <div className="mb-2 sm:mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Question Link 2
            </label>
            <input
              type="text"
              value={questionLink2}
              onChange={(e) => setQuestionLink2(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Coding Ninjas Link"
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Solution Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={questionSolutionLink}
              onChange={(e) => setQuestionSolutionLink(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Question Solution Link"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-end sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              title="Close"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              title="Save Changes"
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditQuestionModal;
