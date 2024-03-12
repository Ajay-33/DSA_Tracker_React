import { useState } from "react";
import QuestionsContext from "./QuestionsContext";

const QuestionsState=(props)=>{
    const categoryInitial = []
    const [category, setCategory] = useState(categoryInitial)

    const percentages={
        "Total_values": {
            "Total_Questions": 360,
            "Questions_done": 7,
            "Total_percentage": 1.94
        },
        "category_values": {
            "Heaps": {
                "categoryQuestions": 19,
                "categoryDone": 0,
                "Modified_Questions": [],
                "categoryPercentage": 0
            },
            "Binary Trees": {
                "categoryQuestions": 36,
                "categoryDone": 0,
                "Modified_Questions": [],
                "categoryPercentage": 0
            },
            "Graphs": {
                "categoryQuestions": 54,
                "categoryDone": 0,
                "Modified_Questions": [
                    {
                        "_id": "65c1d10bfb810b072a34b3ed",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0e8fba3c09758ed2955f5",
                        "Question_Status": "Revisit",
                        "createdAt": "2024-02-06T06:26:19.431Z",
                        "updatedAt": "2024-02-06T06:29:44.290Z",
                        "__v": 0
                    }
                ],
                "categoryPercentage": 0
            },
            "D.P": {
                "categoryQuestions": 56,
                "categoryDone": 0,
                "Modified_Questions": [],
                "categoryPercentage": 0
            },
            "Arrays": {
                "categoryQuestions": 43,
                "categoryDone": 3,
                "Modified_Questions": [
                    {
                        "_id": "65c1d08bfb810b072a34b3d1",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0dff9a3c09758ed29535c",
                        "Question_Status": "Completed",
                        "createdAt": "2024-02-06T06:24:11.888Z",
                        "updatedAt": "2024-02-06T06:24:11.888Z",
                        "__v": 0
                    },
                    {
                        "_id": "65c1d0a9fb810b072a34b3d5",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0dff9a3c09758ed295364",
                        "Question_Status": "Completed",
                        "createdAt": "2024-02-06T06:24:41.082Z",
                        "updatedAt": "2024-02-06T06:24:41.082Z",
                        "__v": 0
                    },
                    {
                        "_id": "65c1d0bafb810b072a34b3d9",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0e0d1a3c09758ed295390",
                        "Question_Status": "Completed",
                        "createdAt": "2024-02-06T06:24:58.697Z",
                        "updatedAt": "2024-02-06T06:24:58.697Z",
                        "__v": 0
                    }
                ],
                "categoryPercentage": 6.98
            },
            "Binary Search": {
                "categoryQuestions": 30,
                "categoryDone": 1,
                "Modified_Questions": [
                    {
                        "_id": "65c1d0cefb810b072a34b3dd",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0e30ca3c09758ed2953fa",
                        "Question_Status": "Completed",
                        "createdAt": "2024-02-06T06:25:18.596Z",
                        "updatedAt": "2024-02-06T06:25:18.596Z",
                        "__v": 0
                    }
                ],
                "categoryPercentage": 3.33
            },
            "Strings": {
                "categoryQuestions": 24,
                "categoryDone": 0,
                "Modified_Questions": [],
                "categoryPercentage": 0
            },
            "Linked List": {
                "categoryQuestions": 35,
                "categoryDone": 2,
                "Modified_Questions": [
                    {
                        "_id": "65c1d0e2fb810b072a34b3e1",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0e3e8a3c09758ed29541e",
                        "Question_Status": "Completed",
                        "createdAt": "2024-02-06T06:25:38.138Z",
                        "updatedAt": "2024-02-06T06:25:38.138Z",
                        "__v": 0
                    },
                    {
                        "_id": "65c1d0edfb810b072a34b3e5",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0e3fca3c09758ed295440",
                        "Question_Status": "Completed",
                        "createdAt": "2024-02-06T06:25:49.968Z",
                        "updatedAt": "2024-02-06T06:25:49.968Z",
                        "__v": 0
                    }
                ],
                "categoryPercentage": 5.71
            },
            "Recursions": {
                "categoryQuestions": 24,
                "categoryDone": 1,
                "Modified_Questions": [
                    {
                        "_id": "65c1d0fdfb810b072a34b3e9",
                        "CreatedBy": "65bd57e2a05de36ffe85d64a",
                        "Question_id": "65c0e47ba3c09758ed295471",
                        "Question_Status": "Completed",
                        "createdAt": "2024-02-06T06:26:05.298Z",
                        "updatedAt": "2024-02-06T06:26:05.298Z",
                        "__v": 0
                    }
                ],
                "categoryPercentage": 4.17
            },
            "Stacks": {
                "categoryQuestions": 12,
                "categoryDone": 0,
                "Modified_Questions": [],
                "categoryPercentage": 0
            },
            "Queues": {
                "categoryQuestions": 13,
                "categoryDone": 0,
                "Modified_Questions": [],
                "categoryPercentage": 0
            },
            "Greedy Algorithms": {
                "categoryQuestions": 14,
                "categoryDone": 0,
                "Modified_Questions": [],
                "categoryPercentage": 0
            }
        },
        "revisitedQuestionsInfo": {
            "CreatedBy": "65bd57e2a05de36ffe85d64a",
            "Revisit_Questions": 1
        }
    }

    const Category_data=async(data)=>{
        setCategory(data)
    }
    return (
        <QuestionsContext.Provider value={{ category,Category_data,percentages }}>
            {props.children}
        </QuestionsContext.Provider>
    )
}

export default QuestionsState;