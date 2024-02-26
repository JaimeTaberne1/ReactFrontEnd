import { useState, useEffect } from 'react';
import axios from 'axios';
import './Monedas.css';

function Monedas() {
  // Estado para almacenar las monedas obtenidas de la API
  const [monedas, setMonedas] = useState({});

  // Efecto para cargar las monedas al montar el componente
  useEffect(() => {
    obtenerMonedas();
  }, []);

  // Función para obtener las monedas desde la API
  const obtenerMonedas = () => {
    axios.get('https://api.frankfurter.app/currencies')
      .then(response => {
        setMonedas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las monedas:', error);
      });
  };

  return (
    <div className="monedas-container">
      <h2>Monedas</h2>
      <ul>
        {/* Mapeo de las monedas */}
        {Object.entries(monedas).map(([sigla, nombre]) => (
          <li key={sigla}>
            <strong>{sigla}</strong>: {nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Monedas;
