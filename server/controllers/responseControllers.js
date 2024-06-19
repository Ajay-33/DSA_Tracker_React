import responsemodel from "../models/responsemodel.js";
import questionsmodel from "../models/questionsmodel.js";
import mongoose from "mongoose";

const isValidID = (_id) => mongoose.Types.ObjectId.isValid(_id);

export const updateStatus = async (req, res, next) => {
  const { qid } = req.params;
  if (!isValidID(qid)) {
    next("Invalid Question ID");
    return;
  }
  const { status } = req.body;
  if (!status) {
    next("Enter Valid Status");
    return;
  }
  const User_info = req.user && req.user.userId;
  if (!User_info) {
    next("User ID not available");
    return;
  }
  let Response = await responsemodel.findOne({
    CreatedBy: User_info,
    Question_id: qid,
  });
  if (Response && status === "Pending" && !Response.Question_Notes) {
    await responsemodel.findOneAndDelete({
      CreatedBy: User_info,
      Question_id: qid,
    });
    res.status(200).json({});
    return;
  }
  if (!Response && status !== "Pending") {
    Response = await responsemodel.create({
      CreatedBy: User_info,
      Question_id: qid,
      Question_Status: status,
    });
  } else if (!Response && status === "Pending") {
    res.status(200).json({});
    return;
  } else {
    Response.Question_Status = status;
  }
  await Response.save();
  res.status(200).json({ Response });
};

export const showStatus = async (req, res, next) => {
  const User_info = req.user && req.user.userId;

  if (!User_info) {
    next("User ID not available");
    return;
  }
  const { qid } = req.params;
  if (!isValidID(qid)) {
    next("Invalid Question ID");
    return;
  }
  let Response = await responsemodel.findOne({
    CreatedBy: User_info,
    Question_id: qid,
  });
  if (!Response.Question_Status || Response.Question_Status === "Pending") {
    // console.log("Empty");
    res.status(200).json({
      Question_id: Response.Question_id,
      status: "Pending",
    });
  } else {
    res.status(200).json({
      Question_id: Response.Question_id,
      status: Response.Question_Status,
    });
  }
};

export const showStatusQuery = async (req, res, next) => {
  const User_info = req.user && req.user.userId;

  if (!User_info) {
    next("User ID not available");
    return;
  }

  const { status } = req.query;

  try {
    let queryResults;

    if (status === "Revisit" || status === "Completed") {
      queryResults = await responsemodel.find({
        CreatedBy: User_info,
        Question_Status: status,
      });
    } else if (status === "Pending" || !status) {
      const allQuestions = await questionsmodel.find({});
      const userResponses = await responsemodel.find({ CreatedBy: User_info });

      const pendingQuestions = allQuestions.filter(
        (question) =>
          !userResponses.some((response) =>
            response.Question_id.equals(question._id)
          )
      );

      if (!status) {
        const RemainingQuestions = await responsemodel.find({
          CreatedBy: User_info,
        });
        queryResults = [...pendingQuestions, ...RemainingQuestions];
      } else {
        const responseQuestions = userResponses.filter(
          (response) =>
            !response.Question_Status || response.Question_Status === "Pending"
        );
        queryResults = [...pendingQuestions, ...responseQuestions];
      }
      // console.log(queryResults);
    }

    const extractedData = queryResults.map((result) => ({
      Question_id: result.Question_id || result._id,
      Question_Status: result.Question_Status || "Pending",
    }));

    res.status(200).json(extractedData);
  } catch (error) {
    next(error);
  }
};

export const updateNotes = async (req, res, next) => {
  const { qid } = req.params;
  if (!isValidID(qid)) {
    next("Invalid Question ID");
    return;
  }
  const { notes } = req.body;
  const User_info = req.user && req.user.userId;
  if (!User_info) {
    next("User ID not available");
    return;
  }
  let Response = await responsemodel.findOne({
    CreatedBy: User_info,
    Question_id: qid,
  });
  if (!Response && !notes) {
    res.status(200).json();
    return;
  }
  if (
    Response &&
    !notes &&
    (!Response.Question_Status || Response.Question_Status === "Pending")
  ) {
    await responsemodel.findOneAndDelete({
      CreatedBy: User_info,
      Question_id: qid,
    });
    res.status(200).json();
    return;
  }
  if (!Response && notes) {
    Response = await responsemodel.create({
      CreatedBy: User_info,
      Question_id: qid,
      Question_Notes: notes,
    });
  } else {
    Response.Question_Notes = notes;
  }
  await Response.save();
  res.status(200).json({ Response });
};

export const showNotes = async (req, res, next) => {
  const User_info = req.user && req.user.userId;
  if (!User_info) {
    next("User ID not available");
    return;
  }
  const { qid } = req.params;
  if (!isValidID(qid)) {
    next("Invalid Question ID");
    return;
  }
  let Response = await responsemodel.findOne({
    CreatedBy: User_info,
    Question_id: qid,
  });
  if (!Response) {
    res.status(200).json("No Notes");
  } else {
    res.json({
      Question_id: Response.Question_id,
      Notes: Response.Question_Notes || "No Notes",
    });
  }
};

// export const updateBookMark=async(req,res,next)=>{
//     const {qid}=req.params;
//     if (!isValidID(qid)) {
//         next('Invalid Question ID');
//         return;
//     }
//     const User_info = req.user && req.user.userId;
//     if (!User_info) {
//         next('User ID not available');
//         return;
//     }
//     let Response= await responsemodel.findOne({CreatedBy:User_info,Question_id:qid});
//     if(!Response){
//         Response=await responsemodel.create({CreatedBy:User_info,Question_id:qid,Question_Notes:notes});
//         Response.BookMark=true;
//         res.status(200).json({Response})
//         return;
//     }
//     if(Response && Response.BookMark===true && (!Response.Question_Status||Response.Question_Status==='Pending') && !Response.Question_Notes){
//         await responsemodel.findOneAndDelete({CreatedBy:User_info,Question_id:qid})
//         res.status(200).json()
//         console.log('Dusted')
//         return;
//     }
//     else{
//         Response.BookMark=!(Response.BookMark)
//     }
//     await Response.save()
//     res.status(200).json({Response})
// }

// export const getAllBookMarks=async(req,res,next)=>{
//     const User_info = req.user && req.user.userId;
//     if (!User_info) {
//         next('User ID not available');
//     }
//     try {
//         const responses = await responsemodel.find({ CreatedBy: User_info, BookMark: true });

//         const bookmarks = responses.map(response => ({
//             questionId: response.Question_id,
//             bookmark: response.BookMark
//         }));

//         res.status(200).json({ bookmarks });
//     } catch (error) {
//         next(error);
//     }
// }
