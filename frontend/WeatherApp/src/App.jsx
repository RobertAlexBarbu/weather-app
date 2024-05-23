// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Particle from './components/Particle';
import BackgroundVideo from './components/BackgroundVideo';
import { getAllAnimals, createAnimal, deleteAnimal, editAnimal } from './animals/api';
import AnimalCards from './animals/Animals';
import AnimalForm from './animals/AnimalForm';
import ConfirmationModal from './animals/ConfirmationModal';
import AnimalEditForm from './animals/AnimalEditForm';

function App() {
  const [latestWeather, setLatestWeather] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);
  const [animalToEdit, setAnimalToEdit] = useState(null);

  const firebaseConfig = {
    apiKey: 'AIzaSyBme5hGShcyPNOfRCl0HgSNJU5MmOfbg8Q',
    authDomain: 'weather-app-b3426.firebaseapp.com',
    databaseURL: 'https://weather-app-b3426-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'weather-app-b3426',
    storageBucket: 'weather-app-b3426.appspot.com',
    messagingSenderId: '1094701237609',
    appId: '1:1094701237609:web:64934d37312598df2b29f8',
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  useEffect(() => {
    const weatherRef = ref(db, 'Status');
    onValue(weatherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const latestData = Object.values(data).pop();
        setLatestWeather(latestData);
      }
    });

    return () => {
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

  const uploadImage = async (file, animalName) => {
    const storage = getStorage(app);
    const storageReference = storageRef(storage, `animal_images/${animalName}`);
    await uploadBytes(storageReference, file);
    const url = await getDownloadURL(storageReference);
    console.log(`Image uploaded successfully: ${url}`);
    return url;
  };


  const downloadImageUrl = async (animalName) => {
    const storage = getStorage(app);
    const storageReference = storageRef(storage, `animal_images/${animalName}`);
    try {
      const url = await getDownloadURL(storageReference);
      console.log(`Image URL downloaded successfully: ${url}`);
      return url;
    } catch (error) {
      console.error(`Failed to download image URL for ${animalName}`, error);
      return null;
    }
  };

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
    setShowForm(false);
  };

  const handleAddAnimalClick = () => {
    setShowForm(true);
  };

  const handleDeleteClick = (animal) => {
    setAnimalToDelete(animal);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const animalToDeleteName = animalToDelete.name;
      await deleteAnimal(animalToDelete.id);
      // Delete image from Firebase Storage
      const storage = getStorage(app);
      const storageReference = storageRef(storage, `animal_images/${animalToDeleteName}`);
      await deleteObject(storageReference);

      setAnimals(animals.filter((a) => a.id !== animalToDelete.id));
      setShowModal(false);
      setAnimalToDelete(null);
      console.log('"' + animalToDeleteName + '" ' + 'has been deleted');
    } catch (error) {
      console.error('Failed to delete animal', error);
    }
  };

  const handleEditAnimal = async (animalData) => {
    try {
      const updatedAnimal = await editAnimal(animalData);
      setAnimals(animals.map((animal) => (animal.id === updatedAnimal.id ? updatedAnimal : animal)));
      setAnimalToEdit(null);
    } catch (error) {
      console.error('Failed to update animal', error);
    }
  };

  const handleEditButtonClick = (animal) => {
    setAnimalToEdit(animal);
  };

  const handleCloseEditForm = () => {
    setAnimalToEdit(null);
  };

  return (
    <>
      <Particle />
      <BackgroundVideo luminosity={latestWeather && latestWeather.luminosity} isRaining={latestWeather && latestWeather.rain} />
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
        <AnimalForm onCreateAnimal={handleCreateAnimal} onClose={() => setShowForm(false)} uploadImage={uploadImage} />
      )}
      {animalToEdit && (
        <AnimalEditForm
          animal={animalToEdit}
          onEditAnimal={handleEditAnimal}
          onClose={handleCloseEditForm}
          uploadImage={uploadImage}
        />
      )}
      <AnimalCards animals={animals} isEditing={isEditing} onAddAnimalClick={handleAddAnimalClick} onDeleteClick={handleDeleteClick} onEditButtonClick={handleEditButtonClick} downloadImageUrl={downloadImageUrl} />
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default App;