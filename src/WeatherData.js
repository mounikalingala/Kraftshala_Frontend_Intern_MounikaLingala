import { DateTime } from "luxon";

{/*key and the url are taken from the external recourse  open weather map */ }
const API_KEY = '018aa1b3fced9c2c3b9edb2eef7bdfc5'
const BASE_URL = "https://api.openweathermap.org/data/2.5/"

{/* getting the data by fetching the data from open weather */ }
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url)
        .then((res) => res.json())

}

{/* getting icons according to the temperature */ }
const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format)

{/* getting all the details from the data  */ }
const formatCurrent = (data) => {

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name, dt, sys: { country, sunrise, sunset }, weather,
        wind: { speed },
        timezone,
    } = data

    const { main: details, icon } = weather[0]
    const formattedLocalTime = formatToLocalTime(dt, timezone)
    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'), speed, details,
        icon: iconUrlFromCode(icon),
        formattedLocalTime, dt, timezone, lat, lon
    }
}

{/* the raw data splitting by filtering as formatForecast data */ }

const formatForecastWeather = (sec, offset, data) => {
    //hourly
    const hourly = data.filter((f) => f.dt > sec)
        .map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "hh:mm a"),
            icon: iconUrlFromCode(f.weather[0].icon),
            data: f.dt_txt,
        }))
        .slice(0, 5)
    //daily
    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map((f) => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "ccc"),
        icon: iconUrlFromCode(f.weather[0].icon),
        data: f.dt_txt,
    }))

    return { hourly, daily }
}

{/* search input as a parameter getting the from api  */ }

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent)

    const { dt, lat, lon, timezone } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData("forecast", { lat, lon, units: searchParams.units }).then((d) => formatForecastWeather(dt, timezone, d.list))

    return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

export default getFormattedWeatherData