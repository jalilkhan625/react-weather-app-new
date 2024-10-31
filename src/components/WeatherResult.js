import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WeatherResult = ({ weather, loading, error, addCityToFavorites, isAddedToFavorites }) => {
  const [isCurrentlyAddedToFavorites, setIsCurrentlyAddedToFavorites] = useState(isAddedToFavorites);

  useEffect(() => {
    setIsCurrentlyAddedToFavorites(isAddedToFavorites);
  }, [isAddedToFavorites]);

  const handleAddToFavorites = () => {
    addCityToFavorites(weather);
    setIsCurrentlyAddedToFavorites(true);
  };

  if (loading) return <p>Caricamento...</p>; // Loading in Italian
  if (error) return <p>Errore nel caricamento dei dati meteorologici. Per favore riprova.</p>; // Error message in Italian
  if (!weather) return null;

  const { name, temperature, condition, humidity, windSpeed, Icon } = weather;

  return (
    <div className="weather-result-card-container">
      {/* City Name - moved outside the card border */}
      <div className="city-name p-3 rounded" style={{ textAlign: 'center', backgroundColor: '#f8f9fa', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {name}
      </div>

      <div className="card mb-3 weather-result-card" style={{ border: 'none' }}>
        <div className="p-2 d-flex justify-content-between" style={{ textAlign: 'left' }}>
          <div className="weather-info" style={{ flex: '1' }}>
            <p><strong>Temperatura:</strong> {temperature}°C</p> {/* Temperature in Italian */}
            <p><strong>Meteo:</strong> {condition}</p> {/* Weather in Italian */}
            <p><strong>Umidità:</strong> {humidity}%</p> {/* Humidity in Italian */}
            <p><strong>Velocità del Vento:</strong> {windSpeed} m/s</p> {/* Wind Speed in Italian */}
          </div>

          <div className="right-box" style={{ 
            width: '50%', 
            height: 'auto', 
            marginLeft: '10px',
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
                transform: 'scale(6)', 
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

        <div className="d-flex justify-content-end mt-3">
          <div style={{ marginTop: '80px' }}>
            <button 
              onClick={handleAddToFavorites} 
              className={`btn btn-secondary ${isCurrentlyAddedToFavorites ? 'blur' : ''}`} 
              disabled={isCurrentlyAddedToFavorites} 
              aria-label={isCurrentlyAddedToFavorites ? 'Città aggiunta ai preferiti' : 'Aggiungi città ai preferiti'} // Button label in Italian
            >
              <span role="img" aria-label="Aggiungi ai preferiti">🤍</span>
              {isCurrentlyAddedToFavorites ? 'Aggiunto ai Preferiti' : 'Aggiungi ai Preferiti'} 
            </button>
          </div>
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
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  addCityToFavorites: PropTypes.func.isRequired,
  isAddedToFavorites: PropTypes.bool.isRequired,
};

export default WeatherResult;
