import React, { useContext, useEffect } from 'react';
import Category from './Category';
import QuestionsContext from '../context/questions/QuestionsContext';
import HorizontalProgressBar from './HorizontalProgressBar';
import { useNavigate } from 'react-router-dom';

function Categories() {
    
    const navigate=useNavigate();
    const context = useContext(QuestionsContext);
    const { getAllData,userResponses,data} = context;
    const totalValues = userResponses && userResponses['Total_values'];
    const { Total_Questions, Questions_done, Total_percentage } = totalValues || {};
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllData();
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-4 pt-7 pb-4 w-full">
            <div className='pb-6'>
                <HorizontalProgressBar percentage={Total_percentage} done={Questions_done} total={Total_Questions} />
            </div>
            <div className='w-full'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center sm:justify-items-stretch">
                {data.map((element) => (
                    <div key={element._id}>
                        <Category  category={element} />
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Categories;
