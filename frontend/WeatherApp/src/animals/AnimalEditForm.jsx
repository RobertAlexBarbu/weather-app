// AnimalEditForm.jsx
import React, { useState } from 'react';
import './AnimalForm.css';

const AnimalEditForm = ({ animal, onEditAnimal, onClose, uploadImage }) => {
  const [animalData, setAnimalData] = useState({ ...animal });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnimalData({
      ...animalData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
        const imageUrl = await uploadImage(imageFile, animalData.name);
        setAnimalData((prevData) => ({
            ...prevData,
            imageUrl,
        }));
        console.log('Image URL set in animal data:', imageUrl);
    }
    onEditAnimal(animalData);
    onClose();
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Animal</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={animalData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="minTemperature">Min Temperature (°C)</label>
              <input
                type="number"
                id="minTemperature"
                name="minTemperature"
                value={animalData.minTemperature}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxTemperature">Max Temperature (°C)</label>
              <input
                type="number"
                id="maxTemperature"
                name="maxTemperature"
                value={animalData.maxTemperature}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="minHumidity">Min Humidity (%)</label>
              <input
                type="number"
                id="minHumidity"
                name="minHumidity"
                value={animalData.minHumidity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxHumidity">Max Humidity (%)</label>
              <input
                type="number"
                id="maxHumidity"
                name="maxHumidity"
                value={animalData.maxHumidity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="rain"
                name="rain"
                checked={animalData.rain}
                onChange={handleChange}
              />
              <label htmlFor="rain">Rain</label>
            </div>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="sunny"
                name="sunny"
                checked={animalData.sunny}
                onChange={handleChange}
              />
              <label htmlFor="sunny">Sunny</label>
            </div>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="cloudy"
                name="cloudy"
                checked={animalData.cloudy}
                onChange={handleChange}
              />
              <label htmlFor="cloudy">Cloudy</label>
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-button">Save</button>
              <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnimalEditForm;