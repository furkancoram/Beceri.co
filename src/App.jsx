import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';         // Profil düzenleme sayfası
import ProfilePage from './pages/ProfilePage'; // Twitter tarzı profil sayfası

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kayit" element={<Register />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/profilim" element={<ProfilePage />} />
        {/* Giriş sayfası ekleyeceğimizde buraya gelir */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
