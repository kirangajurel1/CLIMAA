// 🇺🇸 US EPA AQI Calculation (Based on PM2.5)
 export const calculateUSAQI = (pm25) => {
  const breakpoints = [
    { bpLo: 0.0, bpHi: 12.0, iLo: 0, iHi: 50 },
    { bpLo: 12.1, bpHi: 35.4, iLo: 51, iHi: 100 },
    { bpLo: 35.5, bpHi: 55.4, iLo: 101, iHi: 150 },
    { bpLo: 55.5, bpHi: 150.4, iLo: 151, iHi: 200 },
    { bpLo: 150.5, bpHi: 250.4, iLo: 201, iHi: 300 },
    { bpLo: 250.5, bpHi: 500.4, iLo: 301, iHi: 500 }
  ];

  const bp = breakpoints.find(
    (b) => pm25 >= b.bpLo && pm25 <= b.bpHi
  );

  if (!bp) return 0;

  const aqi =
    ((bp.iHi - bp.iLo) / (bp.bpHi - bp.bpLo)) *
      (pm25 - bp.bpLo) +
    bp.iLo;

  return Math.round(aqi);
};


// 🇺🇸 US AQI Category + Color
export const getUSAQICategory = (aqi) => {
  if (aqi <= 50) return { label: "Good", color: "text-green-400", bg: "bg-green-400" };
  if (aqi <= 100) return { label: "Moderate", color: "text-yellow-400", bg: "bg-yellow-400" };
  if (aqi <= 150) return { label: "Unhealthy (Sensitive)", color: "text-orange-400", bg: "bg-orange-400" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-500", bg: "bg-red-500"};
  if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-500", bg: "bg-purple-500"};
  return { label: "Hazardous", color: "text-red-700", bg: "bg-purple-500" };
};

