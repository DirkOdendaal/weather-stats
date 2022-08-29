import { useState } from "react";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import "../css/Home.css";
import Forecast from "./Forecast";
import WeatherStats from "./LocationStats";
import Search from "./Search";
import logo from "../resources/weather-icon.png";

export default function Home() {
  const [locationName, setLocationName] = useState(null);
  const [coords, setLatLng] = useState({});

  return (
    <>
      <header>
        <img className="logo" src={logo}></img>
        <nav>
          <ul className="nav_links">
            <li>
              <a href="#">Item</a>
            </li>
            <li>
              <a href="#">Item</a>
            </li>
            <li>
              <a href="#">Item</a>
            </li>
            <Search
              setLocationName={setLocationName}
              setLatLng={setLatLng}
            ></Search>
          </ul>
        </nav>
        {/* <a className="cta" href="#"><button>Search</button></a> */}
      </header>

      <div className="middle-container">
        <CurrentWeather locationName={locationName}></CurrentWeather>
        <Map coords={coords}></Map>
      </div>
      <div className="middle-container">
        <Forecast></Forecast>
        <WeatherStats></WeatherStats>
      </div>
    </>
  );
}
