import questionsmodel from "../models/questionsmodel.js";
import categorymodel from "../models/categorymodel.js";
import mongoose from "mongoose";

const isValidID = (_id) => mongoose.Types.ObjectId.isValid(_id);

const isValidQuestionData = (questionData) => {
  return (
    questionData.question_name &&
    questionData.question_link[0] &&
    questionData.question_link.length > 0 &&
    questionData.question_solution
  );
};

export const addQuestion = async (req, res, next) => {
  const { cid } = req.params;
  if (!isValidID(cid)) {
    res.status(400).json({ message: "Invalid Category ID" });
  }
  try {
    const category = await categorymodel.findById(cid);
    const allQuestions = await questionsmodel.find();

    if (!req.body) {
      res.status(400).json({ message: "Invalid request body" });
    }

    if (Array.isArray(req.body)) {
      return addMultipleQuestions(req, res, category, allQuestions, next);
    } else if (typeof req.body === "object") {
      return addSingleQuestion(req, res, category, allQuestions, next);
    } else {
      res.status(400).json({ message: "Invalid request body" });
    }
  } catch (error) {
    return next(error);
  }
};

const addMultipleQuestions = async (req, res, category, allQuestions, next) => {
  const duplicateQuestions = [];
  const questionToAdd = [];

  for (const questionData of req.body) {
    if (!isValidQuestionData(questionData)) {
      return next("Question name and at least one Question link is required");
    }
    const existingQuestion = allQuestions.find(
      (que) => que.question_name === questionData.question_name
    );
    if (existingQuestion) {
      duplicateQuestions.push(questionData.question_name);
    } else {
      questionToAdd.push(questionData);
    }
  }

  if (duplicateQuestions.length > 0) {
    return res.status(400).json({
      message: "Duplicate Question names are found",
      duplicateQuestions,
    });
  }

  try {
    const addedQuestions = await questionsmodel.create(questionToAdd);
    category.questions.push(...addedQuestions);
    await category.save();
    return res
      .status(201)
      .json({ message: "Questions added successfully", addedQuestions });
  } catch (error) {
    return next(error);
  }
};

const addSingleQuestion = async (req, res, category, allQuestions, next) => {
  if (!isValidQuestionData(req.body)) {
    return res
      .status(400)
      .json({ message: "Please fill out all the required fields" });
  }

  const existingQuestion = allQuestions.find(
    (que) => que.question_name === req.body.question_name
  );
  if (existingQuestion) {
    return res
      .status(400)
      .json({ message: "Question with the same name already exists" });
  }

  try {
    const question = await questionsmodel.create(req.body);
    category.questions.push(question);
    await category.save();
    return res
      .status(201)
      .json({ message: "Question added successfully", question });
  } catch (error) {
    return next(error);
  }
};

export const getAllQuestions = async (req, res, next) => {
  const { difficulty } = req.query;
  // for filtering
  const queryObject = {
    question_difficulty: difficulty,
  };
  try {
    let queryResult = await questionsmodel.find(queryObject);
    if (!difficulty) {
      queryResult = await questionsmodel.find();
    }
    res.status(200).json(queryResult);
  } catch (error) {
    next(error);
  }
};

export const getQuestionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const question = await questionsmodel.findById(id);
    if (!question) {
      next("No question is found with this ID");
    }
    res.status(200).json({ question });
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedQuestion = await questionsmodel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ updatedQuestion });
  } catch (error) {
    return next(error);
  }
};

export const deleteQuestion = async (req, res, next) => {
  const { id, cid } = req.params;
  if (!isValidID(cid)) {
    res.status(400).json({ message: "Invalid Category ID" });
  }
  try {
    const category = await categorymodel.findById(cid);
    const question = await questionsmodel.findByIdAndDelete(id);
    if (!question) {
      next("No question is found with this ID");
    }
    const indexToRemove = category.questions.indexOf(id);
    if (indexToRemove !== -1) {
      category.questions.splice(indexToRemove, 1);
    }
    await category.save();
    res.status(200).json({ message: "Successfully category deleted" });
  } catch (error) {
    return next(error);
  }
};
