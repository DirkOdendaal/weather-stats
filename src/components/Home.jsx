import React from "react";
import NavBar from "./NavBar";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import "../css/Home.css";
import Forecast from "./Forecast";
import WeatherStats from "./LocationStats";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="middle-container">
          <CurrentWeather></CurrentWeather>
          <Map></Map>
        </div>
        <div className="middle-container">
          <Forecast></Forecast>
          <WeatherStats></WeatherStats>
        </div>
      </div>
    );
  }
}
