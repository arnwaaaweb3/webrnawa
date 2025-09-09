// src/pages/Homepage.tsx
import React from 'react';
import DarkVeil from '../components/DarkVeil';
import styles from '../styles/HomePage.module.css'; 

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}> {/* Gunakan class dari CSS Modules */}
      <DarkVeil />
    </div>
  );
};

export default HomePage;