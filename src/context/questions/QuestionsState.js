import { useState } from "react";
import QuestionsContext from "./QuestionsContext";

const QuestionsState = (props) => {
    const host = 'http://localhost:8080'
    const dataInitial = []
    const [data, setData] = useState(dataInitial)
    const categoryInitial = []
    const [category, setCategory] = useState(categoryInitial)
    // percentages
    const responseInitial = []
    const [userResponses, setUserResponses] = useState(responseInitial)
    const [mode,setMode]=useState('dark');

    const updateMode=async()=>{
        if(mode==='dark'){
            setMode('light')
        }
        else{
            setMode('dark')
        }
    }

    const getAllData = async () => {
        try {
            const response = await fetch(`${host}/api/v1/data/get-all-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch responses');
            }
            const json = await response.json();
            console.log(json);
            setUserResponses(json['responses'])
            setData(json['data'])
        }
        catch (error) {
            console.error('Error fetching responses', error.message)
        }
    }

    const getUserResponses=async()=>{
        try {
            const response = await fetch(`${host}/api/v1/data/get-user-responses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch responses');
            }
            const json = await response.json();
            console.log(json);
            setUserResponses(json)
        }
        catch (error) {
            console.error('Error fetching responses', error.message)
        }
    }


    const updateActions = async (qid, status) =>{
        try {
            const response = await fetch(`${host}/api/v1/response/status/add/${qid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ status })
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            getUserResponses()
            // updating status client side without making extra api call for get-all-responses
            // const json = await response.json();
            // Remove the response from Modified_Questions if json is empty
            // const updatedResponses = { ...userResponses };
            // const prevCategoryDone = updatedResponses.category_values[category.category_name].categoryDone
            // updatedResponses.category_values[category.category_name].Modified_Questions = updatedResponses.category_values[category.category_name].Modified_Questions.filter(
            //     (item) => item.Question_id !== qid
            // );
            // let completedQuestions
            // if (!json.Response) {
            //     completedQuestions = updatedResponses.category_values[category.category_name].Modified_Questions.filter(
            //         (item) => item.Question_Status === "Completed"
            //     );
            // } else {
            //     // Remove the existing response from Modified_Questions
            //     // Add the new response to Modified_Questions
            //     updatedResponses.category_values[category.category_name].Modified_Questions = [
            //         ...updatedResponses.category_values[category.category_name].Modified_Questions,
            //         json.Response,
            //     ];
            //     completedQuestions = updatedResponses.category_values[category.category_name].Modified_Questions.filter(
            //         (item) => item.Question_Status === "Completed"
            //     );
            // }

            // const categoryDone = completedQuestions.length;
            // const categoryQuestions = updatedResponses.category_values[category.category_name].categoryQuestions;
            // const categoryPercentage = ((categoryDone / categoryQuestions) * 100).toFixed(2);
            // updatedResponses.category_values[category.category_name].categoryDone = categoryDone;
            // updatedResponses.category_values[category.category_name].categoryPercentage = categoryPercentage;

            // const TotalQuestions = updatedResponses['Total_values'].Total_Questions
            // const updatedQuestionsDone = updatedResponses['Total_values'].Questions_done + (categoryDone - prevCategoryDone);
            // const TotalPercentage = ((updatedQuestionsDone / TotalQuestions) * 100).toFixed(2);
            // updatedResponses['Total_values'].Questions_done = updatedQuestionsDone;
            // updatedResponses['Total_values'].Total_percentage = TotalPercentage;
            // console.log(updatedResponses);
            // setUserResponses(updatedResponses);
        } catch (error) {
            console.error('Error updating status:', error.message);
        }
    };

    const editNote = async (qid, notes) => {
        try {
            const response = await fetch(`${host}/api/v1/response/notes/add/${qid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ notes })
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            getUserResponses()
        }catch(err){
            console.error('Error updating status:', err.message);
        }
    }
    const Category_data = async (data) => {
        setCategory(data)
    }
    return (
        <QuestionsContext.Provider value={{ category, Category_data, getAllData, updateActions, userResponses,data,editNote,mode,updateMode }}>
            {props.children}
        </QuestionsContext.Provider>
    )
}

export default QuestionsState;