import $ from "jquery";

export function getForecastInfo({
  locationName,
  setForecastInfo,
  setWeatherInfo,
}) {
  if (locationName !== null || locationName !== undefined) {
    $.ajax({
      url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${locationName}&days=8&aqi=no&alerts=no`,
      type: "GET",
      success: function (result) {
        setWeatherInfo(result.current);
        setForecastInfo(result.forecast);
      },
    });
  }
}