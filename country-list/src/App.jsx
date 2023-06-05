import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countriesPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const json = await response.json();
    const dataUpdate = json.filter((country) => country.name.common !== 'Russia' && country.name.common !== 'Belarus');

    // const targetCountry = dataUpdate.find((country) => country.name.common === 'Ukraine');
    // if (targetCountry) {
    //   const index = dataUpdate.indexOf(targetCountry);
    //   if (index > -1) {
    //     dataUpdate.splice(index, 1);
    //     dataUpdate.unshift(targetCountry);
    //   }
    }

    const sortedData = dataUpdate.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setData(dataUpdate);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedCountry(null);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const countriesOnPage = data.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(data.length / countriesPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      const leftBoundary = Math.max(1, currentPage - 4);
      const rightBoundary = Math.min(currentPage + 5, totalPages);
      return Array.from({ length: rightBoundary - leftBoundary + 1 }, (_, index) => leftBoundary + index);
    }
  };

  return (
    <>
      <div className="blockList padding-7">
        <p className="textApp">List of Countries:</p>
      </div>
      <div className="blockParent">
        {countriesOnPage.map((country) => (
          <div
            key={country.name.common}
            className={`block ${selectedCountry === country ? 'selected' : ''}`}
            onClick={() => handleCountryClick(country)}
          >
            <p className="textApp">{country.name.common}</p>
            <img src={country.flags.png} className="photoUser" alt={country.name.common} />
          </div>
        ))}
      </div>
      {selectedCountry && (
        <div className="countryInfo">
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          {/* Add more information as needed */}
        </div>
      )}
      <div className="pagination">
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`paginationButton ${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
//}

export default App;

