import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';


function App() {
  const [civilizations, setCivilizations] = useState([]);
  const [selectedCivilization, setSelectedCivilization] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://www.aoepulse.com/api/v1/civ_win_rates/')
      .then((response) => response.json())
      .then((data) => setCivilizations(data.civs_list));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCivilizations = civilizations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(civilizations.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Listado de Civilizaciones</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Partidos jugados</th>
            <th>Partidos ganados</th>
            <th>Tasa de victoria</th>
          </tr>
        </thead>
        <tbody>
          {currentCivilizations.map((civilization) => (
            <tr key={civilization.name}>
              <td>{civilization.name}</td>
              <td>{civilization.total}</td>
              <td>{civilization.wins}</td>
              <td>
                {((civilization.wins / civilization.total) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
