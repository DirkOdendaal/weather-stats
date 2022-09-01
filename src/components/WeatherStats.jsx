import React, { useState, useEffect } from "react";
import "../css/WeatherStats.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Keep import for Chart.js and Temp. Chart

export default function WeatherStats({ weatherStats, selectedDay }) {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (weatherStats) {
      setData({
        labels: weatherStats[0]?.hour.map((time) => {
          var newTime = new Date(time.time);
          newTime = newTime.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return newTime;
        }),
        datasets: [
          {
            label: "Hourly Temperature",
            data: weatherStats[0].hour.map((temp_c) => temp_c.temp_c),
            borderColor: "white",
            backgroundColor: "white",
            tension: 0.5,
            color: ["white"],
          },
        ],
      });
    }
  }, [weatherStats, selectedDay]);

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
