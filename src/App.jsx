import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import {BsCloudSun, BsCloudRain, BsCloudSnow, BsSun, BsCloud} from 'react-icons/bs'

const weatherIcon = {
  Clear: < BsSun className='text-yellow-500 text-4xl'/>,
  Clouds: < BsCloud className='text-gray-400 text-4xl'/>,
  Rain: < BsCloudRain className='text-blue-500 text-4xl'/>,
  Snow: < BsCloudSnow className='text-white text-4xl'/>,
  default: < BsCloudSun className='text-gray-400 text-4xl'/>
}

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setWeather(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError(null);
    }
  };

  useEffect(() => {
    fetchWeather('london');
  }, []);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      } p-5 transition-all`}
    >
      {/* Header */}
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Weather App</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl p-2">
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mt-4 ">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city name (e.g., Dhaka)"
          className="p-2 w-3/4 md:w-1/2 border rounded-l-lg focus:outline-none"
        />
        <button
          onClick={() => fetchWeather(inputRef.current.value)}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          <FaSearch />
        </button>
      </div>

      {/* Current Weather Section */}

      {error ? (
        <div>error</div>
      ) : weather ? (
        <div className="mt-8 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md max-w-lg mx-auto">
          <h2 className="text-xl font-semibold capitalize">{weather.name}</h2>
          <div className="text-5xl font-bold mt-2">{Math.round(weather.main?.temp)}°C</div>
          <p className="text-lg text-gray-500">
            {weather.weather[0]?.description}
          </p>
          <div className="flex justify-between mt-4 text-lg">
            <div className="flex items-center">
              <WiHumidity className="mr-1" /> {weather?.main?.humidity}%
            </div>
            <div className="flex items-center">
              <WiStrongWind className="mr-1" /> {weather?.wind?.speed} km/h
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-8 border-dashed border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-8 border-dashed border-green-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="text-xl mt-4">Loading...</p>
        </div>
      )}

      {/* Forecast Section */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-md"
          >
            <p className="text-lg font-medium">Day {index + 1}</p>
            <div className="text-2xl font-bold">22°C</div>
            <p className="text-gray-500">Cloudy</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
