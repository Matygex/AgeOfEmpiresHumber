import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';


function App() {

const [civilizations, setCivilizations] = useState([]);
const [selectedCivilization, setSelectedCivilization] = useState(null);


useEffect(() => {
  fetch('https://www.aoepulse.com/api/v1/civ_win_rates/')
    .then((response) => response.json())
    .then((data) => setCivilizations(data.civs_list));
}, []);




  return (
  <div>
  <h2>Listado de Civilizaciones</h2>
  <select
    value={selectedCivilization ? selectedCivilization.name : ''}
    onChange={(e) => {
      const selectedName = e.target.value;
      const selectedCiv = civilizations.find(
        (civilization) => civilization.name === selectedName
      );
      setSelectedCivilization(selectedCiv);
    }}
  >
    <option value="">Selecciona una civilización</option>
    {civilizations.map((civilization) => (
      <option key={civilization.name} value={civilization.name}>
        {civilization.name}
      </option>
    ))}
  </select>
  <div>
  <h2>Detalles de la Civilización</h2>
  {selectedCivilization ? (
    <div>
      <p>Nombre: {selectedCivilization.name}</p>
      <p>Partidos jugados: {selectedCivilization.total}</p>
      <p>Partidos ganados: {selectedCivilization.wins}</p>
      <p>
        Tasa de victoria:{' '}
        {((selectedCivilization.wins / selectedCivilization.total) * 100).toFixed(2)}%
      </p>
    </div>
  ) : (
    <div>Selecciona una civilización para ver los detalles.</div>
  )}
</div>
</div>
  );
}

export default App;
