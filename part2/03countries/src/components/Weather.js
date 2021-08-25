import React from 'react'

//If the API call is successful renders the weather data
const Weather = ({ place, weatherRes }) => {
    if (weatherRes.success) {
        return (
            <div>
                <h2>Weather in {place.name}</h2>
                <b>Temperature: </b> {weatherRes.current.temperature}<br />
                <img src={weatherRes.current.weather_icons} /><br />
                <b>Wind: </b> {weatherRes.current.weather_descriptions.wind_speed} direction {weatherRes.current.weather_descriptions.wind_dir}
            </div>
        )
    } else {
        return (null)
    }
}

export default Weather