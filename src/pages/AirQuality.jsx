import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import WeatherCard from "../components/WeatherCard";
import { getUserErrorMessage } from '../utils/erroeMessage.js';
import { calculateUSAQI, getUSAQICategory } from "../components/HelperFunctions/AQIHelperFunctions.js";

function AirQuality() {
  const { airQuality, loading, errors, selectedCity } = useContext(WeatherContext);
  const [animatedDeg, setAnimatedDeg] = React.useState(0);

  React.useEffect(() => {
    if (!airQuality) return;

    setAnimatedDeg(0);
    const timeout = setTimeout(() => {
      const deg =
        (calculateUSAQI(airQuality.list[0].components.pm2_5) / 300) * 360;
      setAnimatedDeg(deg);
    }, 100);

    return () => clearTimeout(timeout);
  }, [airQuality]);

 if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-white text-xl animate-pulse">Loading...</p>
        </div>
      );

      if (!airQuality) return (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-white text-xl">No data yet</p>
        </div>
      );

  const data = airQuality.list[0];
  const components = data.components;

  // Calculate US AQI from PM2.5
  const pm25 = components.pm2_5;
  const usAQI = calculateUSAQI(pm25);
  const category = getUSAQICategory(usAQI);
  const deg = (usAQI / 300) * 360;

  return (
    <div className="text-white p-6 mt-4 w-full overflow-hidden">
      {/*Error */}
      {errors.cityNotFound && <p className="text-red-400 mb-4">{getUserErrorMessage(errors.cityNotFound)}</p>}
      {errors.current && <p className="text-red-400 mb-4">{getUserErrorMessage(errors.current)}</p>}
      {/* Air Quality Error (only if current weather worked) */}
      {!errors.current && !errors.cityNotFound && errors.airQuality && <p className="text-red-400">{errors.airQuality}</p>}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mx-5 my-10">
        Air Quality in{" "}
        <span className="text-indigo-400">{selectedCity}</span>
      </h1>

      <div className="flex flex-col items-center justify-center mt-20">
        <div className="relative flex items-center justify-center w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] sm:w-[420px] sm:h-[420px]">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-cyan-400/10 blur-[120px] rounded-full"></div>

          {/* Gradient Ring */}
          <div className="absolute inset-0 aqi-gauge-cyan rounded-full rotate-[30deg]">
            <div
              className="
                absolute inset-0
                z-30
                rounded-full
                bg-[conic-gradient(from_180deg_at_50%_50%,_black_0deg,black_1deg,transparent_1deg)]
                [mask:radial-gradient(transparent_65%,_black_66%)]
                [-webkit-mask:radial-gradient(transparent_65%,_black_66%)]
              "
              style={{
                transform: `rotate(${animatedDeg}deg)`,
                transition: "transform 4s ease-out",
              }}
            ></div>
          </div>

          {/* Center Card */}
          <div
            className="relative z-10 w-[80%] h-[80%] rounded-full glass-card 
                       flex flex-col items-center justify-center border-white/10 shadow-inner"
          >
            <span
              className={`${category.color} font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 flex flex-row items-center gap-5`}
            >
              <p>{category.label}</p>
            </span>

            <h1 className="text-white text-[70px] sm:text-[110px] md:text-130px font-black leading-none drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              {usAQI}
            </h1>
          </div>
        </div>

        {/* AQI Legend */}
        <div
          className="mt-12 flex gap-4 sm:gap-6 md:gap-8 items-center px-5 py-3 md:px-8 md:py-4 rounded-4xl 
                     bg-slate-900/60 backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 glow-cyan"></div>
            <span
              className={`text-[10px] sm:text-xs font-bold ${
                category.label === "Good"
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              0-50 Good
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
            <span
              className={`text-[10px] sm:text-xs font-bold ${
                category.label === "Moderate"
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              51-100 Mod
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
            <span
              className={`text-[10px] sm:text-xs font-bold ${
                [
                  "Unhealthy (Sensitive)",
                  "Unhealthy",
                  "Very Unhealthy",
                  "Hazardous",
                ].includes(category.label)
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              101+ Poor
            </span>
          </div>
        </div>
      </div>

      {/* Pollutants */}
      <div className="mt-10">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">
            Main <span className="text-[#22D3EE]">Pollutants</span>
          </h2>
          <div className="ml-5 h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-4 pb-24 w-full max-w-[1080px] mx-auto">
          <WeatherCard
            title="PM 2.5"
            value={components.pm2_5.toFixed(1)}
            unit="µg/m³"
            description="Fine particles"
          />

          <WeatherCard
            title="PM 10"
            value={components.pm10.toFixed(1)}
            unit="µg/m³"
            description="Dust particles"
          />

          <WeatherCard
            title="O₃ (Ozone)"
            value={components.o3.toFixed(1)}
            unit="µg/m³"
            description="Ground-level ozone"
          />

          <WeatherCard
            title="NO₂"
            value={components.no2.toFixed(1)}
            unit="µg/m³"
            description="Nitrogen dioxide"
          />

          <WeatherCard
            title="CO"
            value={components.co.toFixed(1)}
            unit="µg/m³"
            description="Carbon monoxide"
          />

          <WeatherCard
            title="SO₂"
            value={components.so2.toFixed(1)}
            unit="µg/m³"
            description="Sulfur dioxide"
          />
        </div>
      </div>
    </div>
  );
}

export default AirQuality;