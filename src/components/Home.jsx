import { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import "../css/Home.css";
import Forecast from "./Forecast";
import WeatherStats from "./LocationStats";
import Search from "./Search";
import logo from "../resources/weather-icon.png";
import $ from "jquery";

export default function Home() {
  const [locationName, setLocationName] = useState(null);
  const [newcoords, setLatLng] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    getCurrentLocation({ setLatLng, setLocationName });
    getWeatherInfo({ locationName, setWeatherInfo });
  }, []);

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
              setWeatherInfo={setWeatherInfo}
              locationName={locationName}
            ></Search>
          </ul>
        </nav>
        {/* <a className="cta" href="#"><button>Search</button></a> */}
      </header>

      <div className="middle-container">
        <CurrentWeather
          locationName={locationName}
          weatherInfo={weatherInfo}
        ></CurrentWeather>
        <Map newcoords={newcoords}></Map>
      </div>
      <div className="middle-container">
        <Forecast></Forecast>
        <WeatherStats></WeatherStats>
      </div>
    </>
  );
}

function getCurrentLocation({ setLatLng, setLocationName }) {
  navigator?.geolocation.getCurrentPosition(
    ({ coords: { latitude: lat, longitude: lng } }) => {
      const pos = { lat, lng };
      setLatLng(pos);
      getLocationName({ pos, setLocationName });
    }
  );
}

function getLocationName({ pos, setLocationName }) {
  const geocoder = new window.google.maps.Geocoder();
  if (geocoder != null)
    geocoder
      .geocode({ location: pos })
      .then((response) => {
        if (response.results[0]) {
          setLocationName(response.results[0].formatted_address);
        } else {
          window.alert("no result");
        }
      })
      .catch((e) => console.log("Geocoder failed due to: " + e));
}

function getWeatherInfo({ locationName, setWeatherInfo }) {
  if (locationName !== null || locationName !== undefined) {
    $.ajax({
      url: `https://api.weatherapi.com/v1/current.json?key=d6059cb8972940258c182934222908&q=${locationName}&aqi=no`,
      type: "GET",
      success: function (result) {
        setWeatherInfo(result.current);
        console.log(result.current);
      },
    });
  }
}
