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
import AddQuestionModal from "./AddQuestionModal";

function CategoriesAccordion({ categories, fetchCategories }) {
  const host = "http://localhost:8080";
  const [dropdowns, setDropdowns] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [refCategoryId, setRefCategoryId] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const toggleDropdown = useCallback((categoryId) => {
    console.log("op");
    setDropdowns((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const saveCategory = async (updatedCategory) => {
    try {
      const response = await fetch(
        `${host}/api/v1/category/update/${updatedCategory._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            category_name: updatedCategory.category_name,
            category_resources: updatedCategory.category_resources,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Edit Category");
      }
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating status:", error.message);
      setSelectedCategory(null);
    }
  };

  const saveQuestion = async (updatedQuestion) => {
    console.log("Saving question", updatedQuestion);
    try {
      const response = await fetch(
        `${host}/api/v1/question/update/${updatedQuestion._id}`,
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
      if (!response.ok) {
        throw new Error("Failed to Edit Category");
      }
      setSelectedQuestion(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating Question:", error.message);
      setSelectedCategory(null);
    }
  };

  const onDeleteCategory = async (cid) => {
    try {
      const response = await fetch(`${host}/api/v1/category/delete/${cid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Delete Category");
      }
      setDeleteCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting Question:", error.message);
      setDeleteQuestionId(null);
    }
  };

  const onDeleteQuestion = async (qid) => {
    try {
      const response = await fetch(
        `${host}/api/v1/question/delete/${qid}/${refCategoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Delete Question");
      }
      setDeleteQuestionId(null);
      setRefCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting Question:", error.message);
      setRefCategoryId(null);
      setDeleteQuestionId(null);
    }
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
              className="text-base rounded-sm p-2 dark:bg-green-600 dark:text-white bg-green-700 ml-2 text-white flex items-center justify-center transition-transform transform hover:scale-110"
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
              <button
                onClick={() => {
                  setAddQuestion(true);
                  setRefCategoryId(category._id);
                }}
                className="text-green-500 hover:text-green-700 dark:text-green-300 dark:hover:text-green-500 focus:outline-none "
              >
                <FaPlus />
              </button>
              <button
                onClick={() => {
                  setDeleteCategoryId(category._id);
                  toggleDropdown(category._id);
                }}
                className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 focus:outline-none"
              >
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
                      <button
                        onClick={() => {
                          setDeleteQuestionId(question._id);
                          setRefCategoryId(category._id);
                          toggleDropdown(category._id);
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
      {selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onSave={saveCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
      {selectedQuestion && (
        <EditQuestionModal
          question={selectedQuestion}
          onSave={saveQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
      {deleteCategoryId && (
        <ConfirmationModal
          message="Are you sure you want to delete this category?"
          onConfirm={handleDeleteCategory}
          onCancel={() => setDeleteCategoryId(null)}
        />
      )}
      {deleteQuestionId && (
        <ConfirmationModal
          message="Are you sure you want to delete this question?"
          onConfirm={handleDeleteQuestion}
          onCancel={() => setDeleteQuestionId(null)}
        />
      )}
      {addModal && (
        <AddModal categories={categories} onClose={() => setAddModal(false)} />
      )}
      {addQuestion && (
        <AddQuestionModal
          onClose={() => {
            setAddQuestion(false);
            setRefCategoryId(null);
          }}
        />
      )}
    </div>
  );
}

export default CategoriesAccordion;
