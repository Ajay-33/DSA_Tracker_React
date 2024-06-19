import categorymodel from "../models/categorymodel.js";
import questionsmodel from "../models/questionsmodel.js";

export const addCategory = async (req, res, next) => {
  try {
    if (Array.isArray(req.body)) {
      const categoriesToAdd = [];
      const duplicateCategoryNames = [];
      const allCategories = await categorymodel.find();
      for (const categoryData of req.body) {
        if (
          !categoryData.category_name ||
          !categoryData.category_resources ||
          categoryData.category_resources.length === 0
        ) {
          res
            .status(400)
            .json({ message: "Category name and resources are required" });
          return;
        }

        if (
          allCategories.some(
            (cat) => cat.category_name === categoryData.category_name
          )
        ) {
          duplicateCategoryNames.push(categoryData.category_name);
        } else {
          categoriesToAdd.push(categoryData);
        }
      }

      if (duplicateCategoryNames.length > 0) {
        res.status(400).json({
          message: "Duplicate category names found",
          duplicateCategoryNames,
        });
        return;
      } else {
        const addedCategories = await categorymodel.create(categoriesToAdd);
        res
          .status(200)
          .json({ message: "Categories added successfully", addedCategories });
      }
    } else if (typeof req.body === "object") {
      if (
        !req.body.category_name ||
        !req.body.category_resources ||
        req.body.category_resources.length === 0
      ) {
        res
          .status(400)
          .json({ message: "Category name and resources are required" });
        return;
      }
      const category = await categorymodel.create(req.body);
      res
        .status(201)
        .json({ message: "Category added successfully", category });
    } else {
      res.status(400).json({ message: "Invalid request body" });
    }
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await categorymodel.find().populate("questions");
    categories.sort((a, b) => a.category_name.localeCompare(b.category_name));
    categories.forEach((category) => {
      category.questions.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const getCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await categorymodel.findById(id);
    if (!category) {
      next("No category is found with this ID");
    }
    res.status(200).json({ category });
  } catch (error) {
    return next(error);
  }
};

export const UpdateCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCategory = await categorymodel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({ updatedCategory });
  } catch (error) {
    return next(error);
  }
};

export const DeleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await categorymodel.findOne({ _id: id });
    if (!category) {
      res.status(400).json({ message: "No Category is found with this ID" });
    }
    const idsArray = category.questions;
    await questionsmodel.deleteMany({ _id: { $in: idsArray } });
    await category.deleteOne();
    res.status(200).json({ message: "Successfully Category deleted" });
  } catch (error) {
    return next(error);
  }
};
