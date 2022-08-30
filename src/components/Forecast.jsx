import React from "react";

export default function Forecast({ forecastInfo }) {
  // const info = JSON.parse(forecastInfo);
  // console.log(Object.keys(forecastInfo).map((key) => forecastInfo[key]));
  // console.log(forecastInfo.forecastday);
  if (forecastInfo.length === 0 && forecastInfo.forecastday !== undefined) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      {/* <ul>
        {forecastInfo.forecastday.map((day) => {
          console.log();
          console.log(day.day.mintemp_c);
        })}
      </ul> */}
    </div>
  );
}
