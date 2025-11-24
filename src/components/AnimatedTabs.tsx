// src/components/AnimatedTabs.tsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/AnimatedTabs.module.css";
import { 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaDiscord, 
  FaFacebook, 
  FaEnvelope,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
  FaSun,    
  FaMoon    
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";

// --- 1. KOMPONEN INSTAGRAM (API REAL + SLIDER) ---
const InstagramTabContent = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const token = process.env.REACT_APP_IG_TOKEN; 

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    if (!token) return;

    const fetchInstagramPosts = async () => {
      try {
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}&limit=5`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Gagal ambil data IG:", error);
      }
    };

    fetchInstagramPosts();
  }, [token]);

  const handleNext = () => setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  const activePost = posts[currentIndex];

  return (
    <div className={styles.dummyCard}>
      {/* KIRI: Preview Box */}
      <div className={styles.previewBox} style={{ overflow: "hidden", padding: 0, border: activePost ? "none" : "2px dashed rgba(255,255,255,0.1)", position: 'relative' }}>
        {activePost ? (
          <>
            <div className={styles.navOverlay}>
              <button onClick={handlePrev} className={styles.navButton}><FaChevronLeft size={12} /></button>
              <button onClick={handleNext} className={styles.navButton}><FaChevronRight size={12} /></button>
            </div>
            <AnimatePresence mode="wait">
              <motion.a 
                key={activePost.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                href={activePost.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ width: "100%", height: "100%", display: "block" }}
              >
                <img 
                  src={activePost.media_type === "VIDEO" ? activePost.thumbnail_url : activePost.media_url} 
                  alt={activePost.caption || "Instagram Post"} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.a>
            </AnimatePresence>
          </>
        ) : (
          <div style={{ textAlign: "center", opacity: 0.5 }}>
            <FaImage size={40} style={{ marginBottom: 10 }} />
            <p style={{ fontSize: "0.8rem", margin: 0 }}>Loading / No Data</p>
          </div>
        )}
      </div>

      {/* KANAN: Text Info */}
      <div className={styles.textGroup}>
        <div className={styles.iconLarge}><FaInstagram /></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePost ? activePost.id : "empty"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
          >
            <h2 className={styles.dummyTitle}>{activePost ? "Latest Updates" : "Instagram"}</h2>
            <p className={styles.dummyDesc}>
                {activePost ? (
                    <span>
                        "{truncate(activePost.caption, 80)}" <br/>
                        <span style={{ opacity: 0.6, fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                           Post {currentIndex + 1} of {posts.length}
                        </span>
                        <a href={activePost.permalink} target="_blank" rel="noreferrer" style={{ color: "#2196F3", fontSize: "0.8rem", textDecoration: "none", marginTop: "5px", display:"inline-block" }}>
                            View Post &rarr;
                        </a>
                    </span>
                ) : "Check out my posts on Instagram!"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 2. KOMPONEN TWITTER (MANUAL DATA + SLIDER) ---
const TwitterTabContent = () => {
  // 🔽 EDIT TWEET KAMU DISINI 🔽
  const tweets = [
    {
      id: 1,
      text: "Buy (₿) Bitcoin. The only right way to hold your assets value",
      date: "Nov 22, 2024: 9:31 A.M",
      link: "https://x.com/rnawaaaaa/status/1859786857095233566",
      image: { url: "./assets/bitcoin.jpg" }
    },
    {
      id: 2,
      text: "Simplicity is the ultimate sophistication. Trying to keep my code clean and my design cleaner. ✨",
      date: "Pinned Tweet",
      link: "https://twitter.com"
    },
    {
      id: 3,
      text: "Just dropped a new project! Check out the Projects tab to see what I've been cooking. 🍳👨‍💻",
      date: "Recent News",
      link: "https://twitter.com"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev === tweets.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? tweets.length - 1 : prev - 1));

  const activeTweet = tweets[currentIndex];

  return (
    <div className={styles.dummyCard}>
      {/* KIRI: Preview Box (Twitter Logo Visual) */}
      <div className={styles.previewBox} style={{ position: 'relative', border: "none", overflow: 'hidden' }}>
        
        <div className={styles.navOverlay}>
          <button onClick={handlePrev} className={styles.navButton}><FaChevronLeft size={12} /></button>
          <button onClick={handleNext} className={styles.navButton}><FaChevronRight size={12} /></button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
             key={activeTweet.id}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             transition={{ duration: 0.3 }}
             style={{ 
               width: "100%", 
               height: "100%", 
               display: "flex", 
               alignItems: "center", 
               justifyContent: "center",
               background: "rgba(29, 161, 242, 0.05)", // Biru tipis banget
             }}
          >
             <FaTwitter size={80} color="#1DA1F2" style={{ opacity: 0.8 }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* KANAN: Isi Tweet (Style disamakan dengan IG) */}
      <div className={styles.textGroup}>
        <div className={styles.iconLarge} style={{ color: "#1DA1F2" }}><FaTwitter /></div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTweet.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
          >
            {/* Judul pakai warna biru Twitter */}
            <h2 className={styles.dummyTitle} style={{ color: "#1DA1F2" }}>On The Timeline</h2>
            
            <p className={styles.dummyDesc} style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
                "{activeTweet.text}"
            </p>
            
            {/* Metadata (Date & Link) */}
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{activeTweet.date}</span>
                <a href={activeTweet.link} target="_blank" rel="noreferrer" style={{ color: "#1DA1F2", fontSize: "0.8rem", textDecoration: "none", fontWeight: "bold", marginTop: '5px' }}>
                    Reply on X &rarr;
                </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 3. KOMPONEN STANDARD ---
const DummyContent = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
  <div className={styles.dummyCard}>
    <div className={styles.previewBox}>
      <div style={{ opacity: 0.2, fontSize: '3rem' }}>{icon}</div>
    </div>
    <div className={styles.textGroup}>
      <div className={styles.iconLarge}>{icon}</div>
      <h2 className={styles.dummyTitle}>{title}</h2>
      <p className={styles.dummyDesc}>{desc}</p>
    </div>
  </div>
);

interface Tab { id: string; label: string; icon: React.ReactNode; content: React.ReactNode; }

const defaultTabs: Tab[] = [
  { id: "instagram", label: "Instagram", icon: <FaInstagram />, content: <InstagramTabContent /> },
  
  // UPDATE: Memanggil TwitterTabContent
  { id: "twitter", label: "Twitter (X)", icon: <FaTwitter />, content: <TwitterTabContent /> },
  
  { id: "threads", label: "Threads", icon: <SiThreads />, content: <DummyContent title="Join Threads" desc="Diskusi berantai tentang proyek terbaru." icon={<SiThreads />} /> },
  { id: "linkedin", label: "LinkedIn", icon: <FaLinkedin />, content: <DummyContent title="Connect Professionally" desc="Mari berjejaring secara profesional dan bahas peluang kolaborasi." icon={<FaLinkedin />} /> },
  { id: "discord", label: "Discord", icon: <FaDiscord />, content: <DummyContent title="Join the Community" desc="Ngobrol santai bareng komunitas di server Discord." icon={<FaDiscord />} /> },
  { id: "facebook", label: "Facebook", icon: <FaFacebook />, content: <DummyContent title="Facebook" desc="Stay connected with friends and family." icon={<FaFacebook />} /> },
  { id: "email", label: "Email", icon: <FaEnvelope />, content: <DummyContent title="Send a Message" desc="Butuh diskusi lebih serius? Kirim email langsung ke Nawa." icon={<FaEnvelope />} /> },
];

const AnimatedTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabs[0].id);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={styles.container}>
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

      <div className={styles.contentContainer} data-theme={isDarkMode ? "dark" : "light"}>
        
        <button 
          className={styles.themeToggleBtn} 
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
        </button>

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