import { MdOutlineLightMode, MdLightMode } from "react-icons/md";
import './App.css';
import { useEffect, useState } from 'react';
import Search from "./Search";
import TimeAndLocation from "./TimeAndLocation";
import TemperatureDetails from "./TemperatureDetails";
import Forecast from "./Forecast";
import getFormattedWeatherData from "./WeatherData";

function App() {

  const [query, setQuery] = useState({ q: "hyderabad" })
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)

  {/*imported the fetched data from getFormattedWeatherData component*/ }

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then(data => {
      setWeather(data)
    })

  }

  useEffect(() => {
    getWeather()
  }, [query, units])

  const [light, setLight] = useState(true)
  const onClickLightMode = () => {
    if (light) {
      setLight(false)
    } else {
      setLight(true)
    }

  }


  const darkClass = "bg-gray-900 "
  const lightClass = " from-sky-300 to-blue-800 "
  const background = light ? lightClass : darkClass

  return (
    <div className={`${background} bg-gradient-to-br max-w-screen-full p-5 md:py-5 px:12 md:px-32 shadow-xl shadow-gray-400 pt-12 `}>
      <div className="flex flex-row justify-between">
        {/* component search bar for searching temperature by city */}
        <Search setQuery={setQuery} setUnits={setUnits} />

        {/* Button for light and dark mode */}
        <button onClick={onClickLightMode} className="mt-1 ml-4 mb-1 cursor-pointer transition ease-out hover:scale-125 text-white">
          {light ? <MdOutlineLightMode size={30} /> : <MdLightMode size={30} />}
        </button>
      </div>
      {weather &&
        <>
          {/* Component for time and location of searched city */}
          <TimeAndLocation weather={weather} />

          {/* Component for temperature of the city including sunset, sunrise, max and min temp */}
          <TemperatureDetails weather={weather} units={units} />

          {/* The component for details about the temp including hourly and daily forecast  */}
          <Forecast title='3 hour step forecast' data={weather.hourly} />
          <Forecast title='daily forecast' data={weather.daily} />
        </>
      }

    </div>
  );
}

export default App;
