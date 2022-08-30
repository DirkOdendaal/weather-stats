import React, { useEffect, useState } from "react";
import "../css/CurrentWeather.css";

export default function Weather({ locationName, weatherInfo }) {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleString());
    }, 1000);
  }, []);
  // const description = weatherInfo.condition.text;
  return (
    <div>
      <ul className="weather-container">
        <li className="date" id="date">
          {clockState}
        </li>
        <li className="location" id="location">
          {locationName}
        </li>
        <li className="degree" id="degree">
          {weatherInfo.temp_c} °C
        </li>
      </ul>
      <ul className="weather-container">
        <li id="day-description">Feels Like {weatherInfo.feelslike_c} °C</li>
      </ul>
      <div className="detail-div">
        <ul className="weather-container-li">
          <li id="wind">
            Wind: {weatherInfo.wind_kph} Km/h {weatherInfo.wind_dir}
          </li>
          <li id="pressure">Presure: {weatherInfo.pressure_mb}hPa</li>
        </ul>
        <ul className="weather-container-li">
          <li id="humidity">Humidity: {weatherInfo.humidity}% </li>
          <li id="uv">{weatherInfo.uv} UV</li>
        </ul>
        {/* <ul className="weather-container-li">
          <li id="dew-point">Dew Point</li>
          <li id="visibility">Visibility</li>
        </ul> */}
      </div>
    </div>
  );
}
