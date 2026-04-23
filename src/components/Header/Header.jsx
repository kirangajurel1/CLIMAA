import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import WeatherContext from '../../context/WeatherContext'

function Header() {
  const { city, setCity, loading, setLat, setLon } = useContext(WeatherContext);
  const [inputValue, setInputValue] = useState(city);
  const [inputError, setInputError] = useState("");
  

  function handleSearch() {
    const cleanedCity = inputValue.trim();
    if (!cleanedCity) {
      setInputError("Enter a city name");
      return;
    }
    setInputError("");
    setCity(cleanedCity);
    setInputValue("");
    setLat(null);
    setLon(null);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className='
      bg-[rgba(15,23,42,0.8)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] 
      shadow-2xl p-3 mt-7 ml-12 mr-5 md:-ml-12 md:-mr-5  md:p-4 m-auto
      w-[92%] max-w-6xl h-[60px] md:h-[70px] rounded-full 
      flex flex-row justify-between items-center gap-2
    '>
      
      {/* Logo Section - Hidden text on tiny screens to save space */}
      <NavLink to={"/"} >
      <div className='flex items-center gap-2 ml-2 md:ml-4 flex-shrink-0'>
        
        <img 
          src="/images/logo.png" 
          alt="logo" 
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-lg"
        />
        <h2 className='text-white text-lg md:text-xl font-bold hidden sm:block'>CLIMAA</h2>
      </div>
      </NavLink>

      {/* Search Container */}
      <div className='flex-1 flex justify-end md:justify-center'>
        <div 
          className={`
            border p-1 rounded-full
            transition-all duration-300
            focus-within:shadow-[0_0_12px_rgba(34,211,238,0.4)]
            border-[rgba(34,211,238,0.3)]
            bg-transparent flex items-center
            w-full max-w-[400px]
          `}
        >
          <input 
            type='text'
            placeholder={inputError ? inputError : "Search city..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown} 
            className={`
              bg-transparent text-white border-0 outline-none 
              text-sm md:text-lg p-1 ml-3 w-full
              ${inputError ? 'placeholder-red-400' : 'placeholder-slate-400'}
            `}
          />
          <button
            onClick={handleSearch} 
            disabled={loading}
            className={`
              aspect-square h-7 md:h-9 flex items-center justify-center rounded-full
              transition-transform duration-200 hover:scale-105 active:scale-95
              ${loading ? 'bg-gray-500' : 'bg-fuchsia-800 hover:bg-fuchsia-700'}
              text-white mr-1
            `}
          >
            <i className="fa-solid fa-magnifying-glass text-xs md:text-base"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header