import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { PicturePage } from './Picture';

const Home = () => {
  return <div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
}

const Secondary = () => {
  return <div>
    This is another link
  </div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/second' element={<Secondary />}></Route>
        <Route path='/picture' element={<PicturePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
