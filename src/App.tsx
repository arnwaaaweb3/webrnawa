// src/App.tsx (Perbaikan)
import React from 'react';
// 🔥 TAMBAH: Import komponen routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import HomePage from './pages/HomePage';
// 🔥 TAMBAH: Import ServicesPage
import ServicesPage from './pages/ServicesPage'; // Asumsi file ServicesPage.tsx ada di folder pages

const App: React.FC = () => {
  return (
    // 🔥 BUNGKUS aplikasi dengan BrowserRouter
    <BrowserRouter>
      <div className="App">
        {/* 🔥 DEFINISIKAN Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Tambahkan route untuk ServicesPage */}
          <Route path="/services" element={<ServicesPage />} /> 
          {/* Tambahkan rute lain jika ada, misalnya /connect, /docs, /projects */}
          {/* Contoh: <Route path="/connect" element={<ConnectPage />} /> */}
          {/* Anda dapat menambahkan Route untuk path lain yang ada di menu atau button configs */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;