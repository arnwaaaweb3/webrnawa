import React, { useState } from "react";
import {
    FileTextIcon,
    HomeIcon,
    LayersIcon,
    UsersIcon,
    MenuIcon,
    XIcon,
} from "lucide-react";
import styles from "../styles/Header.module.css";


const navigationLinks = [
    { href: "#", label: "Dashboard", icon: HomeIcon },
    { href: "#", label: "Projects", icon: LayersIcon },
    { href: "#", label: "Documentation", icon: FileTextIcon },
    { href: "#", label: "Team", icon: UsersIcon },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Tombol trigger selalu di kanan atas */}
            {/* Tombol trigger selalu di kanan atas */}
            <button
                className={`${styles.menuTrigger} ${isOpen ? styles.active : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle header menu"
            >
                {isOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
            </button>

            {/* Panel menu (slidedown) */}
            <div className={`${styles.menuPanel} ${isOpen ? styles.open : ""}`}>
                {/* Kiri: Logo */}
                <div className={styles.logo}></div>

                {/* Tengah: Navigation */}
                <nav className={styles.navbar}>
                    <ul className={styles.menuList}>
                        {navigationLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <li key={link.label}>
                                    <a href={link.href} className={styles.menuLink}>
                                        <Icon size={20} />
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Kanan: Kosong (karena tombol sudah fixed di luar) */}
                <div style={{ width: "2rem" }}></div>
            </div>
        </>
    );
}
