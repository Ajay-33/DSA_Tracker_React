import { useState } from "react";
import QuestionsContext from "./QuestionsContext";

const QuestionsState=(props)=>{
    const categoryInitial = []
    const [category, setCategory] = useState(categoryInitial)

    const Category_data=async(data)=>{
        setCategory(data)
    }
    return (
        <QuestionsContext.Provider value={{ category,Category_data }}>
            {props.children}
        </QuestionsContext.Provider>
    )
}

export default QuestionsState;