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
                "categoryPercentage": 0
            },
            "Binary Trees": {
                "categoryQuestions": 36,
                "categoryDone": 0,
                "categoryPercentage": 0
            },
            "Graphs": {
                "categoryQuestions": 54,
                "categoryDone": 0,
                "categoryPercentage": 0
            },
            "D.P": {
                "categoryQuestions": 56,
                "categoryDone": 0,
                "categoryPercentage": 0
            },
            "Arrays": {
                "categoryQuestions": 43,
                "categoryDone": 3,
                "categoryPercentage": 6.98
            },
            "Binary Search": {
                "categoryQuestions": 30,
                "categoryDone": 1,
                "categoryPercentage": 3.33
            },
            "Strings": {
                "categoryQuestions": 24,
                "categoryDone": 0,
                "categoryPercentage": 0
            },
            "Linked List": {
                "categoryQuestions": 35,
                "categoryDone": 2,
                "categoryPercentage": 5.71
            },
            "Recursions": {
                "categoryQuestions": 24,
                "categoryDone": 1,
                "categoryPercentage": 4.17
            },
            "Stacks": {
                "categoryQuestions": 12,
                "categoryDone": 0,
                "categoryPercentage": 0
            },
            "Queues": {
                "categoryQuestions": 13,
                "categoryDone": 0,
                "categoryPercentage": 0
            },
            "Greedy Algorithms": {
                "categoryQuestions": 14,
                "categoryDone": 0,
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