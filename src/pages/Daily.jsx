import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import WeatherCard from "../components/WeatherCard.jsx";
import { SettingsContext } from "../context/SettingsContext.jsx";
import { getUserErrorMessage } from '../utils/erroeMessage.js';
import {getHumidityDescription, getWindDescription} from '../components/HelperFunctions/WeatherHelperFunctions.js'


// Get day label (Today, Tomorrow, or weekday)
const getDayLabel = (dateString) => {
  const forecastDate = new Date(dateString);  // convert string to date object
  forecastDate.setHours(0, 0, 0, 0); // normalize to midnight mean hour, min, sec, milsec set 0

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = forecastDate - today;  // subtract two Date objects give result in milliseconds
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // convert milliseconds to days

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  return forecastDate.toLocaleDateString("en-US", { weekday: "long" });
};

// Format time to AM/PM
const formatHour = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

function Daily() {
  const { forecastWeather, loading, errors, selectedCity } = useContext(WeatherContext);
  const {settings} = useContext(SettingsContext);

   // If no forecast data available
   if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-white text-xl animate-pulse">Loading...</p>
        </div>
      );

      if (!forecastWeather) return (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-white text-xl">No data yet</p>
        </div>
      );
 

  const forecastDays = forecastWeather.forecast.forecastday;
  const now = new Date();
  const currentHour = now.getHours();

  const windSpeedKmh = forecastDays[0].day.maxwind_kph;
  const windSpeedMph = forecastDays[0].day.maxwind_mph;
  const windSpeedKnots = (forecastDays[0].day.maxwind_kph * 1.94384).toFixed(1);
   

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

  return (
    <div className="text-white p-6 mt-2 w-full overflow-hidden">
      {/* Errors */}
      {errors.cityNotFound && <p className="text-red-400 mb-4">{getUserErrorMessage(errors.cityNotFound)}</p>}
      {errors.current && <p className="text-red-400 mb-4">{getUserErrorMessage(errors.current)}</p>}
      {/* forecast Error (only if current weather worked) */}
      {!errors.current && !errors.cityNotFound && errors.forecast && <p className="text-red-400 mb-4">{getUserErrorMessage(errors.forecast)}</p>}
      

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mx-5 my-10">
        3-Day Forecast for{" "}
        <span className="text-indigo-400">{selectedCity}</span>
      </h1>

      {/* 3-Day Cards */}
      <div className="flex justify-center mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
        {forecastDays.map((day) => {
          const dayLabel = getDayLabel(day.date);
          const isToday = dayLabel === "Today";

          const filteredHours = isToday
            ? day.hour.filter((hour) => {
                const hourTime = new Date(hour.time);
                return hourTime.getHours() >= currentHour;
              })
            : day.hour;

          return (
            <div
              key={day.date}
              className="w-full max-w-sm flex flex-col p-6 rounded-3xl 
              bg-[#ffffff06] backdrop-blur-lg border border-white/10 shadow-[0_8px_25px_0_rgba(0,0,0,0.2)]
              hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-2">
                {dayLabel}
              </h2>

              <div className="flex justify-between w-full">
                <p className="text-3xl font-bold mt-3">
                  {settings.tempUnit==="C"? Math.round(day.day.maxtemp_c):Math.round(day.day.maxtemp_f)}° /{" "}
                  {settings.tempUnit==="C"? Math.round(day.day.mintemp_c):Math.round(day.day.mintemp_f)}°
                </p>

                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="w-16 h-16"
                />
              </div>

              <p className="text-slate-400 mt-2 capitalize">
                {day.day.condition.text}
              </p>
             
              {/* Hourly Section */}
              
              <div className="h-px w-full mt-6 mb-4 gradient-center" />
              <div className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 text-sm pb-2">
                
                {filteredHours.map((hour) => {
                  const hourTime = new Date(hour.time);

                  const isNow =
                    isToday &&
                    hourTime.getHours() === currentHour;

                  return (
                    <div
                      key={hour.time}
                      className="flex flex-col items-center bg-white/5 p-2 mt-2 ml-2 rounded-xl min-w-[87px]
                      border border-white/20 hover:shadow-[0_0_8px_rgba(99,102,241,0.25)] hover:scale-[1.01] transition-all duration-300
                      "
                    >
                      <p>
                        {isNow
                          ? "Now"
                          : formatHour(hour.time)}
                      </p>

                      <img
                        src={`https:${hour.condition.icon}`}
                        alt=""
                        className="w-8 h-8"
                      />

                      <p>{settings.tempUnit==="C"? Math.round(hour.temp_c):Math.round(hour.temp_f)}°</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Highlights */}
      <div className="mt-30 md:ml-10">
        <div className="flex items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5">
            Today's <span className="text-indigo-400">Highlights</span>
          </h2>
          <div className="ml-5 -mt-5 h-px flex-1 bg-linear-to-r from-indigo-500/50 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 pb-24 max-w-[1080px]">
          <WeatherCard
            title="High / Low"
            value={`${settings.tempUnit==="C"? Math.round(forecastDays[0].day.maxtemp_c):Math.round(forecastDays[0].day.maxtemp_f)}°`}
            valueExtra={`${settings.tempUnit==="C"? Math.round(forecastDays[0].day.mintemp_c):Math.round(forecastDays[0].day.mintemp_f)}°`}
            description={
              forecastDays[0].day.condition.text
            }
            iconUrl={
              `https:${forecastDays[0].day.condition.icon}`
            }
          />

          <WeatherCard
            title="Humidity"
            value={forecastDays[0].day.avghumidity}
            unit="%"
            description={getHumidityDescription(
              forecastDays[0].day.avghumidity
            )}
            icon={
              <i className="fa-solid fa-droplet text-blue-300"></i>
            }
          />

          <WeatherCard
            title="Wind"
            value={windSpeedUnit()}
            unit={windUnitLabel(settings.windUnit)}
            description={getWindDescription(
              forecastDays[0].day.maxwind_kph
            )}
            icon={<i className="fa-solid fa-wind"></i>}
          />
        </div>
      </div>
    </div>
  );
}

export default Daily;  