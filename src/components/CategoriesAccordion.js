import React, { useState, useCallback } from "react";
import {
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
} from "react-icons/fa";
import EditCategoryModal from "./EditCategoryModal";
import EditQuestionModal from "./EditQuestionModal";
import ConfirmationModal from "./ConfirmationModal";

function CategoriesAccordion({ categories }) {
  const [dropdowns, setDropdowns] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);

  const toggleDropdown = useCallback((categoryId) => {
    console.log('op');
    setDropdowns((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const saveCategory = async (updatedCategory) => {
    // API call to save the updated category
    // await api.updateCategory(updatedCategory);
    console.log("Saving category", updatedCategory);
    setSelectedCategory(null);
  };

  const saveQuestion = async (updatedQuestion) => {
    // API call to save the updated question
    // await api.updateQuestion(updatedQuestion);
    console.log("Saving question", updatedQuestion);
    setSelectedQuestion(null);
  };

  const onDeleteCategory = async (qid) => {
    // API call to save the updated question
    // await api.updateQuestion(updatedQuestion);
    console.log("Saving question", qid);
    setDeleteCategoryId(null);
  };

  const onDeleteQuestion = async (qid) => {
    // API call to save the updated question
    // await api.updateQuestion(updatedQuestion);
    console.log("Saving question", qid);
    setDeleteQuestionId(null);
  };

  const openCategoryModal = (category) => {
    toggleDropdown(category._id);
    setSelectedCategory(category);
  };

  const openQuestionModal = (question) => {
    setSelectedQuestion(question);
  };

  const handleDeleteCategory = () => {
    onDeleteCategory(deleteCategoryId);
  };

  const handleDeleteQuestion = () => {
    onDeleteQuestion(deleteQuestionId);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.questions.some((question) =>
        question.question_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="w-full lg:w-3/4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Categories
        </h2>
        <div className="relative w-1/3">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 p-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-md transition duration-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Search Categories and Questions..."
          />
        </div>
      </div>
      {filteredCategories.map((category) => (
        <div
          key={category._id}
          className="mb-4 outline-none"
          onClick={() => toggleDropdown(category._id)}
        >
          <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
            <div className="flex items-center space-x-2">
              <button>
                {dropdowns[category._id] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {category.category_name}
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => openCategoryModal(category)}
                className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 focus:outline-none"
              >
                <FaEdit />
              </button>
              <button  onClick={() => {setDeleteCategoryId(category._id);toggleDropdown(category._id)}} className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 focus:outline-none">
                <FaTrash />
              </button>
            </div>
          </div>
          {dropdowns[category._id] && (
            <div className="ml-6 mt-4 space-y-2 transition-all duration-500">
              {category.questions
                .filter((question) =>
                  question.question_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((question) => (
                  <div
                    key={question._id}
                    onClick={() => toggleDropdown(category._id)}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-3 rounded-lg shadow-inner transition-transform duration-500 transform hover:scale-105"
                  >
                    <div className="text-md text-gray-900 dark:text-gray-100">
                      {question.question_name}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => openQuestionModal(question)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 focus:outline-none"
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => setDeleteQuestionId(question._id)} className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 focus:outline-none">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
      {selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={()=>setSelectedCategory(null)}
          onSave={saveCategory}
        />
      )}
      {selectedQuestion && (
        <EditQuestionModal
          question={selectedQuestion}
          onClose={()=>setSelectedQuestion(null)}
          onSave={saveQuestion}
        />
      )}
      {deleteCategoryId && (
        <ConfirmationModal
          message="Are you sure you want to delete this category? You will lose all related data."
          onConfirm={handleDeleteCategory}
          onCancel={() => setDeleteCategoryId(null)}
        />
      )}

      {deleteQuestionId && (
        <ConfirmationModal
          message="Are you sure you want to delete this question? This action cannot be undone."
          onConfirm={handleDeleteQuestion}
          onCancel={() => setDeleteQuestionId(null)}
        />
      )}
    </div>
  );
}

export default CategoriesAccordion;
