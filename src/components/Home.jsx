import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import "../css/Home.css";
import Forecast from "./Forecast";
import WeatherStats from "./WeatherStats";
import Search from "./Search";
import logo from "../resources/weather-icon.png";
import { getForecastInfo } from "../js/Weather";

const libraries = ["places"];

export default function Home() {
  const [locationName, setLocationName] = useState(null);
  const [newcoords, setLatLng] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});
  const [forecastInfo, setForecastInfo] = useState({});
  const isLoaded = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  useEffect(() => {
    getCurrentLocation({ setLatLng, setLocationName });
  }, []);

  useEffect(() => {
    getForecastInfo({ locationName, setForecastInfo, setWeatherInfo });
  }, [locationName]);

  if (!isLoaded.isLoaded) return <div>Loading..</div>;

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
        <WeatherStats forecastInfo={forecastInfo}></WeatherStats>
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
  let geocoder = new window.google.maps.Geocoder();
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
