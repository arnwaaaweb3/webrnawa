import React, { useState } from 'react';
import DarkVeil from '../components/DarkVeil';
import VariableProximity from '../components/VariableProximity';
import StaggeredMenu from "../components/StaggeredMenu";
import styles from "../styles/StaggeredMenu.module.css";

const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const variableProximityContainerRef = React.useRef<HTMLDivElement>(null);

  const menuItems = [
    { text: 'Home', url: '/' },
    { text: 'Me', url: '/me' },
    { text: 'Projects', url: '/projects' },
    { text: 'Memo', url: '/memo' },
    { text: 'Documentation', url: '/doc'},
    { text: 'Socials', url: '/socials' },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#090040', position: 'relative' }}>
      
      {/* Menu Panel */}
      <StaggeredMenu
        isOpen={menuOpen}
        position="right"
        items={menuItems}
      />

      {/* CONTENT WRAPPER → apply blur */}
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
        {/* Background effect */}
        <DarkVeil />

        {/* Variable text */}
        <div
          ref={variableProximityContainerRef}
          style={{
            zIndex: 10,
            position: 'absolute',
            top: '32.5%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontFamily: 'Lexend, sans-serif',
            fontWeight: 600,
            display: 'inline-block',
            fontSize: 'clamp(1rem, 4.5vw, 3rem)',
            textAlign: 'center',
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
        </div>
      </div>

      {/* Tombol Toggle Menu (Ditinggalkan) */}
      <button
        onClick={() => setMenuOpen(prev => !prev)}
        className={styles.menuToggle}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};

export default HomePage;