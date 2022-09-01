import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect, useRef } from "react";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import "../css/Home.css";
import Forecast from "./Forecast";
import WeatherStats from "./WeatherStats";
import Search from "./Search";
import logo from "../resources/weather-icon.png";
import { getForecastInfo } from "../js/Weather";
import Geocoder from "react-geocode";

const libraries = ["places"];

export default function Home() {
  const [locationName, setLocationName] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [newcoords, setLatLng] = useState();
  const [weatherInfo, setWeatherInfo] = useState({});
  const [forecastInfo, setForecastInfo] = useState();
  const [weatherStats, setWeatherStats] = useState();
  const isLoaded = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  useEffect(() => {
    setSelectedDay(0);
    getCurrentLocation({ setLatLng, setLocationName });
  }, []);

  useEffect(() => {
    if (locationName) {
      getForecastInfo({ locationName, setForecastInfo, setWeatherInfo });
    }
  }, [locationName]);

  useEffect(() => {
    if (forecastInfo) {
      setWeatherStats(forecastInfo.forecastday);
    }
  }, [forecastInfo]);

  if (!isLoaded.isLoaded) return <div>Loading..</div>;

  return (
    <>
      <header>
        <img className="logo" src={logo} alt=""></img>
        <nav>
          <ul className="nav_links">
            <li>
              <a href="#">Item </a>
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
              setForecastInfo={setForecastInfo}
              locationName={locationName}
              isLoaded={isLoaded}
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
        <Map
          newcoords={newcoords}
          isLoaded={isLoaded}
          GoogleMap={GoogleMap}
          Marker={Marker}
        ></Map>
      </div>
      <div className="middle-container">
        <Forecast forecastInfo={forecastInfo}></Forecast>
        <WeatherStats
          weatherStats={weatherStats}
          selectedDay={selectedDay}
        ></WeatherStats>
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
    },
    (error) => {
      window.alert(`Failed Geolocation : ${error}`);
    },
    { enableHighAccuracy: true }
  );
}

function getLocationName({ pos, setLocationName }) {
  if (pos !== null)
    Geocoder.fromLatLng(
      pos.lat,
      pos.lng,
      process.env.REACT_APP_GOOGLE_KEY
    ).then(
      (response) => {
        setLocationName(response.results[0].formatted_address);
      },
      (error) => {
        window.alert(error);
      }
    );
}
