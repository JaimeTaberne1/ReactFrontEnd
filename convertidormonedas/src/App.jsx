// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import Principal from './components/Principal';
import Monedas from './components/Monedas';
import ConvertidorDeMonedas from './components/ConvertidorDeMonedas';
import SeriesDeTiempo from './components/SeriesDeTiempo';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav> 
          <ul> 
            <li><Link to="/">Principal</Link></li> 
            <li><Link to="/monedas">Monedas</Link></li> 
            <li><Link to="/convertidor">Convertidor de Monedas</Link></li>
            <li><Link to="/series">Series de Tiempo</Link></li> 
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/monedas" element={<Monedas />} />
          <Route path="/convertidor" element={<ConvertidorDeMonedas />} />
          <Route path="/series" element={<SeriesDeTiempo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
