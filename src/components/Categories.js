import React from 'react'
import Category from './Category'


function Categories({data}) {
    
    return (
        <div className='bg-gray-400'>
            <div className="container mx-auto px-4 pt-7 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {data
                        .map((element) => (
                            <div key={element._id}>
                                <Category
                                    category={element}
                                />
                            </div>
                        ))}
                </div>
            </div>

        </div>
    )
}

export default Categories