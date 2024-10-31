import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faTrash } from '@fortawesome/free-solid-svg-icons';

const FavoritesList = ({ favorites, removeCityFromFavorites }) => {
  const [sortOrder, setSortOrder] = useState('asc'); // Initialize sort order state
  const [currentPage, setCurrentPage] = useState(1); // Initialize current page
  const itemsPerPage = 9; // Set the number of items per page

  const sortFavoritesByTemperature = () => {
    // Toggle between ascending and descending sort order
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Sort favorites based on current sort order
  const sortedFavorites = [...favorites].sort((a, b) => {
    return sortOrder === 'asc' ? a.temperature - b.temperature : b.temperature - a.temperature;
  });

  // Calculate the index of the last item and the first item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the sorted favorites array to get only the items for the current page
  const currentFavorites = sortedFavorites.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(sortedFavorites.length / itemsPerPage);

  return (
    <div>
      <button onClick={sortFavoritesByTemperature} className="btn btn-outline-primary mb-3 mt-3">
        <FontAwesomeIcon icon={faSort} className="me-2" />
        Ordina per Temperatura
      </button>
      <div className="row">
        {currentFavorites.map(city => (
          <div key={city.name} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">
                  Temperatura: {city.temperature}°C<br />
                  Meteo: {city.condition}<br />
                  Umidità: {city.humidity}%<br />
                  Velocità del Vento: {city.windSpeed} km/h
                </p>
                <div className="mt-auto text-end"> {/* Added classes for alignment */}
                  <button className="btn btn-danger" onClick={() => removeCityFromFavorites(city.name)}>
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          className="btn btn-outline-secondary"
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          className="btn btn-outline-secondary"
        >
          Next
        </button>
      </div>

      {/* Optional: Show current page information */}
      <div className="text-center mt-2">
        <p>Pagina {currentPage} di {totalPages}</p>
      </div>
    </div>
  );
};

export default FavoritesList;
