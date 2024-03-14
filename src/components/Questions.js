import React, { useContext,useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import Question from './Question';
import QuestionsContext from '../context/questions/QuestionsContext';
import HorizontalProgressBar from './HorizontalProgressBar';

function Questions({ c_data }) {
  const questions = c_data.questions;
  const context = useContext(QuestionsContext);
  const { userResponses,editNote } = context;
  const { categoryQuestions, categoryDone, categoryPercentage, Modified_Questions } = userResponses.category_values[c_data.category_name];
  const [openModal, setOpenModal] = useState('hidden')
  const[note,setNote]=useState({id:"",vnotes:""})
  const updateNote = (currentNote,qid) => {
    setOpenModal('block')
    setNote({id:qid})
    if (currentNote) {
    console.log(currentNote);
    setNote({id:qid,vnotes:currentNote.Question_Notes})
    }
  }
  const closeNote=()=>{
    setOpenModal('hidden')
    setNote({vnotes:null,id:null})
  }
  const handleSubmission = (e) => {
    setOpenModal('hidden')
    if(note.vnotes){
      editNote(note.id,note.vnotes)
    }
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className={`${openModal} fixed inset-0 z-50 h-screen w-screen bg-opacity-15 bg-transparent backdrop-filter backdrop-blur-sm flex justify-center items-center`}>
      <div className="h-1/2 w-1/3 bg-white p-4 rounded-lg shadow-lg flex flex-col justify-around">
            <div className='text-2xl flex justify-center'>Notes</div>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none"
              placeholder="Enter your note here..." value={note.vnotes||''} name='vnotes' onChange={onChange}
            />
            <div className="flex justify-between mt-2">
              <button className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={closeNote}>
                Close
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSubmission}>
                Submit
              </button>
            </div>
          </div>
      </div>


      <div className="container mx-auto px-4 py-6">
        <div className='flex text-5xl font-bold text-black justify-between items-center pb-6'>
          <a href={c_data.category_resources[0]} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="mr-2" />
          </a>
          <div>{c_data.category_name}</div>
          <a href={c_data.category_resources[0]} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="ml-2" />
          </a>
        </div>
        <div className='pb-6'>
          <HorizontalProgressBar percentage={categoryPercentage} done={categoryDone} total={categoryQuestions} />
        </div>
        <div className='overflow-auto' style={{ maxHeight: '430px' }}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Problem</th>
                <th className="px-6 py-3">Difficulty</th>
                <th className="px-6 py-3">Links</th>
                <th className="px-6 py-3">Solution</th>
                <th className="px-6 py-3">Notes</th>
                {/* <th className="px-6 py-3">BookMark</th> */}
              </tr>
            </thead>
            <tbody>
              {questions.map((element) => {
                const ModifiedQuestion = Modified_Questions.find((item) => item.Question_id === element._id);
                const status = ModifiedQuestion ? ModifiedQuestion.Question_Status : 'Pending';
                const notes=ModifiedQuestion
                return <Question key={element._id} question={element} updateNote={updateNote} notes={notes} Status={status} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Questions;