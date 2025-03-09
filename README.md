# Weather App

This is a simple weather application built with React that integrates with the OpenWeatherMap API to display current weather conditions and forecasts for a given location. Users can search for cities and view detailed weather information.

## Features

- **City Search:** Allows users to search for weather information by city name.
- **Current Weather Display:** Shows the current temperature, weather description, humidity, and wind speed for the selected city.
- **Hourly Forecast:** Provides an hourly forecast for the next 5 hours.
- **Dark/Light Mode:** Supports both dark and light themes, with user preferences stored in local storage.
- **Responsive Design:** Adapts to different screen sizes and devices.
- **Error Handling:** Displays informative error messages when the city is not found or the API fails.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Javascript:** A Programming language.
- **Axios:** A promise-based HTTP client for making API requests.
- **Tailwind CSS:** A utility-first CSS framework for styling the application.
- **React Icons:** A library of customizable icons for React.
- **OpenWeatherMap API:** A weather data API providing current weather conditions and forecasts.

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd <project_directory>
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Configure the environment variables:**

    - Duplicate the `.example.env` file and rename the copy to `.env`:

      ```bash
      cp .example.env .env
      ```

    - Edit the `.env` file and add your OpenWeatherMap API key:

      ```
      VITE_API_KEY=<YOUR_API_KEY>
      ```

    - **Important:** Ensure that the `.env` file is added to your `.gitignore` file to prevent committing your API key to your public repository.

5.  **Start the development server:**

    ```bash
    npm run dev
    ```

6.  **Open the application in your browser:**

    - The application should be running at `http://localhost:5173` (or the port specified in your `vite.config.js` file).

## Code Structure

- `src/App.jsx`: The main component of the application, responsible for managing state, fetching weather data, and rendering the UI.
- `public/`: Contains static assets such as images and icons.
- `.env`: Stores environment-specific configuration variables such as the OpenWeatherMap API key.

## Design Choices

- **Single-File Component:** Due to the small scale and short timeframe of this task, the entire application logic has been implemented within the `App.jsx` file. This approach facilitated rapid development and simplified project management. However, it is recognized that for larger, more complex applications, a component-based architecture with modular components would offer improved maintainability and scalability.

- **Minimalist UI:** The user interface is designed to be clean and minimalist, prioritizing the display of essential weather information.

- **Dark/Light Mode:** Implemented a dark mode to improve user experience.

## Credits

- Weather data provided by the [OpenWeatherMap API](https://openweathermap.org/).
- Icons from [React Icons](https://react-icons.github.io/react-icons/).

## Screenshot

Here's a screenshot of the weather app UI:

![Weather App UI](https://i.ibb.co.com/pj1Y0qq9/Screenshot-2025-03-09-104925.png)

_Figure 1: Weather app user interface._
