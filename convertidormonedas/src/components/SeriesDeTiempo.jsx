import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeriesDeTiempo.css';

function SeriesDeTiempo() {
  const [tasas, setTasas] = useState({});
  const [fecha, setFecha] = useState('2024-02-09');
  const [monedaBase, setMonedaBase] = useState('EUR');

  useEffect(() => {
    obtenerTasas();
  }, [fecha, monedaBase]);

  const obtenerTasas = () => {
    axios.get(`https://api.frankfurter.app/${fecha}?from=${monedaBase}`)
      .then(response => {
        setTasas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener tasas:', error);
      });
  };

  return (
    <div className="series-de-tiempo-container">
      <h2>Tasas para {fecha}</h2>
      <div>
        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
      </div>
      <div>
        <label>Moneda Base:</label>
        <input type="text" value={monedaBase} onChange={e => setMonedaBase(e.target.value)} />
      </div>
      <div>
        <p><strong>Base:</strong> {tasas.base}</p>
        <p><strong>Date:</strong> {tasas.date}</p>
      </div>
      <ul>
        {tasas.rates && Object.entries(tasas.rates).map(([moneda, tasa]) => (
          <li key={moneda}>
            <strong>{moneda}:</strong> {tasa}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeriesDeTiempo;

