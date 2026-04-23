// utils/errorMessages.js
export function getUserErrorMessage(code) {
  switch (code) {
    case "CITY_NOT_FOUND":
      return "City not found. Please check the spelling.";
    case "CURRENT_WEATHER_FAILED":
      return "Unable to load weather.";
    case "FORECAST_FAILED":
      return "Unable to load forecast data.";
    case "AIR_QUALITY_FAILED":
      return "Unable to load air quality data.";
    default:
      return "Something went wrong. Please try again.";
  }
}
