import React, { useContext } from 'react';
import Category from './Category';
import QuestionsContext from '../context/questions/QuestionsContext';
import HorizontalProgressBar from './HorizontalProgressBar';

function Categories({ data }) {
    const context = useContext(QuestionsContext);
    const { Responses } = context;
    const { Total_Questions, Questions_done, Total_percentage } = Responses['Total_values'];
    console.log(Responses.Total_values);
    return (
        <div className='bg-gray-400'>
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