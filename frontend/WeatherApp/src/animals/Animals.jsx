// AnimalCards.jsx
import React, { useEffect, useState } from 'react';
import './AnimalCards.css';

const AnimalCards = ({ animals, isEditing, onAddAnimalClick, onDeleteClick, onEditButtonClick, downloadImageUrl }) => {
  const [animalImages, setAnimalImages] = useState({});

  useEffect(() => {
    const fetchImageUrls = async () => {
      const images = {};
      for (const animal of animals) {
        const imageUrl = await downloadImageUrl(animal.name);
        images[animal.id] = imageUrl;
      }
      setAnimalImages(images);
    };

    fetchImageUrls();
  }, [animals, downloadImageUrl]);

  return (
    <div className="cards-container">
      {animals.map((animal) => {
        const imageUrl = animalImages[animal.id];
        return (
          <div
            key={animal.id}
            className="card"
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="card-overlay">
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
              {isEditing && (
                <>
                  <button className="delete-button" onClick={() => onDeleteClick(animal)}>✖</button>
                  <button className="edit-animal-button" onClick={() => onEditButtonClick(animal)}>Edit</button>
                </>
              )}
            </div>
          </div>
        );
      })}
      {isEditing && (
        <div className="card add-card" onClick={onAddAnimalClick}>
          <div className="add-symbol">+</div>
        </div>
      )}
    </div>
  );
};

export default AnimalCards;
