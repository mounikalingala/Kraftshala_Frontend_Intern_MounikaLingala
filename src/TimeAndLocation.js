import React from 'react'

const TimeAndLocation = ({ weather: { formattedLocalTime, name, country } }) => {
    {/* get props prom the parent component App.js */ }
    return (
        <div className='text-white'>
            <div className='flex items-center justify-center my-6'>
                <p className=' lg:text-md text-xl font-extralight m'>
                    {formattedLocalTime}
                </p>
            </div>
            <div>
                <p className='flex items-center justify-center text-3xl font-medium mt-12'>
                    {`${name}, ${country}`}
                </p>
            </div>
        </div>
    )
}

export default TimeAndLocation