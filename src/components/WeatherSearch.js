import React, { useState } from 'react';

const WeatherSearch = ({ fetchWeatherData }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
    } else {
      alert('Per favore, inserisci un nome di città.');
    }
  };

  return (
    <div
      className="row"
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        padding: '0 15px',
      }}
    >
      <div
        className="col-md-8 col-lg-6"
        style={{
          padding: '0',
        }}
      >
        <div
          className="input-group mb-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control"
            placeholder="Inserisci il nome di una città"
            style={{
              border: 'none',
              padding: '12px 15px',
              fontSize: '16px',
              borderRadius: '12px 0 0 12px',
              outline: 'none',
              transition: 'box-shadow 0.3s ease',
              boxShadow: 'inset 0 0 5px rgba(0, 123, 255, 0.2)',
            }}
            onFocus={(e) => (e.target.style.boxShadow = 'inset 0 0 8px rgba(0, 123, 255, 0.4)')}
            onBlur={(e) => (e.target.style.boxShadow = 'inset 0 0 5px rgba(0, 123, 255, 0.2)')}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0 12px 12px 0',
              cursor: 'pointer',
              boxShadow: '0 3px 6px rgba(0, 123, 255, 0.3)',
              transition: 'background-color 0.3s ease, transform 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
            onMouseDown={(e) => (e.target.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Cerca
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
