// src/pages/ServicesPage.tsx

import React, { useState } from "react";
import DarkVeil from "../components/DarkVeil";
import StaggeredMenu from "../components/StaggeredMenu";
import styles from "../styles/StaggeredMenu.module.css";

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
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#090040",
        position: "relative",
      }}
    >
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
        <DarkVeil hueShift={SERVICES_HUE} />

        <div
          style={{
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            color: "white",
            fontFamily: "Lexend, sans-serif",
            padding: "10vh 5vw",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.05em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {HEADING_TEXT}
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              maxWidth: "700px",
              opacity: 1,
              marginTop: "20px",
            }}
          >
            Here is the list of what services I can offer to you:
          </p>

          {/* Container Gambar */}
          <div
            style={{
              width: "100%",
              maxWidth: "1050px",
              minHeight: "290px",
              backgroundImage: `url(${serviceSlides[currentIndex].img})`,
              backgroundSize: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "50px",
              marginTop: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "20px",
              marginLeft: "70px",
              boxShadow: "0 0 10px rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              position: "relative",
              overflow: "visible",
              transition: "background 0.3s ease-out",
            }}
          >
            {/* CTA Button */}
            <button
              style={{
                position: "absolute",
                bottom: "35px",
                left: "40px",
                background: getCTAColor(currentIndex),
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                padding: "10px 22px",
                borderRadius: "16px",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: "0.3px",
                cursor: "pointer",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                transition: "background 0.3s ease, transform 0.2s ease",
              }}
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

            {/* Tombol Kiri */}
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "-80px",
                top: "32.5px",
                height: "80%",
                width: "60px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
                color: "white",
                cursor: "pointer",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                transition: "background 0.3s ease, transform 0.2s ease",
                zIndex: 20,
              }}
            >
              ‹
            </button>

            {/* Tombol Kanan */}
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "-80px",
                top: "32.5px",
                height: "80%",
                width: "60px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                color: "white",
                cursor: "pointer",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                transition: "background 0.3s ease, transform 0.2s ease",
                zIndex: 20,
              }}
            >
              ›
            </button>
          </div>
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
          zIndex: 11,
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

export default ServicesPage;
