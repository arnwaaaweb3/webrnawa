// src/components/AnimatedTabs.tsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/AnimatedTabs.module.css";
import { 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaDiscord, 
  FaFacebook, 
  FaEnvelope 
} from "react-icons/fa"; // Pastikan react-icons terinstall

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// Helper component untuk konten dummy biar kodenya rapi
const DummyContent = ({ title, desc, icon, color }: { title: string, desc: string, icon: React.ReactNode, color: string }) => (
  <div className={styles.dummyCard}>
    <div className={styles.iconLarge} style={{ color }}>
      {icon}
    </div>
    <h2 className={styles.dummyTitle} style={{ color }}>{title}</h2>
    <p className={styles.dummyDesc}>{desc}</p>
    {/* Nanti tombol connect/follow bisa ditaruh di sini */}
  </div>
);

const defaultTabs: Tab[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: <FaInstagram />,
    content: <DummyContent 
      title="Follow on Instagram" 
      desc="Lihat update visual dan story sehari-hari Nawa di sini." 
      icon={<FaInstagram />} 
      color="#E1306C" 
    />
  },
  {
    id: "twitter",
    label: "Twitter X",
    icon: <FaTwitter />,
    content: <DummyContent 
      title="Connect on X" 
      desc="Tempat Nawa ngetweet soal Web3, tech, dan random thoughts." 
      icon={<FaTwitter />} 
      color="#1DA1F2" 
    />
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedin />,
    content: <DummyContent 
      title="Connect Professionally" 
      desc="Mari berjejaring secara profesional dan bahas peluang kolaborasi." 
      icon={<FaLinkedin />} 
      color="#0077B5" 
    />
  },
  {
    id: "discord",
    label: "Discord",
    icon: <FaDiscord />,
    content: <DummyContent 
      title="Join the Community" 
      desc="Ngobrol santai bareng komunitas di server Discord." 
      icon={<FaDiscord />} 
      color="#5865F2" 
    />
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: <FaFacebook />,
    content: <DummyContent 
      title="Facebook" 
      desc="Stay connected with friends and family." 
      icon={<FaFacebook />} 
      color="#1877F2" 
    />
  },
  {
    id: "email",
    label: "Email",
    icon: <FaEnvelope />,
    content: <DummyContent 
      title="Send a Message" 
      desc="Butuh diskusi lebih serius? Kirim email langsung ke Nawa." 
      icon={<FaEnvelope />} 
      color="#EA4335" 
    />
  },
];

const AnimatedTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabs[0].id);

  return (
    <div className={styles.container}>
      {/* Tab Navigation */}
      <div className={styles.tabList}>
        {defaultTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={styles.tabButton}
            data-active={activeTab === tab.id}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-pill"
                className={styles.activeBackground}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 2 }}>
              {tab.icon} {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content Panel */}
      <div className={styles.contentContainer}>
        <AnimatePresence mode="wait">
          {defaultTabs.map((tab) => (
            activeTab === tab.id ? (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className={styles.contentWrapper}
              >
                {tab.content}
              </motion.div>
            ) : null
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedTabs;