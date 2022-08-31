import React from "react";
import "../css/Forecast.css";
import { TbTemperatureCelsius } from "react-icons/tb";

export default function Forecast({ forecastInfo }) {
  if (forecastInfo.length === 0 && forecastInfo.forecastday !== undefined) {
    return <div>Loading..</div>;
  }
  return (
    <table>
      <tbody>
        {forecastInfo.forecastday.map((info) => {
          return (
            <tr key={info.date}>
              <td>{info.date}</td>
              <td>
                <img src={info.day.condition.icon}></img>
              </td>
              <td>
                {info.day.mintemp_c} / {info.day.maxtemp_c}{" "}
                <TbTemperatureCelsius></TbTemperatureCelsius>
              </td>
              <td className="text">{info.day.condition.text}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
