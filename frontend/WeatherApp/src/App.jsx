import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import Particle from './components/Particle';
import BackgroundVideo from './components/BackgroundVideo';
import { getAllAnimals, createAnimal, deleteAnimal, editAnimal } from './animals/api';

function App() {

  const [latestWeather, setLatestWeather] = useState(null);
  const [animals, setAnimals] = useState([]);

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
      
      <div class="card">
        <div class="card-image"></div>

        <div class="card-name">Animal</div>

        <div class="card-stats">
          <div class="stat temperature">
          <div class="value">minTemperature - maxTemperature (°C)</div>
          </div>
          <div class="stat humidity">
          <div class="value">minHumidity - maxHumidity (%)</div>
          </div>
        </div>
      </div>



      <table className="animal-cards">
        <thead>
          <tr>
            <th>Name</th>
            <th>Min Temperature (°C)</th>
            <th>Max Temperature (°C)</th>
            <th>Min Humidity (%)</th>
            <th>Max Humidity (%)</th>
            <th>Rain</th>
            <th>Sunny</th>
            <th>Cloudy</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.minTemperature}</td>
              <td>{animal.maxTemperature}</td>
              <td>{animal.minHumidity}</td>
              <td>{animal.maxHumidity}</td>
              <td>{animal.rain ? 'Yes' : 'No'}</td>
              <td>{animal.sunny ? 'Yes' : 'No'}</td>
              <td>{animal.cloudy ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}

export default App;