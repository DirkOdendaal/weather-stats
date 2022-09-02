import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import "../css/Home.css";
import Forecast from "./Forecast";
import WeatherStats from "./WeatherStats";
import Search from "./Search";
import logo from "../resources/weather-icon.png";
import { getForecastInfo } from "../js/Weather";
import Geocoder from "react-geocode";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

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
      <BrowserRouter>
        <header>
          <img className="logo" src={logo} alt=""></img>
          <nav>
            <ul className="nav_links">
              <li>
                <Link to="weather-stats/">Dashboard</Link>
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
        <Routes>
          <Route
            path="weather-stats/"
            element={
              <>
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
                  <Forecast
                    forecastInfo={forecastInfo}
                    setSelectedDay={setSelectedDay}
                  ></Forecast>
                  <WeatherStats
                    weatherStats={weatherStats}
                    selectedDay={selectedDay}
                  ></WeatherStats>
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function getCurrentLocation({ setLatLng, setLocationName }) {
  if (navigator?.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
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
        } else if (result.state === "denied") {
          getGeoInfo({ setLatLng, setLocationName });
          window.alert(
            "Location Tracking Disabled. Please enable browser location permissions for best experience."
          );
        }
      });
  }
}

function getGeoInfo({ setLatLng, setLocationName }) {
  axios
    .get("https://ipapi.co/json/")
    .then((response) => {
      let data = response.data;
      console.log(data);
      const pos = { lat: data.latitude, lng: data.longitude };
      setLocationName(data.city);
      setLatLng(pos);
    })
    .catch((error) => {
      console.log(error);
    });
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
