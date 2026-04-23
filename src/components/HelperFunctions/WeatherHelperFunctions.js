// Describe humidity levels
export const getHumidityDescription = (humidity) => {
  if (humidity < 30) return "Dry air";
  if (humidity < 60) return "Comfortable humidity";
  if (humidity < 80) return "Humid conditions";
  return "Very humid";
};

// Describe humidity levels
export const getWindDescription = (speedKmh) => {
  if (speedKmh < 1) return "Calm winds";
  if (speedKmh < 5) return "Light breeze";
  if (speedKmh < 10) return "Moderate winds";
  return "Strong winds";
};