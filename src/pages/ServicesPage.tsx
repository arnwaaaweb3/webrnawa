// src/pages/ServicesPage.tsx

import React, { useState } from "react";
import DarkVeil from "../components/DarkVeil";
import StaggeredMenu from "../components/StaggeredMenu";
import menuStyles from "../styles/StaggeredMenu.module.css";
import styles from "../styles/ServicesPage.module.css";

const ServicesPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const menuItems = [
    { text: "Home", url: "/" },
    { text: "Me", url: "/me" },
    { text: "Projects", url: "/projects" },
    { text: "Memo", url: "/memo" },
    { text: "Documentation", url: "/doc" },
    { text: "Socials", url: "/socials" },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const SERVICES_HUE = 35;
  const HEADING_TEXT = "What Can I Do For You?";

  const serviceSlides = [
    { img: "/service-fun.png", cta: "Take a look! →" },
    { img: "/service-1.png", cta: "See more details" },
    { img: "/service-2.png", cta: "See more details" },
    { img: "/service-3.png", cta: "See more details" },
    { img: "/service-4.png", cta: "See more details" },
    { img: "/service-5.png", cta: "See more details" },
  ];

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % serviceSlides.length);

  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + serviceSlides.length) % serviceSlides.length
    );

  // Warna CTA berdasarkan index
  const getCTAColor = (index: number) => {
    if (index === 3) return "#5b532c";
    if (index === 4) return "#4682a9";
    return "rgba(255,255,255,0.1)";
  };

  return (
    <div className={styles.pageWrapper}>
      <StaggeredMenu isOpen={menuOpen} position="right" items={menuItems} />

      <div className={`${styles.contentBlur} ${menuOpen ? styles.menuOpen : ''}`}>
        <DarkVeil hueShift={SERVICES_HUE} />

        <div className={styles.pageContent}>
          <h1 className={styles.heading}>
            {HEADING_TEXT}
          </h1>

          <p className={styles.description}>
            Here is the list of what services I can offer to you:
          </p>

          <div
            className={styles.sliderContainer}
            style={{ backgroundImage: `url(${serviceSlides[currentIndex].img})` }}
          >
            <button
              className={styles.ctaButton}
              style={{ background: getCTAColor(currentIndex) }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background =
                  currentIndex === 3
                    ? "#6a5f34"
                    : currentIndex === 4
                    ? "#5a98c2"
                    : "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background =
                  getCTAColor(currentIndex))
              }
            >
              {serviceSlides[currentIndex].cta}
            </button>

            <button
              onClick={prevImage}
              className={`${styles.navButton} ${styles.navButtonLeft}`}
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className={`${styles.navButton} ${styles.navButtonRight}`}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        © {new Date().getFullYear()} Nawa. All Rights Reserved.
      </div>

      <button onClick={toggleMenu} className={menuStyles.menuToggle}>
        {menuOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};

export default ServicesPage;
