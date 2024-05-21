import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import Particle from './components/Particle';
import BackgroundVideo from './components/BackgroundVideo';
import { getAllAnimals, createAnimal, deleteAnimal } from './animals/api';
import AnimalCards from './animals/Animals';
import AnimalForm from './animals/AnimalForm';

function App() {
  const [latestWeather, setLatestWeather] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);

  // Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyBme5hGShcyPNOfRCl0HgSNJU5MmOfbg8Q',
    authDomain: 'weather-app-b3426.firebaseapp.com',
    databaseURL: 'https://weather-app-b3426-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'weather-app-b3426',
    storageBucket: 'weather-app-b3426.appspot.com',
    messagingSenderId: '1094701237609',
    appId: '1:1094701237609:web:64934d37312598df2b29f8',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  useEffect(() => {
    const weatherRef = ref(db, 'Status');
    onValue(weatherRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Fetched data:', data); // Check if data is fetched
      if (data) {
        const latestData = Object.values(data).pop();
        console.log('Latest data:', latestData); // Check if latest data is extracted
        setLatestWeather(latestData);
      }
    });

    return () => {
      // Clean up Firebase listener
      off(weatherRef);
    };
  }, [db]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await getAllAnimals();
        setAnimals(data);
      } catch (error) {
        console.error('Failed to fetch animals', error);
      }
    };

    fetchAnimals();
  }, []);

  const handleCreateAnimal = async (animalData) => {
    try {
      const newAnimal = await createAnimal(animalData);
      setAnimals([...animals, newAnimal]);
    } catch (error) {
      console.error('Failed to create animal', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setShowForm(false); // Close the form when toggling edit mode
  };

  const handleAddAnimalClick = () => {
    setShowForm(true);
  };

  const handleDeleteClick = (animalId) => {
    setAnimalToDelete(animalId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAnimal(animalToDelete);
      setAnimals(animals.filter(animal => animal.id !== animalToDelete));
      setAnimalToDelete(null);
    } catch (error) {
      console.error('Failed to delete animal', error);
    }
  };

  const handleCancelDelete = () => {
    setAnimalToDelete(null);
  };

  return (
    <>
      <Particle />
      <BackgroundVideo isRaining={latestWeather && latestWeather.rain} />
      <h1>Weather Data</h1>
      <table className="weather-table">
        <thead>
          <tr>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Date & Time</th>
            <th>Luminosity</th>
            <th>Rain</th>
          </tr>
        </thead>
        <tbody>
          {latestWeather && (
            <tr>
              <td>{latestWeather.temperature}</td>
              <td>{latestWeather.humidity}</td>
              <td>{latestWeather.datetime}</td>
              <td>{latestWeather.luminosity}</td>
              <td>{latestWeather.rain ? 'Yes' : 'No'}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h1>Animals</h1>
      <button
        className={`edit-button ${isEditing ? 'cancel-button' : ''}`}
        onClick={handleEditClick}
      >
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {showForm && (
        <AnimalForm onCreateAnimal={handleCreateAnimal} onClose={() => setShowForm(false)} />
      )}
      <AnimalCards
        animals={animals}
        isEditing={isEditing}
        onAddAnimalClick={handleAddAnimalClick}
        onDeleteClick={handleDeleteClick}
      />
      {animalToDelete && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <h2>Are you sure you want to delete this animal card?</h2>
            <button onClick={handleConfirmDelete}>Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
