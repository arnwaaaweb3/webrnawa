// src/pages/ConnectPage.tsx

import React, { useState } from 'react';
import DarkVeil from '../components/DarkVeil';
import StaggeredMenu from "../components/StaggeredMenu";
import AnimatedTabs from "../components/AnimatedTabs";
import styles from "../styles/StaggeredMenu.module.css"; 

const ConnectPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const CONNECT_HUE = 60; 

  const menuItems = [
    { text: 'Home', url: '/' },
    { text: 'Me', url: '/me' },
    { text: 'Projects', url: '/projects' },
    { text: 'Memo', url: '/memo' },
    { text: 'Documentation', url: '/doc' },
    { text: 'Socials', url: '/socials' },
  ];

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#090040', position: 'relative' }}>
      <StaggeredMenu isOpen={menuOpen} position="right" items={menuItems} />
      
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          filter: menuOpen ? "blur(6px)" : "none",
          transition: "filter 0.4s ease",
        }}
      >
        <DarkVeil hueShift={CONNECT_HUE} />
        
        <div
          style={{
            zIndex: 10,
            position: 'absolute',
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            // 🔥 UPDATED: Container rata kiri (sesuai request)
            alignItems: 'flex-start', 
            justifyContent: 'center', // Tetap center secara vertikal agar enak dilihat
            color: 'white',
            fontFamily: 'Lexend, sans-serif',
            padding: '0 5vw', // Padding kiri-kanan saja, atas-bawah diurus justifyContent
            textAlign: 'left', // Teks rata kiri
          }}
        >
          {/* 🔥 UPDATED: Style H1 mengikuti rules ServicesPage persis */}
          <h1 style={{ 
              fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.05em",
              lineHeight: 1.2,
              margin: 0,
            }}>
            Let's Connect!
          </h1>
          
          <p style={{ 
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              maxWidth: "700px",
              opacity: 0.8,
              marginTop: "15px",
              marginBottom: "20px", 
            }}>
            Don't hesitate to say Hi and leave me message on:
          </p>

          {/* Tabs Component */}
          <AnimatedTabs />

        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15px",
          width: "100%",
          textAlign: "center",
          color: "rgba(255,255,255,0.7)",
          fontFamily: "Lexend, sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "0.5px",
          userSelect: "none",
          zIndex: 11
        }}
      >
        © {new Date().getFullYear()} Nawa. All Rights Reserved.
      </div>
      <button onClick={toggleMenu} className={styles.menuToggle}>
        {menuOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};

export default ConnectPage;