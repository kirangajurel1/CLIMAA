import { useEffect, useState } from "react";
import WeatherContext from "./WeatherContext";
import {
  getAirQualityForecast,
  getCurrentAirQuality,
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getForecastWeather,
} from "../services/WeatherApi";

function WeatherContextProvider({ children }) {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [airQualityForecast, setAirQualityForecast] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    current: null,
    cityNotFound: null,
    forecast: null,
    airQuality: null,
    forcastAir: null,
  });

  // getting user location on first load
  useEffect(() => {
    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                }, 
                () =>{
                    // If use denied to give location, fallback to default city
                    setCity("nuwakot");
                }, );

        } else {
            setCity("nuwakot");
        }
    },[]);

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);

      //reset errors on every new fetch
      setErrors({
        current: null,
        cityNotFound: null,
        forecast: null,
        airQuality: null,
        forcastAir: null,
      });

      let currentData;

      //CURRENT WEATHER
      try {
        if (lat !== null && lon !== null) {
          currentData = await getCurrentWeatherByCoords(lat, lon);
          setCity(currentData.name);
        } else if (city) {
          currentData = await getCurrentWeather(city);
        } else {
          return;
        }

        setCurrentWeather(currentData);
      } catch (err) {
        console.error("Current Weather Error:", err);

        if (err.message === "CITY_NOT_FOUND") {
          setErrors((prev) => ({
            ...prev,
            cityNotFound: err.message,
          }));
        } else if (err.message === "CURRENT_WEATHER_FAILED") {
          setErrors((prev) => ({
            ...prev,
            current: err.message,
          }));
        }
        setLoading(false);
        return;// stop if current weather fails
      }

      const apiLat = currentData.coord.lat;
      const apiLon = currentData.coord.lon;
      setSelectedCity(`${currentData.name},${currentData.sys.country}`);



      //FORECAST
      try {
        const forecast = await getForecastWeather(apiLat, apiLon);
        setForecastWeather(forecast);
      } catch (err) {
       console.error("Forcast Wether Error:", err);

        setErrors((prev) => ({
          ...prev,
          forecast: err.message,
        }));
      }

      //AIR QUALITY
      try {
        const air = await getCurrentAirQuality(apiLat, apiLon);
       
        setAirQuality(air);
      } catch (err) {
        console.error("Air Quality Error:", err);
        setErrors((prev) => ({
          ...prev,
          airQuality: err.message,
        }));
      }

      //FORCAST AIR QUALITY
      try {
        const airForecast = await getAirQualityForecast(apiLat, apiLon);

        setAirQualityForecast(airForecast);
      } catch (err) {
        console.error("Forcast Air Quality:", err)
        setErrors((prev) => ({
          ...prev,
          forcastAir: err.message,
        }));
      }

      setLoading(false);
    }

    if (city || (lat !== null && lon !== null)) {
      loadWeather();
    }
  }, [city, lat, lon]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        lat,
        lon,
        setLat,
        setLon,
        selectedCity,
        currentWeather,
        forecastWeather,
        airQuality,
        airQualityForecast,
        loading,
        errors,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContextProvider;

