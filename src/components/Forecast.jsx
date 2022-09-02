import React from "react";
import "../css/Forecast.css";
import { TbTemperatureCelsius } from "react-icons/tb";
const dateOptions = { weekday: "short", day: "numeric", month: "short" };

export default function Forecast({ forecastInfo, setSelectedDay }) {
  return (
    <table>
      <tbody id="style-1">
        {forecastInfo?.forecastday?.map((info, index) => {
          var date = new Date(info.date);
          date = date.toLocaleString("en-US", dateOptions);
          return (
            <tr key={index} onClick={() => setSelectedDay(index)}>
              <td>{date}</td>
              <td>
                <img src={info.day.condition.icon}></img>
              </td>
              <td>
                <TbTemperatureCelsius></TbTemperatureCelsius>{" "}
                {info.day.mintemp_c} / {info.day.maxtemp_c}
              </td>
              <td className="text">{info.day.condition.text}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
