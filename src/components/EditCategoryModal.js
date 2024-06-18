import React, { useState, useEffect, useContext } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";

function EditCategoryModal({ category, onClose, fetchCategories }) {
  const context = useContext(QuestionsContext);
  const { host, setError } = context;
  const [categoryName, setCategoryName] = useState("");
  const [categoryResource, setCategoryResource] = useState("");

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
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setError(`Succesfully updated category ${updatedCategory.category_name}`)
      onClose();
      fetchCategories();
    } catch (error) {
      setError(error.message || "Failed to Edit Category");
    }
  };
  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name);
      setCategoryResource(category.category_resources[0] || "");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = {
      ...category,
      category_name: categoryName,
      category_resources: [categoryResource],
    };
    saveCategory(updatedCategory);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 sm:p-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          Edit Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Resource <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={categoryResource}
              onChange={(e) => setCategoryResource(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category Resource 1"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCategoryModal;
