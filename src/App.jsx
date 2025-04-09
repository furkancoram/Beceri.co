import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile'; // Düzenleme ekranı
import ProfilePage from './pages/ProfilePage'; // Twitter tarzı görünüm

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kayit" element={<Register />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/profilim" element={<ProfilePage />} />
        {/* 🔜 İleride: Public profil ve keşfet vs. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
