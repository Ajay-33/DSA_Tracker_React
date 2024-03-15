import React, { useContext, useEffect } from 'react';
import Category from './Category';
import QuestionsContext from '../context/questions/QuestionsContext';
import HorizontalProgressBar from './HorizontalProgressBar';
import { useNavigate } from 'react-router-dom';

function Categories() {
    const navigate=useNavigate();
    const context = useContext(QuestionsContext);
    const { getUserResponses,userResponses,getAllData,data} = context;
    const totalValues = userResponses && userResponses['Total_values'];
    const { Total_Questions, Questions_done, Total_percentage } = totalValues || {};
    // console.log(Responses.Total_values);
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllData();
            getUserResponses();
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="container mx-auto px-4 pt-7 pb-4">
                <div className='pb-6'>
                    <HorizontalProgressBar percentage={Total_percentage} done={Questions_done} total={Total_Questions} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((element) => (
                        <div key={element._id}>
                            <Category category={element} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;