import responsemodel from "../models/responsemodel.js";
import questionsmodel from "../models/questionsmodel.js";
import categorymodel from "../models/categorymodel.js";

export const getAllData = async (req, res, next) => {
    const User_info = req.user && req.user.userId;
    if (!User_info) {
        next('User ID not available');
        return;
    }
    try {
        const Total_Questions = await questionsmodel.countDocuments()
        const Questions_done = await responsemodel.countDocuments({
            CreatedBy: User_info,
            Question_Status: 'Completed'
        })
        const Total_percentage=parseFloat(((Questions_done/Total_Questions)*100).toFixed(2))
        const Total_values = {
            Total_Questions:Total_Questions,
            Questions_done:Questions_done,
            Total_percentage:Total_percentage
        }
        const category_values = await getCategoryResponses(User_info);
        const revisitedQuestionsInfo = await getRevisitedQuestionInfo(User_info);
        const data = await categorymodel.find().populate('questions');
        const responses={
            Total_values:Total_values,
            category_values:category_values,
            revisitedQuestionsInfo:revisitedQuestionsInfo
        }
        res.status(200).json({
            responses,
            data
        });
    }
    catch(error){
        next(error);
    }
    
}

const getCategoryResponses = async (userId) => {
    const categories = await categorymodel.find({});
    let categoryValues = {};

    for (const category of categories) {
        const categoryQuestions = category.questions.length;
        const Modified_Questions = await responsemodel.find({
            CreatedBy: userId,
            // Question_Status: 'Completed',
            Question_id: { $in: category.questions }
        });
        const categoryDone=Modified_Questions.filter(question => question.Question_Status === 'Completed').length;
        const categoryPercentage=parseFloat(((categoryDone/categoryQuestions)*100).toFixed(2))
        const categoryValue = {
            categoryQuestions:categoryQuestions,
            categoryDone:categoryDone,
            Modified_Questions:Modified_Questions,
            categoryPercentage:categoryPercentage
        }
        categoryValues[category.category_name] = categoryValue;
    }

    return categoryValues;
};

const getRevisitedQuestionInfo = async (userId) => {
    const visitedQuestions = await responsemodel.countDocuments({
        CreatedBy: userId,
        Question_Status: 'Revisit'
    });
    return {
        CreatedBy: userId,
        Revisit_Questions: visitedQuestions
    };
};

export const getUserResponses = async (req, res, next) => {
    const User_info = req.user && req.user.userId;
    if (!User_info) {
        next('User ID not available');
        return;
    }
    try {
        const Total_Questions = await questionsmodel.countDocuments()
        const Questions_done = await responsemodel.countDocuments({
            CreatedBy: User_info,
            Question_Status: 'Completed'
        })
        const Total_percentage=parseFloat(((Questions_done/Total_Questions)*100).toFixed(2))
        const Total_values = {
            Total_Questions:Total_Questions,
            Questions_done:Questions_done,
            Total_percentage:Total_percentage
        }
        const category_values = await getCategoryResponses(User_info);
        const revisitedQuestionsInfo = await getRevisitedQuestionInfo(User_info);
        res.status(200).json({
            Total_values,
            category_values,
            revisitedQuestionsInfo
        });
    }
    catch(error){
        next(error);
    }
    
}