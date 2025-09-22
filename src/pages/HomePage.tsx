// src/pages/HomePage.tsx
import React, { useRef } from 'react';
import DarkVeil from '../components/DarkVeil';
import styles from '../styles/HomePage.module.css';
import VariableProximity from '../components/VariableProximity';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.container} ref={containerRef}>
      <Header />
      <DarkVeil />
      <div className={styles.titleContainer}>
        <VariableProximity
          label={'Hello! My Name is Nawa'}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </div>
    </div>
  );
};

export default HomePage;