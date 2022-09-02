import $ from "jquery";

export function getForecastInfo({
  locationName,
  setForecastInfo,
  setWeatherInfo,
}) {
  $.ajax({
    url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${locationName}&days=10&aqi=no&alerts=no`,
    type: "GET",
    success: function (result) {
      setWeatherInfo(result.current);
      setForecastInfo(result.forecast);
    },
  });
}
