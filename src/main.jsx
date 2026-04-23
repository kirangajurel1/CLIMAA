import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import AirQuality from './pages/AirQuality.jsx'
import Settings from './pages/Settings.jsx'
import WeatherContextProvider from './context/WeatherContextProvider.jsx'
import { SettingsContextProvider } from './context/SettingsContext.jsx'
import Daily from './pages/Daily.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "daily",
        element: <Daily />
      },
      {
        path: "airQuality",
        element: <AirQuality />
      },
      {
        path: "settings",
        element: <Settings />
      },
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsContextProvider>
      <WeatherContextProvider>
        <RouterProvider router={router}/>
      </WeatherContextProvider>
    </SettingsContextProvider>
  </StrictMode>,
)


