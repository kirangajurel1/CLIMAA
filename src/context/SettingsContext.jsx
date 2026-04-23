import React, { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext({
  settings: {
    dark: false,
    tempUnit: "C",
    windUnit: "mph"
  },
  setSettings: () => {}
});

export function SettingsContextProvider({ children }) {

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("appSettings");
    return saved
      ? JSON.parse(saved)
      : { dark: false, tempUnit: "C", windUnit: "mph" };
  });

  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}