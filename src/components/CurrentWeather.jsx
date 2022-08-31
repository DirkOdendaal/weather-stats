import React, { useEffect, useState } from "react";
import "../css/CurrentWeather.css";
import { FaArrowUp } from "react-icons/fa";
import { TbTemperatureCelsius, TbPercentage } from "react-icons/tb";
const dateOptions = { weekday: "short", day: "numeric", month: "short" };

export default function Weather({ locationName, weatherInfo }) {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    const date = new Date();
    setClockState(date.toLocaleString("en-US", dateOptions));
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
          {weatherInfo.temp_c} <TbTemperatureCelsius></TbTemperatureCelsius>
        </li>
      </ul>
      <ul className="weather-container">
        <li id="day-description">
          Feels Like {weatherInfo.feelslike_c}{" "}
          <TbTemperatureCelsius></TbTemperatureCelsius>
        </li>
      </ul>
      <div className="detail-div">
        <ul className="weather-container-li">
          <li id="wind" style={{ justifyContent: "space-between" }}>
            Wind: {weatherInfo.wind_kph} Km/h{" "}
            <FaArrowUp
              style={{
                transform: `rotate(${weatherInfo.wind_degree}deg)`,
                verticalAlign: "middle",
              }}
            ></FaArrowUp>
          </li>
          <li id="pressure">Presure: {weatherInfo.pressure_mb} hPa</li>
        </ul>
        <ul className="weather-container-li">
          <li id="humidity">
            Humidity: {weatherInfo.humidity}{" "}
            <TbPercentage style={{ verticalAlign: "middle" }}></TbPercentage>{" "}
          </li>
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
