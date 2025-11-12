// src/pages/ProjectsPage.tsx

import React, { useState } from 'react';
import DarkVeil from '../components/DarkVeil';
import StaggeredMenu from "../components/StaggeredMenu";
import styles from "../styles/StaggeredMenu.module.css"; 

const ProjectsPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const PROJECTS_HUE = 270; // Ungu untuk tema Projects

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
        <DarkVeil hueShift={PROJECTS_HUE} />
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
              fontSize: 'clamp(2rem, 5vw, 4rem)', 
              fontWeight: 800, 
              color: `hsl(${PROJECTS_HUE}, 80%, 70%)`,
              marginBottom: '0.5em', 
            }}>
            My Projects & Crafts
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: '500px', opacity: 0.8 }}>
            Lihat apa saja yang sudah aku bangun, mulai dari Smart Contract sampai dApp favoritku.
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

export default ProjectsPage;