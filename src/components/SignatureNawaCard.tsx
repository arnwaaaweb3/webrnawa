// src/components/SignatureNawaCard.tsx

import React from "react";
import styles from "../styles/SignatureNawaCard.module.css";

interface Props {
  name: string;
  role: string;
  image: string;
  isMobile?: boolean; 
}

const SignatureNawaCard: React.FC<Props> = ({ name, role, image, isMobile }) => {
  return (
    <div className={styles.cardWrapper} data-ismobile={isMobile ? "true" : "false"}> 
      <div className={styles.card}>
        <div className={styles.left}>
          <img src={image} className={styles.photo} alt={name} />
        </div>
        <div className={styles.right}>
        <div  className={styles.name}>{name}</div>
        <div className={styles.role}>{role}</div>
        <a href="/me" className={styles.seeMoreLink}>
          <p className={styles.seeMoreText}>See more about myself</p>
        </a>
        </div>
      </div>
    </div>
  );
};

export default SignatureNawaCard;