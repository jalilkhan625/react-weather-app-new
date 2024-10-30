// src/components/WeatherResult.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faCloudShowersHeavy, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherResult = ({ weather, addCityToFavorites }) => {
  if (!weather) return null;

  const { name, temperature, condition, humidity, windSpeed, weatherCode } = weather;

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 0:
        return <FontAwesomeIcon icon={faSun} size="2x" color="gold" />;
      case 1:
      case 2:
      case 3:
        return <FontAwesomeIcon icon={faCloudSun} size="2x" color="lightgray" />;
      case 45:
      case 48:
        return <FontAwesomeIcon icon={faCloud} size="2x" color="gray" />;
      case 51:
      case 53:
      case 55:
        return <FontAwesomeIcon icon={faCloudRain} size="2x" color="blue" />;
      case 61:
      case 63:
      case 65:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size="2x" color="darkblue" />;
      case 71:
      case 73:
      case 75:
        return <FontAwesomeIcon icon={faSnowflake} size="2x" color="lightblue" />;
      default:
        return null; // Fallback for any unrecognized weather codes
    }
  };

  return (
    <div className="card p-4">
      <h3>{name}</h3>
      <div className="text-center mb-3">
        {getWeatherIcon(weatherCode)}
      </div>
      <p><strong>Temperature:</strong> {temperature}°C</p>
      <p><strong>Weather:</strong> {condition}</p>
      <p><strong>Humidity:</strong> {humidity}%</p>
      <p><strong>Wind Speed:</strong> {windSpeed} m/s</p>
      <button onClick={() => addCityToFavorites(weather)} className="btn btn-secondary mt-3">Add to Favorites</button>
    </div>
  );
};

export default WeatherResult;
