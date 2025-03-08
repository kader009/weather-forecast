import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);


  const fetchWeather = async (city) => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} p-5 transition-all`}>
      {/* Header */}
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Weather App</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl p-2">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
        </button>
      </header>
      
      {/* Search Bar */}
      <div className="flex justify-center mt-4 ">
        <input
          type="text"
          placeholder="Enter city name (e.g., Dhaka)"
          className="p-2 w-3/4 md:w-1/2 border rounded-l-lg focus:outline-none"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-lg">
          <FaSearch />
        </button>
      </div>
      
      {/* Current Weather Section */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md max-w-lg mx-auto">
        <h2 className="text-xl font-semibold">City Name</h2>
        <div className="text-5xl font-bold mt-2">25°C</div>
        <p className="text-lg text-gray-500">Sunny</p>
        <div className="flex justify-between mt-4 text-lg">
          <div className="flex items-center"><WiHumidity className="mr-1" /> 60%</div>
          <div className="flex items-center"><WiStrongWind className="mr-1" /> 10 km/h</div>
        </div>
      </div>
      
      {/* Forecast Section */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-md">
            <p className="text-lg font-medium">Day {index + 1}</p>
            <div className="text-2xl font-bold">22°C</div>
            <p className="text-gray-500">Cloudy</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App