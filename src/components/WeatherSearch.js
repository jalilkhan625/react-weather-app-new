import React, { useState } from 'react';

const WeatherSearch = ({ fetchWeatherData }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
    } else {
      alert('Please enter a city name.');
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="form-control"
        placeholder="Enter a city name"
      />
      <button onClick={handleSearch} className="btn btn-primary">Search</button>
    </div>
  );
};

export default WeatherSearch;
