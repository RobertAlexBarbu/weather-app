import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBme5hGShcyPNOfRCl0HgSNJU5MmOfbg8Q',
  authDomain: 'weather-app-b3426.firebaseapp.com',
  databaseURL:
    'https://weather-app-b3426-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'weather-app-b3426',
  storageBucket: 'weather-app-b3426.appspot.com',
  messagingSenderId: '1094701237609',
  appId: '1:1094701237609:web:64934d37312598df2b29f8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const starCountRef = ref(db, '/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log('Reading data');
  console.log(data);
});

function writeData() {
  set(ref(db, '/'), {data: "MyData"});
}
setInterval(writeData, 1500);
console.log('Hello world!');