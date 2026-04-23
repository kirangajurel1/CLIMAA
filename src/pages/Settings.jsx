import React, { useState, useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function Settings() {

  /* Context */
  const { settings, setSettings } = useContext(SettingsContext);

  /* Local State */
  const [dark, setDark] = useState(settings.dark);
  const [tempUnit, setTempUnit] = useState(settings.tempUnit);
  const [windUnit, setWindUnit] = useState(settings.windUnit);


  /* Handlers */
  const handleSave = () => {
    setSettings(prev => ({
      ...prev,
      dark,
      tempUnit,
      windUnit
    }));
  };

  const handleReset = () => {
    setDark(settings.dark ?? false);
    setTempUnit(settings.tempUnit ?? "C");
    setWindUnit(settings.windUnit ?? "mph");
  };


  /* UI */

  return (
    <div className="text-white p-6 w-full">

      {/* Header */}
      <div className="mt-10 ml-2 xl:ml-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Settings
        </h2>
        <p className="text-slate-400 mt-2">
          Customize your WeatherWise experience with premium preferences.
        </p>
      </div>


      {/* Main Card */}
      <div className="max-w-4xl mt-10 xl:ml-20 rounded-3xl overflow-hidden
                      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        {/* Appearance */}
        <div className="p-6 md:p-8 border-b border-white/10">

          <div className="flex items-center gap-2 md:gap-4 mb-5 md:mb-8">
            <span className="material-symbols-outlined text-indigo-400 text-xl sm:text-2xl md:text-3xl">
              Palette
            </span>
            <h3 className="text-md md:text-xl font-bold">Appearance</h3>
          </div>

          <div className="space-y-8">
            <ToggleRow
              title="Dark Theme"
              desc="Enable rich dark effects"
              enabled={dark}
              setEnabled={setDark}
            />
          </div>

        </div>


        {/* Units */}
        <div className="p-6 md:p-8 border-b border-white/10">

          <div className="flex items-center gap-2 md:gap-4 mb-5 md:mb-8">
            <span className="material-symbols-outlined text-cyan-400 text-xl sm:text-2xl md:text-3xl">
              Thermostat
            </span>
            <h3 className="text-[15px] md:text-xl font-bold">
              Units & Localization
            </h3>
          </div>

          <div className="space-y-8">

            <SelectRow
              title="Temperature Scale"
              desc="Switch between Celsius and Fahrenheit"
              options={[
                { label: "Fahrenheit", value: "F" },
                { label: "Celsius", value: "C" }
              ]}
              selected={tempUnit}
              setSelected={setTempUnit}
            />

            <SelectRow
              title="Wind Speed"
              desc="Preferred measurement for wind velocity"
              options={[
                { label: "mph", value: "mph" },
                { label: "km/h", value: "kmh" },
                { label: "knots", value: "knots" }
              ]}
              selected={windUnit}
              setSelected={setWindUnit}
            />

          </div>
        </div>


        {/* Buttons */}
        <div className="flex gap-4 md:mt-10 justify-end p-8">

          <button
            onClick={handleReset}
            className="px-3 md:px-6 md:py-2 bg-gray-600 rounded-lg font-bold
                       hover:bg-gray-700 transition transform active:scale-95"
          >
            Reset
          </button>

          <button
            onClick={handleSave}
            className="px-3 md:px-6 py-2 bg-indigo-600 rounded-lg font-bold
                       hover:bg-indigo-700 transition transform active:scale-95"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}

export default Settings;



/* Toggle Component */

function ToggleRow({ title, desc, enabled, setEnabled }) {
  return (
    <div className="flex items-center justify-between">

      <div>
        <p className="font-bold text-md md:text-xl">{title}</p>
        <p className="text-slate-400 text-[12px] md:text-sm pr-2">{desc}</p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-13 h-7 sm:w-14 sm:h-8 rounded-full transition-all duration-300
        ${enabled ? "bg-indigo-600" : "bg-slate-700"}`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white
          transition-transform duration-300
          ${enabled ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>

    </div>
  );
}



/* Select Component */

function SelectRow({ title, desc, options, selected, setSelected }) {

  return (
    <div className="flex items-center justify-between">

      <div>
        <p className="font-bold text-sm md:text-xl">{title}</p>
        <p className="text-slate-400 text-[11px] md:text-sm pr-2">{desc}</p>
      </div>

      <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10">

        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`px-1 sm:px-2 md:px-5 py-1 md:py-1.5 rounded-lg
            text-[11px] md:text-[13px] xl:text-[16px] font-bold
            transition-all duration-200
            ${
              selected === opt.value
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}

      </div>

    </div>
  );
}