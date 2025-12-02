import React, { useState } from 'react';
import DarkVeil from '../components/DarkVeil';
import StaggeredMenu from "../components/StaggeredMenu";
import AnimatedTabs from "../components/AnimatedTabs";
import SignatureNawaCard from "../components/SignatureNawaCard";
import menuStyles from "../styles/StaggeredMenu.module.css";
import styles from "../styles/ConnectPage.module.css";
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
    <div className={styles.pageWrapper}>
      <StaggeredMenu isOpen={menuOpen} position="right" items={menuItems} />
      <div className={`${styles.contentBlur} ${menuOpen ? styles.menuOpen : ''}`}>
        <DarkVeil hueShift={CONNECT_HUE} />
        <div className={styles.pageContent}>
          <h1 className={styles.heading}>
            Let's Connect!
          </h1>
          <p className={styles.description}>
            Don't hesitate to say Hi and leave me message on:
          </p>
          <div className={styles.contentRow}>
            <div className={styles.tabsContainer}>
              <AnimatedTabs />
            </div>
            <div className={styles.cardContainer}>
              <SignatureNawaCard
                name="Nawa"
                role="Public Relations Officer"
                image="/profil-nawa.jpg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        © {new Date().getFullYear()} Nawa. All Rights Reserved.
      </div>
      <button onClick={() => setMenuOpen(p => !p)} className={menuStyles.menuToggle}>
        {menuOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};
export default ConnectPage;