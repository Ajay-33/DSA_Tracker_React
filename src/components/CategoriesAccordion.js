import React, { useState, useCallback } from "react";
import {
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import EditCategoryModal from "./EditCategoryModal";
import EditQuestionModal from "./EditQuestionModal";
import ConfirmationModal from "./ConfirmationModal";
import AddModal from "./AddModal";

function CategoriesAccordion({ categories, fetchCategories }) {
  const [dropdowns, setDropdowns] = useState(false);
  const [subDropdowns, setSubDropdowns] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [editCategory, setEditCategory] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);

  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);

  const [addModal, setAddModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const toggleDropdown = useCallback((id) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);

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

  const filteredCategories = categories.filter(
    (category) =>
      category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.questions.some((question) =>
        question.question_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const getFilteredQuestions = (questions) =>
    questions.filter((question) =>
      question.question_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getQuestionCount = (questions, level) =>
    getFilteredQuestions(questions).filter(
      (question) => question.question_difficulty === level
    ).length;

  return (
    <div className="w-full lg:w-3/4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Categories
        </h2>
        <div className="relative w-1/3 flex items-center">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 p-1.5 w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-md transition duration-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Search Categories and Questions..."
          />
          <div className="group relative">
            <button
              className="text-base rounded-sm p-2 bg-green-500 hover:bg-green-600 text-white ml-2 flex items-center justify-center transition-transform transform hover:scale-110"
              onClick={() => setAddModal(true)}
            >
              <FaPlus />
            </button>
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 w-max px-2 py-1 text-sm text-blue-100 bg-blue-500 rounded-md shadow-md opacity-0 group-hover:opacity-90 hidden group-hover:block transition-transform duration-300 z-50 hover:scale-105">
              Add Category or Question
            </span>
          </div>
        </div>
      </div>
      {filteredCategories.map((category) => (
        <div key={category._id} className="mb-4 outline-none">
          <div
            onClick={() => toggleSubDropdown(category._id)}
            className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105 cursor-pointer"
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
            <div className="flex space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditCategory(true);
                  setSelectedCategory(category);
                }}
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
                className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 focus:outline-none"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          {subDropdowns[category._id] && (
            <div className="ml-6 mt-4 space-y-2 transition-all duration-500">
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
                    <div className="ml-6 mt-4 space-y-2 transition-all duration-500">
                      {getFilteredQuestions(category.questions)
                        .filter(
                          (question) => question.question_difficulty === level
                        )
                        .map((question) => (
                          <div
                            key={question._id}
                            className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-3 rounded-lg shadow-inner transition-transform duration-500 transform hover:scale-105"
                          >
                            <div className="text-md text-gray-900 dark:text-gray-100">
                              {question.question_name}
                            </div>
                            <div className="flex space-x-4">
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
      ))}
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
          fetchCategories={fetchCategories}
          categories={categories}
          selectedCategory={selectedCategory}
          onClose={() => {
            setAddModal(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
}

export default CategoriesAccordion;
