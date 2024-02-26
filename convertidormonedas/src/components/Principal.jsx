// Principal.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MonedasImage from '../components/Monedas/1.png';
import ConvertidorImage from '../components/Convertidor/3.png';
import ImagenSeries from '../components/Series/2.png';
import './Principal.css';

function Principal() {
  return (
    <div className="principal-container">
      <h2>Selecciona una opción:</h2>
      <ul>
        <li>
          <Link to="/monedas"><img src={MonedasImage} alt="Monedas" /></Link>
        </li>
        <li>
          <Link to="/convertidor"><img src={ConvertidorImage} alt="Convertidor" /></Link>
        </li>
        <li>
          <Link to="/series"><img src={ImagenSeries} alt="Series" /></Link>
        </li>
      </ul>
    </div>
  );
}

export default Principal;
