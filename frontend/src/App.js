import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { PicturePage } from './Picture';
import Menu from './Menu'
import RegisterPage from './Register';

const Home = () => {
  return <Menu />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/picture' element={<PicturePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
