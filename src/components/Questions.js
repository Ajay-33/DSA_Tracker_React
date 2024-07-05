import React, { useContext, useState, useEffect } from "react";
import { FaYoutube } from "react-icons/fa";
import Question from "./Question";
import QuestionsContext from "../context/questions/QuestionsContext";
import HorizontalProgressBar from "./HorizontalProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

function Questions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { setError, setProgress, userType, setUserType } = context;
  const [isLoading, setIsLoading] = useState(true);
  const [catData, setCatData] = useState({});
  const [catRes, setCatRes] = useState({});
  const [openModal, setOpenModal] = useState("hidden");
  const [note, setNote] = useState({ id: "", vnotes: "" });
  const [categoryDone, setCategoryDone] = useState(0);

  const getCategoryData = async (id) => {
    try {
      setIsLoading(true);
      setProgress(25);
      let endpoint = `${process.env.REACT_APP_HOST}/api/v1/data/get-categories-data/${id}`;
      let headers = {
        "Content-Type": "application/json",
      };

      if (userType !== "Guest" && userType != null) {
        headers.Authorization = "Bearer " + localStorage.getItem("token");
      } else {
        setUserType("Guest");
        endpoint = `${process.env.REACT_APP_HOST}/api/v1/data/get-categories-data-guest/${id}`;
      }

      const response = await fetch(endpoint, {
        method: "GET",
        headers: headers,
      });
      setProgress(50);
      const json = await response.json();
      if (!response.ok) {
        navigate("/");
        throw new Error(json.message);
      }
      setProgress(75);
      setCatData(json.c_data);
      setCatRes(json.responses);
    } catch (error) {
      setIsLoading(false);
      setProgress(100);
      setError(error.message);
      if (error.message === "Session Expired") {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      }
      navigate("/");
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  const getCategoryResponses = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/data/get-category-responses/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setCatRes(json);
    } catch (error) {
      console.error("Error fetching responses", error.message);
    }
  };

  useEffect(() => {
    getCategoryData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (catRes && catRes.categoryDone) {
      setCategoryDone(catRes.categoryDone);
    }
  }, [catRes]);

  if (isLoading) {
    return (
      <div className="text-center py-2">
        <Spinner />
      </div>
    );
  }

  const questions = catData.questions || [];
  const { categoryQuestions, Modified_Questions } = catRes;

  const editNote = async (qid, notes) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/response/notes/add/${qid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ notes }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      getCategoryResponses(id);
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  const updateNote = (currentNote, qid) => {
    setOpenModal("block");
    setNote({ id: qid });
    if (currentNote) {
      setNote({ id: qid, vnotes: currentNote.Question_Notes });
    }
  };

  const closeNote = () => {
    setOpenModal("hidden");
    setNote({ vnotes: null, id: null });
  };

  const handleSubmission = () => {
    setOpenModal("hidden");
    if (note.vnotes) {
      editNote(note.id, note.vnotes);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-full w-full relative px-4 pt-2 pb-4">
      <div
        className={`${openModal} fixed inset-0 z-50 h-screen w-screen bg-opacity-15 bg-transparent backdrop-filter backdrop-blur-sm flex justify-center items-center`}
      >
        <div className="h-1/2 w-3/4 sm:w-2/3 sm:h-1/2 md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-around">
          <div className="text-xl sm:text-2xl dark:text-white flex justify-center">
            Notes
          </div>
          <textarea
            className="w-full h-1/2 p-2 border outline-none bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-700 rounded-md resize-none"
            placeholder="Enter your note here..."
            value={note.vnotes || ""}
            name="vnotes"
            onChange={onChange}
          />
          <div className="flex justify-between mt-2">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 rounded-md"
              onClick={closeNote}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-md"
              onClick={handleSubmission}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex justify-between items-center flex-row sm:items-center font-bold text-black  pb-4">
          <a
            href={catData.category_resources[0]}
            target="_blank"
            className="text-red-500 dark:text-gray-100"
            rel="noopener noreferrer"
          >
            <FaYoutube className="mb-2 sm:mb-0 mr-0 sm:mr-2 text-2xl sm:text-3xl lg:text-5xl" />
          </a>
          <div className="dark:text-white text-blue-600 font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:5xl mb-2">
            {catData.category_name}
          </div>
          <a
            href={catData.category_resources[0]}
            target="_blank"
            className="text-red-500 dark:text-gray-100"
            rel="noopener noreferrer"
          >
            <FaYoutube className="mb-2 sm:mb-0 ml-0 sm:ml-2 text-2xl sm:text-3xl lg:text-5xl" />
          </a>
        </div>
        <div className="pb-6">
          <HorizontalProgressBar
            done={categoryDone}
            total={categoryQuestions}
          />
        </div>
      </div>
      <div className="overflow-auto max-h-svh mb-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg">
          <thead
            className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Problem</th>
              <th className="px-6 py-3">Difficulty</th>
              <th className="px-6 py-3">Links</th>
              <th className="px-6 py-3">Solution</th>
              <th className="px-6 py-3">Notes</th>
            </tr>
          </thead>

          <tbody>
            {userType !== "Guest"
              ? questions.map((element) => {
                  const ModifiedQuestion = Modified_Questions.find(
                    (item) => item.Question_id === element._id
                  );
                  const status = ModifiedQuestion
                    ? ModifiedQuestion.Question_Status
                    : "Pending";
                  const notes = ModifiedQuestion;
                  return (
                    <Question
                      key={element._id}
                      question={element}
                      updateNote={updateNote}
                      notes={notes}
                      Status={status}
                      cid={id}
                      getCategoryResponses={getCategoryResponses}
                      setCategoryDone={setCategoryDone}
                      categoryDone={categoryDone}
                    />
                  );
                })
              : questions.map((element) => {
                  return (
                    <Question
                      key={element._id}
                      question={element}
                      updateNote={updateNote}
                      Status="Pending"
                      cid={id}
                      categoryDone="0"
                    />
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Questions;
