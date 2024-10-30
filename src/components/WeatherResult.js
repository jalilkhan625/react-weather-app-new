import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const WeatherResult = ({ weather, loading, error, addCityToFavorites }) => {
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const handleAddToFavorites = () => {
    addCityToFavorites(weather);
    setIsAddedToFavorites(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather data. Please try again.</p>;
  if (!weather) return null;

  const { name, temperature, condition, humidity, windSpeed, weatherCode } = weather;

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 0: // Clear sky
        return <i className="wi wi-day-sunny" title="Sunny" />;
      case 1: // Few clouds
        return <i className="wi wi-day-cloudy" title="Partly Cloudy" />;
      case 2: // Scattered clouds
        return <i className="wi wi-day-cloudy" title="Partly Cloudy" />;
      case 3: // Broken clouds
        return <i className="wi wi-cloud" title="Cloudy" />;
      case 4: // Overcast clouds
        return <i className="wi wi-cloud" title="Overcast" />;
      case 45: // Fog
      case 48: // Freezing fog
        return <i className="wi wi-fog" title="Fog" />;
      case 51: // Light rain
        return <i className="wi wi-rain" title="Light Rain" />;
      case 53: // Moderate rain
        return <i className="wi wi-rain" title="Moderate Rain" />;
      case 55: // Heavy rain
        return <i className="wi wi-rain" title="Heavy Rain" />;
      case 61: // Sleet
        return <i className="wi wi-sleet" title="Sleet" />;
      case 63: // Light shower rain
        return <i className="wi wi-showers" title="Light Shower Rain" />;
      case 65: // Heavy shower rain
        return <i className="wi wi-showers" title="Heavy Shower Rain" />;
      case 71: // Snow fall
        return <i className="wi wi-snow" title="Snowfall" />;
      case 73: // Heavy snow
        return <i className="wi wi-snow" title="Heavy Snow" />;
      case 75: // Snow showers
        return <i className="wi wi-snow" title="Snow Showers" />;
      case 80: // Rain showers
        return <i className="wi wi-showers" title="Rain Showers" />;
      case 81: // Heavy rain showers
        return <i className="wi wi-showers" title="Heavy Rain Showers" />;
      case 82: // Extreme rain showers
        return <i className="wi wi-showers" title="Extreme Rain Showers" />;
      case 95: // Thunderstorm
        return <i className="wi wi-thunderstorm" title="Thunderstorm" />;
      case 96: // Thunderstorm with hail
      case 99: // Thunderstorm with hail
        return <i className="wi wi-thunderstorm" title="Thunderstorm with Hail" />;
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
      <button 
        onClick={handleAddToFavorites} 
        className={`btn btn-secondary mt-3 ${isAddedToFavorites ? 'blur' : ''}`} 
        disabled={isAddedToFavorites} // Disable button after adding to favorites
      >
        <FontAwesomeIcon icon={faHeart} className="me-2" />
        {isAddedToFavorites ? 'Added to Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default WeatherResult;
