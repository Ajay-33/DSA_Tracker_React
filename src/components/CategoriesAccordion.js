import React, { useState, useCallback } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import EditCategoryModal from "./EditCategoryModal";
import EditQuestionModal from "./EditQuestionModal";
import ConfirmationModal from "./ConfirmationModal";
import AddModal from "./AddModal";
import Spinner from "./Spinner";

const CategoriesAccordion = ({
  categories,
  fetchCategories,
  loadingCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subDropdowns, setSubDropdowns] = useState(false);
  const [dropdowns, setDropdowns] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const toggleSubDropdown = useCallback((id) => {
    setSubDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setDropdowns((prevState) => {
      const updatedDropdowns = { ...prevState };
      Object.keys(updatedDropdowns).forEach((key) => {
        if (key.startsWith(`${id}`)) {
          updatedDropdowns[key] = false;
        }
      });
      return updatedDropdowns;
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id) => {
    setDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getFilteredQuestions = (questions) => {
    return questions.filter((question) =>
      question.question_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getQuestionCount = (questions, level) => {
    return getFilteredQuestions(questions).filter(
      (question) => question.question_difficulty === level
    ).length;
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getFilteredQuestions(category.questions).length > 0
  );

  return (
    <div className="w-full lg:w-3/4 p-6 bg-white border border-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-lg shadow-lg transition duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 lg:mb-0">
          Categories
        </h2>
        <div className="relative w-full lg:w-1/3 flex items-center">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 p-1.5 w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-md transition duration-500 dark:focus:outline-none focus:ring-2 dark:focus:ring-gray-400"
            placeholder="Search Categories and Questions..."
            title="Search Categories and Questions"
          />
          {searchTerm && (
            <div className="absolute right-12 ml-2 cursor-pointer text-gray-500 dark:text-gray-400">
              <FaTimes
                className="h-4 w-4 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            </div>
          )}

          <div className="group relative">
            <button
              className="text-base rounded-sm p-2 bg-green-500 hover:bg-green-600 text-white ml-2 flex items-center justify-center transition-transform transform hover:scale-110"
              onClick={() => setAddModal(true)}
            >
              <FaPlus />
            </button>
            <span className="absolute -translate-x-1/2 mt-1 lg:top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-10 w-max px-2 py-1 text-sm text-blue-100 bg-blue-500 rounded-md shadow-md opacity-0 group-hover:opacity-90 hidden group-hover:block transition-transform duration-300 z-50 hover:scale-105">
              Add Category or Question
            </span>
          </div>
        </div>
      </div>
      {filteredCategories.length === 0 ? (
        loadingCategories ? (
          <Spinner />
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            No Categories or Questions to display
          </div>
        )
      ) : (
        filteredCategories.map((category) => (
          <div key={category._id} className="mb-4 outline-none">
            <div
              onClick={() => toggleSubDropdown(category._id)}
              className="flex justify-between items-center 2xl:mx-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-x-105 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <button>
                  {subDropdowns[category._id] ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
                <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {category.category_name} (
                  {getFilteredQuestions(category.questions).length} questions)
                </span>
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditCategory(true);
                    setSelectedCategory(category);
                  }}
                  title="Edit Category"
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 focus:outline-none"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category);
                    setAddModal(true);
                  }}
                  title="Add Question"
                  className="text-green-500 hover:text-green-700 dark:text-green-300 dark:hover:text-green-500 focus:outline-none"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category);
                    setDeleteCategory(true);
                  }}
                  title="Delete Category"
                  className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 focus:outline-none"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {subDropdowns[category._id] && (
              <div className="mx-3 mt-4 space-y-2 transition-all duration-500">
                {difficultyLevels.map((level) => (
                  <div key={level}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(`${category._id}+${level}`);
                      }}
                      className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-3 rounded-lg shadow-inner transition-transform duration-500 transform hover:scale-105 cursor-pointer"
                    >
                      <div className="text-md text-gray-900 dark:text-gray-100 flex items-center">
                        {level} ({getQuestionCount(category.questions, level)}{" "}
                        questions)
                      </div>
                      <button>
                        {dropdowns[`${category._id}+${level}`] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>
                    {dropdowns[`${category._id}+${level}`] && (
                      <div className="m-4 mt-4 space-y-2 transition-all duration-500">
                        {getFilteredQuestions(category.questions)
                          .filter(
                            (question) => question.question_difficulty === level
                          )
                          .map((question) => (
                            <div
                              key={question._id}
                              className="flex justify-between items-center bg-gray-100 dark:bg-gray-500 p-3 rounded-lg shadow-inner transition-transform duration-500 transform hover:scale-105"
                            >
                              <div className="text-md text-gray-900 dark:text-gray-100">
                                {question.question_name}
                              </div>
                              <div className="flex space-x-2 sm:space-x-4">
                                <button
                                  onClick={() => {
                                    setEditQuestion(true);
                                    setSelectedQuestion(question);
                                  }}
                                  className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 focus:outline-none"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setSelectedQuestion(question);
                                    setDeleteQuestion(true);
                                  }}
                                  className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 focus:outline-none"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
      {editCategory && (
        <EditCategoryModal
          category={selectedCategory}
          fetchCategories={fetchCategories}
          onClose={() => {
            setEditCategory(false);
            setSelectedCategory(null);
          }}
        />
      )}
      {editQuestion && (
        <EditQuestionModal
          question={selectedQuestion}
          fetchCategories={fetchCategories}
          onClose={() => {
            setEditQuestion(false);
            setSelectedQuestion(null);
          }}
        />
      )}
      {deleteCategory && (
        <ConfirmationModal
          message="Are you sure you want to delete this category?"
          fetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          selectedQuestion={null}
          onCancel={() => {
            setDeleteCategory(false);
            setSelectedCategory(null);
          }}
        />
      )}
      {deleteQuestion && (
        <ConfirmationModal
          message="Are you sure you want to delete this question?"
          fetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          selectedQuestion={selectedQuestion}
          onCancel={() => {
            setDeleteQuestion(false);
            setSelectedQuestion(null);
          }}
        />
      )}
      {addModal && (
        <AddModal
          selectedCategory={selectedCategory}
          categories={categories}
          fetchCategories={fetchCategories}
          onClose={() => {
            setAddModal(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoriesAccordion;
