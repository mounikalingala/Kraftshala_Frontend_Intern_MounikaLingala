import { IoSearch } from "react-icons/io5";
import { BiCurrentLocation } from "react-icons/bi";

import React, { useState } from 'react'

const Search = ({ setQuery, setUnits }) => {
    const [city, setCity] = useState("")

    {/* onclick event for handle search of the city*/ }
    const handleSearch = () => {
        if (city !== "") setQuery({ q: city })
        setCity("")
    }

    {/*onclick event for handle the current location */ }
    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setQuery({ lat: latitude, lon: longitude })
            })
        }
    }
    return (
        <div className='flex row'>
            <input type='text' value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                placeholder='search by city...' className='p-2 rounded-lg h-8 w-full text-gray-600 font-light focus:outline-none shadow-xl capitalize placeholder:lowercase  ' />
            {/* icons for search and current location */}
            <IoSearch size={35} onClick={handleSearch} className=" ml-4 mb-1 cursor-pointer transition ease-out hover:scale-125 text-white" />
            <BiCurrentLocation size={35} onClick={handleCurrentLocation} className=" ml-4 mb-1 cursor-pointer transition ease-out hover:scale-125 text-white" />
            <div className="flex flex-row ml-12">
                <button onClick={() => setUnits('metric')} className="mt-1 ml-4 mb-1 cursor-pointer transition ease-out hover:scale-125 text-white text-xl">°C</button>
                <p className="mt-1 ml-1 mb-1 text-xl text-white ">|</p>
                <button onClick={() => setUnits('imperial')} className="mt-1 ml-1 mb-1 cursor-pointer transition ease-out hover:scale-125 text-white text-xl">°F</button>
            </div>
        </div>
    )
}

export default Search