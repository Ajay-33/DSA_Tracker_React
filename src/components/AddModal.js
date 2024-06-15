import { useState, useContext } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";

function AddModal({ onClose, categories, selectedCategory, fetchCategories }) {
  const context = useContext(QuestionsContext);
  const { host, setError } = context;
  const [selectedOption, setSelectedOption] = useState(
    selectedCategory ? "question" : "category"
  );
  const [optedCategory, setOptedCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryResource, setCategoryResource] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("Easy");
  const [questionLink1, setQuestionLink1] = useState("");
  const [questionLink2, setQuestionLink2] = useState("");
  const [solutionLink, setSolutionLink] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setOptedCategory(e.target.value);
  };

  const handleSave = async () => {
    if (selectedOption === "category") {
      const categoryData = {
        category_name: categoryName,
        category_resources: categoryResource,
      };
      console.log(categoryData);
      try {
        const response = await fetch(`${host}/api/v1/category/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(categoryData),
        });
        if (response.ok) {
          onClose();
          fetchCategories();
        } else {
          const json = await response.json();
          throw new Error(json.message);
        }
      } catch (error) {
        setError(error.message || "Failed to add category");
      }
    } else if (selectedOption === "question" || selectedCategory) {
      const questionData = {
        question_name: questionName,
        question_link: [questionLink1, questionLink2],
        question_difficulty: questionDifficulty,
        question_solution: solutionLink,
      };
      console.log(questionData);
      try {
        const response = await fetch(
          `${host}/api/v1/question/add/${
            optedCategory || selectedCategory._id
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(questionData),
          }
        );
        if (response.ok) {
          fetchCategories();
          onClose();
        } else {
          const json = await response.json();
          console.log(json);
          throw new Error(json.message);
        }
      } catch (error) {
        setError(error.message || "Error saving question");
      }
    }
  };

  const renderCategoryFields = () => (
    <>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Category Name
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Category Resource
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Category Resource"
        value={categoryResource}
        onChange={(e) => setCategoryResource(e.target.value)}
        required
      />
    </>
  );

  const renderQuestionFields = () => (
    <>
      {!selectedCategory && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
            Select Category
          </label>
          <select
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleCategoryChange}
            value={optedCategory}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Name
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Question Name"
        value={questionName}
        onChange={(e) => setQuestionName(e.target.value)}
        required
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Difficulty
      </label>
      <select
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={questionDifficulty}
        onChange={(e) => setQuestionDifficulty(e.target.value)}
        required
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Link 1
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Question Link 1"
        value={questionLink1}
        onChange={(e) => setQuestionLink1(e.target.value)}
        required
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Link 2
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Question Link 2"
        value={questionLink2}
        onChange={(e) => setQuestionLink2(e.target.value)}
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Solution Link
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Solution Link"
        value={solutionLink}
        onChange={(e) => setSolutionLink(e.target.value)}
        required
      />
    </>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
          Add New
        </h2>
        {!selectedCategory && (
          <div className="flex items-center justify-center mb-2">
            <input
              type="radio"
              id="category"
              name="option"
              value="category"
              checked={selectedOption === "category"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label
              htmlFor="category"
              className="text-gray-700 dark:text-gray-300 mr-4 cursor-pointer"
            >
              Category
            </label>
            <input
              type="radio"
              id="question"
              name="option"
              value="question"
              checked={selectedOption === "question"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label
              htmlFor="question"
              className="text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              Question
            </label>
          </div>
        )}

        {selectedOption === "category" && renderCategoryFields()}
        {selectedOption === "question" && renderQuestionFields()}
        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
