import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WeatherResult = ({ weather, loading, error, addCityToFavorites }) => {
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const handleAddToFavorites = () => {
    addCityToFavorites(weather);
    setIsAddedToFavorites(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather data. Please try again.</p>;
  if (!weather) return null;

  const { name, temperature, condition, humidity, windSpeed, Icon } = weather;

  return (
    <div className="card mb-3 card weather-result-card" style={{ border: 'none' }}>
      <div className="p-2 d-flex justify-content-between" style={{ textAlign: 'left' }}>
        <div className="weather-info" style={{ flex: '1' }}>
          <h3 style={{ fontSize: '1.2rem' }}>{name}</h3>
          <p><strong>Temperature:</strong> {temperature}°C</p>
          <p><strong>Weather:</strong> {condition}</p>
          <p><strong>Humidity:</strong> {humidity}%</p>
          <p><strong>Wind Speed:</strong> {windSpeed} m/s</p>
        </div>

        {/* New Box on the Right */}
        <div className="right-box" style={{ 
          width: '50%', 
          height: 'auto', 
          marginLeft: '10px', // Adjusted margin to move closer to text
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '5px', 
          padding: '10px' 
        }}>
          {Icon && (
            <div style={{ 
              width: '50px',  
              height: '50px', 
              transform: 'scale(6)', // Increased size of the icon
              transition: 'transform 0.2s ease-in-out', 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Icon />
            </div>
          )}
        </div>
      </div>

      {/* Move the button to a new div at the bottom */}
      <div className="d-flex justify-content-end mt-3">
        <div style={{ marginTop: '80px' }}> {/* Add margin-top to create space */}
          <button 
            onClick={handleAddToFavorites} 
            className={`btn btn-secondary ${isAddedToFavorites ? 'blur' : ''}`} 
            disabled={isAddedToFavorites} 
            aria-label={isAddedToFavorites ? 'City added to favorites' : 'Add city to favorites'}
          >
            <span role="img" aria-label="Add to favorites">❤️</span>
            {isAddedToFavorites ? 'Added to Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop Types for validation
WeatherResult.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    windSpeed: PropTypes.number.isRequired,
    Icon: PropTypes.elementType.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  addCityToFavorites: PropTypes.func.isRequired,
};

export default WeatherResult;
