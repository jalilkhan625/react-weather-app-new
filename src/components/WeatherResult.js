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

  if (loading) return <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>Caricamento...</p>;
  if (error) return (
    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#e74c3c' }}>
      Errore nel caricamento dei dati meteorologici. Per favore riprova.
    </p>
  );
  if (!weather) return null;

  const { name, temperature, condition, humidity, windSpeed, Icon } = weather;

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#f1f5f9',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          borderRadius: '10px 10px 0 0',
          padding: '15px',
          color: '#333',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {name}
      </div>

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0 0 10px 10px',
          padding: '20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          lineHeight: '1.6',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 0',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <div style={{ flex: '1', paddingRight: '10px' }}>
            <p style={{ margin: '10px 0', fontSize: '1rem', color: '#555' }}>
              <strong>Temperatura:</strong> {temperature}°C
            </p>
            <p style={{ margin: '10px 0', fontSize: '1rem', color: '#555' }}>
              <strong>Meteo:</strong> {condition}
            </p>
            <p style={{ margin: '10px 0', fontSize: '1rem', color: '#555' }}>
              <strong>Umidità:</strong> {humidity}%
            </p>
            <p style={{ margin: '10px 0', fontSize: '1rem', color: '#555' }}>
              <strong>Velocità del Vento:</strong> {windSpeed} m/s
            </p>
          </div>

          {Icon && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px', // Increased width
                height: '120px', // Increased height
                backgroundColor: '#f1f5f9',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Icon style={{ width: '100%', height: 'auto' }} />
            </div>
          )}
        </div>

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <button
            onClick={handleAddToFavorites}
            className="btn btn-secondary"
            disabled={isCurrentlyAddedToFavorites}
            style={{
              backgroundColor: isCurrentlyAddedToFavorites ? '#d3d3d3' : '#007bff',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: isCurrentlyAddedToFavorites ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s',
              boxShadow: '0 2px 6px rgba(0, 123, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              if (!isCurrentlyAddedToFavorites) {
                e.target.style.backgroundColor = '#0056b3';
              }
            }}
            onMouseLeave={(e) => {
              if (!isCurrentlyAddedToFavorites) {
                e.target.style.backgroundColor = '#007bff';
              }
            }}
            onMouseDown={(e) => (e.target.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            aria-label={isCurrentlyAddedToFavorites ? 'Città aggiunta ai preferiti' : 'Aggiungi città ai preferiti'}
          >
            <span role="img" aria-label="Aggiungi ai preferiti" style={{ marginRight: '8px' }}>
              🤍
            </span>
            {isCurrentlyAddedToFavorites ? 'Aggiunto ai Preferiti' : 'Aggiungi ai Preferiti'}
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
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  addCityToFavorites: PropTypes.func.isRequired,
  isAddedToFavorites: PropTypes.bool.isRequired,
};

export default WeatherResult;
