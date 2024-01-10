import React, { useState } from 'react';
import './App.css';

const apiKey = '6c85ff25445afbef7717c19c7eae6053';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('An error occurred while fetching weather.');
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter city:
          <input type="text" value={city} onChange={handleInputChange} />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description.toUpperCase()}</p>
          <p>🌡️Temperature:{Math.floor(weather.main.temp-273)}°C</p>
          <p>☀️Humidity: {Math.round(weather.main.humidity)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
