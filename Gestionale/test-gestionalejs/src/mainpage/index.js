import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
// import App from './App.js';
import NavBar from '../navbar/NavBar.js';
import MainPage from './main.js';

const root = ReactDOM.createRoot(document.getElementById('mainpage'));
root.render(
  <React.StrictMode>
    <NavBar />
    <MainPage />
  </React.StrictMode>
);
