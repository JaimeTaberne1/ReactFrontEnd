import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect desde 'react'
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
import './ConvertidorDeMonedas.css'; // Importa el archivo de estilos CSS

function ConvertidorDeMonedas() {
  // Declaración de estados utilizando el hook useState
  const [monedas, setMonedas] = useState([]); // Estado para almacenar la lista de monedas
  const [monedaOrigen, setMonedaOrigen] = useState(''); // Estado para almacenar la moneda de origen
  const [monedaDestino, setMonedaDestino] = useState(''); // Estado para almacenar la moneda de destino
  const [cantidad, setCantidad] = useState(1); // Estado para almacenar la cantidad a convertir (por defecto 1)
  const [tasaDeCambio, setTasaDeCambio] = useState(); // Estado para almacenar la tasa de cambio
  const [cantidadConvertida, setCantidadConvertida] = useState(); // Estado para almacenar la cantidad convertida

  // Efecto para obtener la lista de monedas al cargar el componente
  useEffect(() => {
    axios.get('https://api.frankfurter.app/currencies')
      .then(response => {
        const listaMonedas = Object.keys(response.data); // Obtiene las claves (siglas) de las monedas
        setMonedas(listaMonedas); // Actualiza el estado de monedas con la lista obtenida
        setMonedaOrigen(listaMonedas[0]); // Establece la primera moneda como moneda de origen por defecto
        setMonedaDestino(listaMonedas[1]); // Establece la segunda moneda como moneda de destino por defecto
      })
      .catch(error => {
        console.error('Error al obtener las monedas:', error); // Manejo de errores
      });
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Efecto para obtener la tasa de cambio al cambiar la moneda de origen o destino
  useEffect(() => {
    if (monedaOrigen && monedaDestino) {
      axios.get(`https://api.frankfurter.app/latest?from=${monedaOrigen}&to=${monedaDestino}`)
        .then(response => {
          setTasaDeCambio(response.data.rates[monedaDestino]); // Obtiene la tasa de cambio
        })
        .catch(error => {
          console.error('Error al obtener la tasa de cambio:', error); // Manejo de errores
        });
    }
  }, [monedaOrigen, monedaDestino]); // El efecto se ejecuta cuando cambia la moneda de origen o destino

  // Efecto para calcular la cantidad convertida al cambiar la cantidad o la tasa de cambio
  useEffect(() => {
    if (tasaDeCambio) {
      setCantidadConvertida((cantidad * tasaDeCambio).toFixed(2)); // Calcula la cantidad convertida con dos decimales
    }
  }, [cantidad, tasaDeCambio]); // El efecto se ejecuta cuando cambia la cantidad o la tasa de cambio

  // Función para manejar el cambio de la moneda de origen
  const manejarCambioMonedaOrigen = (e) => {
    setMonedaOrigen(e.target.value); // Actualiza el estado de la moneda de origen
  };

  // Función para manejar el cambio de la moneda de destino
  const manejarCambioMonedaDestino = (e) => {
    setMonedaDestino(e.target.value); // Actualiza el estado de la moneda de destino
  };

  // Función para manejar el cambio de la cantidad
  const manejarCambioCantidad = (e) => {
    setCantidad(e.target.value); // Actualiza el estado de la cantidad
  };

  // Retorna la estructura JSX del componente ConvertidorDeMonedas
  return (
    <div className="convertidor-container">
      <div className="convertidor-center">
        <h2>Convertidor de Monedas</h2>
        <div>
          {/* Input para la cantidad */}
          <input type="number" value={cantidad} onChange={manejarCambioCantidad} />
          {/* Select para la moneda de origen */}
          <select value={monedaOrigen} onChange={manejarCambioMonedaOrigen}>
            {/* Mapea las monedas para crear las opciones */}
            {monedas.map(moneda => (
              <option key={moneda} value={moneda}>{moneda}</option>
            ))}
          </select>
          {/* Texto 'a' */}
          <span>a &nbsp;</span>
          {/* Select para la moneda de destino */}
          <select value={monedaDestino} onChange={manejarCambioMonedaDestino}>
            {/* Mapea las monedas para crear las opciones */}
            {monedas.map(moneda => (
              <option key={moneda} value={moneda}>{moneda}</option>
            ))}
          </select>
          {/* Botón para convertir */}
          <button>Convertir</button>
        </div>
        {/* Muestra la cantidad convertida si hay tasa de cambio */}
        {tasaDeCambio && (
          <p>{`${cantidad} ${monedaOrigen} = ${cantidadConvertida} ${monedaDestino}`}</p>
        )}
      </div>
    </div>
  );
}

export default ConvertidorDeMonedas; // Exporta el componente ConvertidorDeMonedas
