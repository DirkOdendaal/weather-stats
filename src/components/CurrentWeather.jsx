import React from "react";
import "../css/CurrentWeather.css";

export default class Weather extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul className="weather-container">
          <li className="date" id="date">
            Aug 24, 08:00
          </li>
          <li className="location" id="location">
            Vereeniging
          </li>
          <li className="degree" id="degree">
            31°C
          </li>
        </ul>
        <ul className="weather-container">
          <li id="day-description">Feels like 17. Clear Sky. Light Air.</li>
        </ul>
        <div className="detail-div">
          <ul className="weather-container-li">
            <li id="wind">Wind</li>
            <li id="pressure">Presure</li>
          </ul>
          <ul className="weather-container-li">
            <li id="humidity">Humidity</li>
            <li id="uv">UV</li>
          </ul>
          <ul className="weather-container-li">
            <li id="dew-point">Dew Point</li>
            <li id="visibility">Visibility</li>
          </ul>
        </div>
      </div>
    );
  }
}
