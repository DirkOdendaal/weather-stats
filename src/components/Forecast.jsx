import React from "react";
import "../css/Forecast.css";

export default function Forecast({ forecastInfo }) {
  if (forecastInfo.length === 0 && forecastInfo.forecastday !== undefined) {
    return <div>Loading..</div>;
  }

  console.log(forecastInfo.forecastday);
  return (
    <div className="forecast-container">
      <ul className="record-list">
        <li>
          <div className="inline-records">
            <div>Date</div>
            <div>Max</div>
            <div>Min</div>
          </div>
        </li>
      </ul>
      <ul className="record-list">
        {forecastInfo.forecastday.map((info) => {
          return (
            <li key={info.date}>
              <div className="inline-records">
                <div>{info.date} °C</div>
                <div>{info.day.maxtemp_c} °C</div>
                <div>{info.day.mintemp_c} °C</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
