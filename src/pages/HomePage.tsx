// src/pages/HomePage.tsx (Perbaikan)

import React, { useState } from 'react';
import { motion } from 'motion/react';
// 🔥 TAMBAH: Import useNavigate untuk navigasi programatik
import { useNavigate } from 'react-router-dom'; 
import DarkVeil from '../components/DarkVeil';
import VariableProximity from '../components/VariableProximity';
import StaggeredMenu from "../components/StaggeredMenu";
import RotatingText from "../components/RotatingText";
import GlareHover from "../components/GlareHover";

import styles from "../styles/StaggeredMenu.module.css";


const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const variableProximityContainerRef = React.useRef<HTMLDivElement>(null);
  
  // 🔥 TAMBAH: Inisialisasi hook useNavigate
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', url: '/' },
    { text: 'Me', url: '/me' },
    { text: 'Projects', url: '/projects' },
    { text: 'Memo', url: '/memo' },
    { text: 'Documentation', url: '/doc' },
    { text: 'Socials', url: '/socials' },
  ];

  const rotatingTexts = [
    'Public Relations Officer',
    'Web3 Enthusiast',
    'Smart Contract Developer',
    'dApp Builder',
    'Long-Term Investor',
  ];

  const toggleMenu = () => setMenuOpen(prev => !prev);

  // ✅ Button image configs
  const buttonConfigs = [
    {
      id: 1,
      url: "/services",
      normal: "/services.png",
      hover: "/services-hover.png",
    },
    {
      id: 2,
      url: "/connect",
      normal: "/connect.png",
      hover: "/connect-hover.png",
    },
    {
      id: 3,
      url: "/docs",
      normal: "/docs.png",
      hover: "/docs-hover.png",
    },
    {
      id: 4,
      url: "/projects",
      normal: "/projects.png",
      hover: "/projects-hover.png",
    },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#090040', position: 'relative' }}>

      <StaggeredMenu
        isOpen={menuOpen}
        position="right"
        items={menuItems}
      />

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
        <DarkVeil />

        <div
          style={{
            zIndex: 10,
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5vh 0',
          }}
        >

          {/* ... (Teks dan VariableProximity tidak berubah) ... */}
          <div
            ref={variableProximityContainerRef}
            style={{
              color: 'white',
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 600,
              display: 'inline-block',
              fontSize: 'clamp(1rem, 4.5vw, 3rem)',
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            <VariableProximity
              label={'Hello! My Name is Nawa'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              radius={100}
              falloff="linear"
              containerRef={variableProximityContainerRef}
            />

            <div
              style={{
                marginTop: '12.5px',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              I&apos;m a&nbsp;
              <RotatingText
                texts={rotatingTexts}
                rotationInterval={3000}
                staggerDuration={0.05}
                style={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 600,
                  color: '#090040',
                  backgroundColor: '#ff85e5',
                  padding: '0.1em 0.5em',
                  borderRadius: '0.2em',
                  display: 'inline-flex',
                } as React.CSSProperties} // Cast ditambahkan untuk kehati-hatian tipe
              />
            </div>
          </div>

          {/* ✅ BUTTON GRID - PERBAIKAN FUNGSI ONCLICK */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '25px',
            width: 'min(100vw, 700px)',
            justifyContent: 'center',
          }}>
            {buttonConfigs.map((button) => (
              <GlareHover 
                key={button.id}
                glareColor="#ff85e5"
                glareOpacity={0.6}
                glareAngle={-30}
                glareSize={200}
                transitionDuration={300}
              >
                <motion.button
                  // 🔥 FIX: Memicu navigasi ke URL tombol
                  onClick={() => navigate(button.url)}
                  style={{
                    backgroundImage: `url(${button.normal})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "25px",
                    border: "1px solid #5227ff",
                    cursor: "pointer",
                    width: "clamp(150px, 18vw, 240px)",
                    height: "clamp(150px, 18vw, 240px)",
                    aspectRatio: "1 / 1",
                  } as React.CSSProperties}
                  // 🔥 MENGGUNAKAN FRAMER MOTION UNTUK EFEK SCALE
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 10px rgba(255, 133, 229, 0.5)", // Shadow efek glow
                    transition: { duration: 0.25 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 } 
                  }}
                  // MENGGANTI GAMBAR DENGAN LOGIKA MANUAL UNTUK URUTAN EFEK
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage = `url(${button.hover})`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage = `url(${button.normal})`;
                  }}
                />
              </GlareHover>
            ))}
          </div>

        </div>
      </div>
      {/* FOOTER */}
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
        }}
      >
        © {new Date().getFullYear()} Nawa. All Rights Reserved.
      </div>
      <button
        onClick={toggleMenu}
        className={styles.menuToggle}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};

export default HomePage;