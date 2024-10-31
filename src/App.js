import React, { useState } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherResult from './components/WeatherResult';
import FavoritesList from './components/FavoritesList';
import TemperatureChart from './components/TemperatureChart';
import { ReactComponent as CloudyIcon } from './components/icons/cloudy.svg';
import { ReactComponent as RainyIcon } from './components/icons/rainy.svg';
import { ReactComponent as SnowyIcon } from './components/icons/snowy.svg';
import { ReactComponent as ThunderIcon } from './components/icons/thunder.svg';
import { ReactComponent as SunnyIcon } from './components/icons/sunny.svg';

function App() {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favoriteCities')) || []);
  const [temperatureData, setTemperatureData] = useState([]);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const fetchWeatherData = async (city) => {
    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert('Città non trovata. Riprova.');
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`);
      const weatherData = await weatherResponse.json();

      const currentWeather = weatherData.current_weather;
      const { label, Icon } = getWeatherCondition(currentWeather.weathercode);

      setWeather({
        name,
        temperature: currentWeather.temperature,
        condition: label,
        Icon,
        humidity: currentWeather.humidity,
        windSpeed: currentWeather.windspeed,
      });

      setTemperatureData(weatherData.hourly.temperature_2m);
      setIsAddedToFavorites(false);
    } catch (error) {
      console.error("Errore durante il recupero dei dati meteo:", error);
      alert("Si è verificato un errore durante il recupero dei dati meteo. Riprova più tardi.");
    }
  };

  const addCityToFavorites = (city) => {
    if (!favorites.some(c => c.name === city.name)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
      setIsAddedToFavorites(true);
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
      0: { label: 'Cielo sereno', Icon: SunnyIcon },
      1: { label: 'Principalmente sereno', Icon: SunnyIcon },
      2: { label: 'Parzialmente nuvoloso', Icon: CloudyIcon },
      3: { label: 'Nuvoloso', Icon: CloudyIcon },
      4: { label: 'Piovoso', Icon: RainyIcon },
      5: { label: 'Nevoso', Icon: SnowyIcon },
      6: { label: 'Temporale', Icon: ThunderIcon },
      7: { label: 'Soleggiato', Icon: SunnyIcon },
    };

    return conditions[code] || { label: 'Condizione sconosciuta', Icon: CloudyIcon };
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">App Meteo</h1>
      <WeatherSearch fetchWeatherData={fetchWeatherData} />
      <div className="row mt-4 g-4 d-flex align-items-stretch"> {/* Added g-4 for gaps */}
        {weather && (
          <>
            <div className="col-md-5">
              <div className="border p-3 rounded h-100">
                <h4 className="text-center">Meteo Attuale</h4>
                <WeatherResult
                  weather={weather}
                  addCityToFavorites={addCityToFavorites}
                  isAddedToFavorites={isAddedToFavorites}
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="border p-3 rounded h-100">
                <h4 className="text-center">Andamento della Temperatura nelle Ultime 24 Ore</h4>
                {temperatureData.length > 0 && <TemperatureChart temperatureData={temperatureData} />}
              </div>
            </div>
          </>
        )}
      </div>
      <FavoritesList
        favorites={favorites}
        removeCityFromFavorites={removeCityFromFavorites}
        sortFavoritesByTemperature={sortFavoritesByTemperature}
      />
    </div>
  );
}

export default App;
