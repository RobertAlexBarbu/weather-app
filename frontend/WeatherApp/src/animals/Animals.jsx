import React from 'react';
import './AnimalCards.css';

const AnimalCards = ({ animals, isEditing, onAddAnimalClick, onDeleteClick }) => {
  return (
    <div className="cards-container">
      {animals.map((animal) => (
        <div key={animal.id} className="card">
          {isEditing && (
            <button className="delete-button" onClick={() => onDeleteClick(animal.id)}>
              &times;
            </button>
          )}
          <div className="card-name">{animal.name}</div>
          <div className="card-stats">
            <div className="stat temperature">
              <div className="value">{animal.minTemperature} - {animal.maxTemperature} (°C)</div>
            </div>
            <div className="stat humidity">
              <div className="value">{animal.minHumidity} - {animal.maxHumidity} (%)</div>
            </div>
            <div className="stat condition">
              <div className="value">Rain: {animal.rain ? 'Yes' : 'No'}</div>
            </div>
            <div className="stat condition">
              <div className="value">Sunny: {animal.sunny ? 'Yes' : 'No'}</div>
            </div>
            <div className="stat condition">
              <div className="value">Cloudy: {animal.cloudy ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      ))}
      {isEditing && (
        <div className="card add-card" onClick={onAddAnimalClick}>
          <div className="add-symbol">+</div>
        </div>
      )}
    </div>
  );
};

export default AnimalCards;