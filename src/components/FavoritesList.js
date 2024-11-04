import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faTrash } from '@fortawesome/free-solid-svg-icons';

const FavoritesList = ({ favorites, removeCityFromFavorites }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const sortFavoritesByTemperature = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    return sortOrder === 'asc' ? a.temperature - b.temperature : b.temperature - a.temperature;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFavorites = sortedFavorites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFavorites.length / itemsPerPage);

  return (
    <div>
      <button
        onClick={sortFavoritesByTemperature}
        style={{
          backgroundColor: 'transparent',
          color: '#4CAF50',
          border: '2px solid #4CAF50',
          padding: '10px 20px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '20px',
          marginTop: '20px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#4CAF50';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#4CAF50';
        }}
      >
        <FontAwesomeIcon icon={faSort} style={{ marginRight: '8px' }} />
        Ordina per Temperatura
      </button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
      }}>
        {currentFavorites.map(city => (
          <div key={city.name} style={{
            backgroundColor: '#f7f9fc',
            border: 'none',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="card-body d-flex flex-column" style={{ padding: '15px' }}>
              <h5 style={{
                color: '#333',
                fontSize: '1.2em',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}>{city.name}</h5>
              <p style={{
                color: '#555',
                marginBottom: 'auto',
              }}>
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>Temperatura:</span> {city.temperature}°C<br />
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>Meteo:</span> {city.condition}<br />
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>Umidità:</span> {city.humidity}%<br />
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>Velocità del Vento:</span> {city.windSpeed} km/h
              </p>
              <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                <button
                  onClick={() => removeCityFromFavorites(city.name)}
                  style={{
                    backgroundColor: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '5px',
                    fontSize: '0.9em',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e60000'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4d4d'}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: '2px' }} />
                  
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
      }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Previous
        </button>
        <span style={{ fontWeight: 'bold', color: '#333' }}>
          Pagina {currentPage} di {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FavoritesList;
