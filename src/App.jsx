import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import {
  BsCloudSun,
  BsCloudRain,
  BsCloudSnow,
  BsSun,
  BsCloud,
} from 'react-icons/bs';

// define weather icon based on weather condition
const weatherIcon = {
  Clear: <BsSun className="text-yellow-500 text-4xl" />,
  Clouds: <BsCloud className="text-gray-400 text-4xl" />,
  Rain: <BsCloudRain className="text-blue-500 text-4xl" />,
  Snow: <BsCloudSnow className="text-white text-4xl" />,
  default: <BsCloudSun className="text-gray-400 text-4xl" />,
};

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  ); // dark mode state from local storage
  const [weather, setWeather] = useState(null); // current weather data
  const [error, setError] = useState(null); // Error message
  const [forecast, setForecast] = useState([]); // hourly forecast data
  const inputRef = useRef(); // reference to city input field

  // persist dark mode to local storage
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // fetching weather data from openweathermap
  const fetchWeather = async (city) => {
    try {
      
    // fetch current weather data
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

    // fetch hourly forecast 
      const ForecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      console.log('forecast data:', ForecastResponse.data.list); // logging for bebugging

      if (!ForecastResponse.data || !ForecastResponse.data.list) {
        throw new Error('Invalid forecast data');
      }

      // update state with fetch data
      setWeather(response.data);

      // get first 5 hour
      setForecast(ForecastResponse.data.list.slice(0, 5));

      setError(null); // clear previous error
      console.log(response.data);
    } catch (error) {
      // handle error during api call
      setWeather(null);
      setForecast([]);
      setError(error.message || 'Failed to fetch weather data!');
      console.error(error);
    }
  };

  // fetch weather data on inial load (default city : london)
  useEffect(() => {
    fetchWeather('london');
  }, []);

  // return the appropiate weather icon based on weather condition
  const implementIcon = (weatherCondition) => {
    if (weatherCondition in weatherIcon) {
      return weatherIcon[weatherCondition];
    }
    return weatherIcon.default;
  };

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
          className="p-2 w-3/4 md:w-1/2 border-2 border-gray-300 rounded-l-lg focus:outline-none placeholder-gray-500 dakr:placeholder-gray-300 bg-white dark:bg-black text-black dark:text-white"
        />
        <button
          onClick={() => fetchWeather(inputRef.current.value)}
          className="bg-blue-500 text-white p-2 rounded-r-lg transition-all"
        >
          <FaSearch />
        </button>
      </div>

      {/* Current Weather Section and show data */}

      {error ? (
        <div className="text-red-500 text-center font-bold">
          Error! <strong>{error}</strong>
        </div>
      ) : weather ? (
        <div className="mt-8 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md max-w-lg mx-auto">
          <h2 className="text-xl font-semibold capitalize dark:bg-gray-900 text-black">
            {weather.name}
          </h2>
          <div className="text-5xl font-bold mt-2 dark:bg-gray-900 text-black">
            {Math.round(weather.main?.temp)}°C
          </div>
          <p className="text-lg text-black dark:bg-gray-900 my-3">
            {implementIcon(weather.weather[0]?.main)}
          </p>
          <p className="text-lg text-black dark:bg-gray-900 font-semibold">
            {weather.weather[0]?.description}
          </p>
          <div className="flex justify-between mt-4 text-lg">
            <div className="flex items-center text-black dark:bg-gray-900">
              <WiHumidity className="mr-1 text-3xl" /> {weather?.main?.humidity}
              %
            </div>
            <div className="flex items-center dark:bg-gray-900 text-black">
              <WiStrongWind className="mr-1 text-3xl" /> {weather?.wind?.speed}{' '}
              km/h
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

      {/* Forecast hourly Section */}
      <div>
        <h1 className="capitalize font-bold text-xl my-5">hourly forecast</h1>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecast.map((hour, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <p className="text-lg font-medium dark:bg-gray-900 text-black">
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <div className="text-2xl font-bold dark:bg-gray-900 text-black">
                {Math.round(hour.main.temp)}°C
              </div>
              <p className="text-gray-500">
                {implementIcon(hour.weather[0]?.main)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
