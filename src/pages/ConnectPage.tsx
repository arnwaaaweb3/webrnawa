// src/pages/ConnectPage.tsx

import React, { useState } from 'react';
import DarkVeil from '../components/DarkVeil';
import StaggeredMenu from "../components/StaggeredMenu";
import styles from "../styles/StaggeredMenu.module.css"; 

const ConnectPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const CONNECT_HUE = 180; // Biru/Cyan untuk tema Connect

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
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            color: 'white',
            fontFamily: 'Lexend, sans-serif',
            padding: '2.5vh 5vw',
            textAlign: 'left',
          }}
        >
          <h1 style={{ 
              fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.05em",
              lineHeight: 1.2,
              margin: 0,
              marginTop: "40px",
            }}>
            Let's Connect!
          </h1>
          <p style={{ 
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              maxWidth: "700px",
              opacity: 1,
              marginTop: "20px", 
            }}>
            Dont hesitate to say Hi and leave me message on:
          </p>
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