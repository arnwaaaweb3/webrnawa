import React, { useState } from 'react';
import DarkVeil from '../components/DarkVeil';
import StaggeredMenu from "../components/StaggeredMenu";
import AnimatedTabs from "../components/AnimatedTabs";
import SignatureNawaCard from "../components/SignatureNawaCard";
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
        {/* PAGE CONTENT */}
        <div
          style={{
            zIndex: 10,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'Lexend, sans-serif',
            padding: '0 5vw',
            textAlign: 'left',
          }}
        >
          <h1 style={{
            fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            lineHeight: 1.2,
            margin: 0,
          }}>
            Let's Connect!
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
            maxWidth: "700px",
            opacity: "0.8",
            marginTop: "15px",
            marginBottom: "5px",
          }}>
            Don't hesitate to say Hi and leave me message on:
          </p>
          {/* ROW: Tabs di kiri, Card di kanan */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "40px",
              marginTop: "30px",
              flexWrap: "wrap", // biar responsive
            }}
          >
            {/* LEFT SIDE */}
            <div style={{ minWidth: "400px", flex: 1 }}>
              <AnimatedTabs />
            </div>
            {/* RIGHT SIDE */}
            {/* RIGHT SIDE (CARD) - Fixed 16rem */}
            <div style={{ flex: "0 0 16rem", borderRadius: "12px",  }}>
              <SignatureNawaCard
                name="Nawa"
                role="Public Relations Officer"
                image="/profil-nawa.jpg"
              />
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
          zIndex: 11,
        }}
      >
        © {new Date().getFullYear()} Nawa. All Rights Reserved.
      </div>
          </div>
        </div>
      </div>
      <button onClick={() => setMenuOpen(p => !p)} className={styles.menuToggle}>
        {menuOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};
export default ConnectPage;