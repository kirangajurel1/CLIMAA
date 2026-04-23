import conf from "../envImport/conf.js";

const WEATHER_API_KEY = conf.weatherApiKey;
const  OPEN_WEATHER_MAP_API_KEY= conf.openWeatherMapApiKey;

const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
const OPEN_WEATHER_MAP_BASE_URL = "https://api.openweathermap.org/data/2.5";


/* Current Weather by latitude and longitude */

export const getCurrentWeatherByCoords = async (lat, lon) => {
  const res = await fetch(`${OPEN_WEATHER_MAP_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`);

  if (!res.ok) {
    throw new Error("LOCATION_WEATHER_FAILED");
  }

  return res.json();
};


/* Current Weather by City  */
export const getCurrentWeather = async (city) => {
  const res = await fetch(`${OPEN_WEATHER_MAP_BASE_URL}/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`);

  if (!res.ok) {
    throw new Error(
      res.status === 400 || res.status === 404
        ? "CITY_NOT_FOUND"
        : "CURRENT_WEATHER_FAILED"
    );
  }
  return res.json();
};


/* 3-Day Forecast (Daily + Hourly) */
export const getForecastWeather = async (lat,lon) => {
  const res = await fetch(`${WEATHER_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=3`);

  if (!res.ok) {
    throw new Error("FORECAST_FAILED");
  }

  return res.json();
};


//Current Air Quality (AQI)
export const getCurrentAirQuality = async (lat, lon) => {
  const res = await fetch(`${OPEN_WEATHER_MAP_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_MAP_API_KEY}`);

  if (!res.ok) {
    throw new Error("AIR_QUALITY_FAILED");
  }

  return res.json();
};


//Air Quality Forecast
export const getAirQualityForecast = async (lat, lon) => {
  const res = await fetch(`${OPEN_WEATHER_MAP_BASE_URL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_MAP_API_KEY}`);

  if (!res.ok) {
    throw new Error("AIR_QUALITY_FORECAST_FAILED");
  }

  return res.json();
};


