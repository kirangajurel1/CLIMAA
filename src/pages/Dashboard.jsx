import React, { useContext, useEffect } from "react";
import WeatherContext from "../context/WeatherContext";
import { getUserErrorMessage } from '../utils/erroeMessage.js';
import WeatherCard from '../components/WeatherCard.jsx';
import { SettingsContext } from "../context/SettingsContext.jsx";
import {getHumidityDescription, getWindDescription} from '../components/HelperFunctions/WeatherHelperFunctions.js'

function Dashboard() {
  const { currentWeather, loading, errors } = useContext(WeatherContext);
  const {settings} = useContext(SettingsContext);

      if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-white text-xl animate-pulse">Loading...</p>
        </div>
      );

      if (!currentWeather) return (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-white text-xl">No data yet</p>
        </div>
      );

  const { name, sys, main, weather, wind } = currentWeather;

  const windSpeedKmh = (wind.speed * 3.6).toFixed(1);
  const windSpeedMph = (wind.speed * 2.23694).toFixed(1);
  const windSpeedKnots = (wind.speed * 1.94384).toFixed(1);
   

  const windUnitLabel = (value) => {
    switch(value) {
      case "mph": return "mph";
      case "kmh": return "km/h";
      case "knots": return "knots";
      default: return value;
    }
  };

  function windSpeedUnit(){
      if(settings.windUnit === "mph")
        return windSpeedMph
      if(settings.windUnit === "kmh")
        return windSpeedKmh
      if(settings.windUnit === "knots")
        return windSpeedKnots
  }

  // OpenWeather icon URL
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="text-white p-4 w-full overflow-hidden">
      {errors.cityNotFound && <p className="text-red-400 mb-4">{getUserErrorMessage(errors.cityNotFound)}</p>}
      {errors.current && <p className="text-red-400 mb-4">{getUserErrorMessage(errors.current)}</p>}
      
      {/* Main Info */}
      <div className="text-center space-y-1 md:-ml-15">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] text-[#E2E8F0] font-bold mt-15 mr-5">
          {name}, {sys.country}
        </h1>

        <img
          src={weatherIconUrl}
          alt={weather[0].description}
          className="mx-auto w-15 h-15 md:w-24 md:h-24"
        />

        <p className="text-xl md:text-2xl capitalize text-gray-500 -mt-5">{weather[0].description}</p>
        <h2 className="text-6xl md:text-[120px] lg:text-[150px] font-extrabold mt-10">{settings.tempUnit === "C"? `${Math.round(main.temp)}°`:`${Math.round((main.temp * 9/5 + 32))}°`}</h2>
        <p className="text-md md:text-lg font-bold text-[rgba(165,180,252,0.8)]">
          Feels like <span className="text-gray-300">{settings.tempUnit === "C"? `${Math.round(main.feels_like)}°`:`${Math.round((main.feels_like * 9/5 + 32))}°`}</span>
        </p>
      </div>

      {/* Highlights */}
      <div className="mt-30 md:ml-10">
        <div className=" flex items-center">
           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5">Current <span className="text-indigo-400">Highlights</span></h2>
           <div className=" ml-5 -mt-5 h-px flex-1 bg-linear-to-r from-indigo-500/50 to-transparent"></div>
        </div>
       
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 pb-24 max-w-[1080px]">
          <WeatherCard
            title="High / Low"
            value={settings.tempUnit === "C"? `${Math.round(main.temp_max)}°`:`${Math.round((main.temp_max * 9/5 + 32))}°`}
            valueExtra={settings.tempUnit === "C"? `${Math.round(main.temp_min)}°`:`${Math.round((main.temp_min * 9/5 + 32))}°`}
            description={weather[0].description}
            iconUrl={weatherIconUrl}
          />

          <WeatherCard
            title="Humidity"
            value={main.humidity}
            unit="%"
            description={getHumidityDescription(main.humidity)}
            icon={<i className="fa-solid fa-droplet text-blue-300"></i>}
          />

          <WeatherCard
            title="Wind"
            value={windSpeedUnit()}
            unit={windUnitLabel(settings.windUnit)}
            description={getWindDescription(windSpeedKmh)}
            icon={ <i className="fa-solid fa-wind"></i>}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
