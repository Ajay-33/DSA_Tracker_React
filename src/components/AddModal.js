import { useState } from "react";

function AddModal({ onClose, categories }) {
  const [selectedOption, setSelectedOption] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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
        required
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Category Resource
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Category Resource"
        required
      />
    </>
  );

  const renderQuestionFields = () => (
    <>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Select Category
      </label>
      <select
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleCategoryChange}
        value={selectedCategory}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.category_name}
          </option>
        ))}
      </select>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Name
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Question Name"
        required
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Difficulty
      </label>
      <select
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Link 1
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Question Link 1"
        required
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Question Link 2
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Question Link 2"
        required
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2">
        Solution Link
      </label>
      <input
        type="text"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Solution Link"
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
        {selectedOption === "category"
          ? renderCategoryFields()
          : renderQuestionFields()}
        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-2"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
