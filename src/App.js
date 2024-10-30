import React, { useState, useEffect } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherResult from './components/WeatherResult';
import FavoritesList from './components/FavoritesList';
import TemperatureChart from './components/TemperatureChart';

function App() {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favoriteCities')) || []);
  const [temperatureData, setTemperatureData] = useState([]);

  const fetchWeatherData = async (city) => {
    // Fetch geolocation data
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoResponse.json();

    if (geoData.results.length === 0) {
      alert('City not found. Please try again.');
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`);
    const weatherData = await weatherResponse.json();

    const currentWeather = weatherData.current_weather;
    setWeather({
      name,
      temperature: currentWeather.temperature,
      condition: getWeatherCondition(currentWeather.weathercode),
      humidity: currentWeather.humidity,
      windSpeed: currentWeather.windspeed,
    });

    setTemperatureData(weatherData.hourly.temperature_2m);
  };

  const addCityToFavorites = (city) => {
    if (!favorites.some(c => c.name === city.name)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
  };

  const removeCityFromFavorites = (name) => {
    const newFavorites = favorites.filter(city => city.name !== name);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  const sortFavoritesByTemperature = () => {
    const sortedFavorites = [...favorites].sort((a, b) => parseFloat(a.temperature) - parseFloat(b.temperature));
    setFavorites(sortedFavorites);
  };

  const getWeatherCondition = (code) => {
    const conditions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
    };
    return conditions[code] || 'Unknown condition';
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather App</h1>
      <WeatherSearch fetchWeatherData={fetchWeatherData} />
      {weather && <WeatherResult weather={weather} addCityToFavorites={addCityToFavorites} />}
      <FavoritesList
        favorites={favorites}
        removeCityFromFavorites={removeCityFromFavorites}
        sortFavoritesByTemperature={sortFavoritesByTemperature}
      />
      {temperatureData.length > 0 && <TemperatureChart temperatureData={temperatureData} />}
    </div>
  );
}

export default App;
