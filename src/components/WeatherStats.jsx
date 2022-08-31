import { useState, useEffect } from "react";
import "../css/WeatherStats.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Keep import for Chart.js and temp Chart
import { TbTemperatureCelsius } from "react-icons/tb";

export default function WeatherStats({ forecastInfo }) {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setData({
      labels: forecastInfo.forecastday[0].hour.map((time) => time.time),
      datasets: [
        {
          label: "Hourly Temperature",
          data: forecastInfo.forecastday[0].hour.map((temp_c) => temp_c.temp_c),
          borderColor: "white",
          backgroundColor: "white",
          tension: 0.5,
          color: ["white"],
        },
      ],
    });
  }, [forecastInfo]);

  return (
    <div className="stats-container">
      <Line
        data={data}
        options={{
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "white",
              },
              title: {
                color: "white",
                display: true,
                text: "Hour",
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                color: "white",
              },
              title: {
                color: "white",
                display: true,
                text: "Temp.",
              },
            },
          },
          color: "white",
        }}
      ></Line>
    </div>
  );
}
