// src/App.tsx (Perbaikan)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage'; 
import ConnectPage from './pages/ConnectPage'; 
import DocsPage from './pages/DocsPage';
import ProjectsPage from './pages/ProjectsPage';

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
          {/* 🔥 TAMBAH: Route untuk halaman baru */}
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          {/* Kamu dapat menambahkan Route untuk path lain yang ada di menu atau button configs, seperti /me, /memo, /socials, dll. */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;