import React, { useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import styles from "../styles/StaggeredMenu.module.css"; // Pastikan path ini benar

// Batasan untuk efek magnetik
const MAGNETIC_MAX_DISTORTION = 10; 

// Perbaikan Utama: useMagnetic Hook
// Memperbolehkan tipe `T` (turunan HTMLElement) menjadi `T | null` pada RefObject.
const useMagnetic = <T extends HTMLElement>(ref: React.RefObject<T | null>) => {
    
    // Pastikan ref di-check sebelum digunakan
    const onMouseMove = useCallback((e: MouseEvent) => {
        const el = ref.current;
        if (!el) return; 

        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        // Hitung distorsi magnetik
        const dx = gsap.utils.mapRange(-rect.width / 2, rect.width / 2, -MAGNETIC_MAX_DISTORTION, MAGNETIC_MAX_DISTORTION, x);
        const dy = gsap.utils.mapRange(-rect.height / 2, rect.height / 2, -MAGNETIC_MAX_DISTORTION, MAGNETIC_MAX_DISTORTION, y);

        gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
    }, [ref]);

    const onMouseLeave = useCallback(() => {
        const el = ref.current;
        if (el) {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }
    }, [ref]);

    useLayoutEffect(() => {
        const el = ref.current;
        if (el) {
            el.addEventListener('mousemove', onMouseMove);
            el.addEventListener('mouseleave', onMouseLeave);
            return () => {
                el.removeEventListener('mousemove', onMouseMove);
                el.removeEventListener('mouseleave', onMouseLeave);
            };
        }
    }, [ref, onMouseMove, onMouseLeave]);
};

// --- Komponen Anak untuk MenuItem (Solusi Rules of Hooks) ---

interface MenuItemData {
    text: string;
    url: string;
}

interface MenuItemProps {
    item: MenuItemData;
    // Tipe untuk GSAP Ref: harus bisa menerima fungsi atau MutableRefObject
    gsapRef: React.Ref<HTMLLIElement | null>; 
}

const MenuItem: React.FC<MenuItemProps> = ({ item, gsapRef }) => {
    
    // 1. Definisikan Ref untuk Magnetic Effect di dalam komponen ini
    const magneticRef = useRef<HTMLLIElement | null>(null);
    
    // 2. Panggil Hook Magnetic di level atas komponen ini (AMAN dari Rules of Hooks)
    useMagnetic(magneticRef); 

    // 3. Gabungkan kedua Ref (GSAP Ref dari Parent & Magnetic Ref internal)
    const combinedRef = useCallback(
        (node: HTMLLIElement | null) => {
            // Pasang ref untuk Animasi GSAP
            if (typeof gsapRef === 'function') {
                gsapRef(node);
            } else if (gsapRef) {
                // Asserting tipe ke MutableRefObject
                (gsapRef as React.MutableRefObject<HTMLLIElement | null>).current = node; 
            }
            
            // Pasang ref untuk Magnetic Hook
            magneticRef.current = node;
        },
        [gsapRef] // magneticRef tidak perlu masuk dependency karena tidak akan berubah
    );
    
    return (
        <li
            ref={combinedRef}
            className={styles["sm-panel-item"]}
        >
            <a href={item.url}>{item.text}</a>
        </li>
    );
};


// --- Komponen Utama StaggeredMenu ---

interface PanelProps {
    isOpen: boolean;
    position?: "left" | "right";
    items?: MenuItemData[];
}

const StaggeredMenu: React.FC<PanelProps> = ({
    isOpen,
    position = "left",
    items = [],
}) => {
    const panelMain = useRef<HTMLDivElement>(null);
    const panelBg1 = useRef<HTMLDivElement>(null);
    const panelBg2 = useRef<HTMLDivElement>(null);
    
    // Ref untuk GSAP: Menyimpan array elemen menu item
    // Perbaikan Tipe: Hanya perlu satu array untuk menyimpan referensi elemen DOM
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]); 

    // HAPUS: magneticRefs tidak lagi diperlukan karena sudah dihandle di komponen MenuItem

    useLayoutEffect(() => {
        const dirFrom = position === "left" ? "-100%" : "100%";
        const dirTo = "0%";
        
        // Atur posisi awal menu item
        itemRefs.current.forEach(el => {
             if(el) gsap.set(el, { opacity: 0, x: -20 });
        });

        if (isOpen) {
            // Stacked panels animasi masuk
            gsap.to([panelBg2.current, panelBg1.current, panelMain.current], {
                x: dirTo,
                duration: 0.6,
                ease: "power4.out",
                stagger: 0.1,
            });

            // Menu items
            gsap.to(
                itemRefs.current,
                { opacity: 1, x: 0, stagger: 0.1, delay: 0.4, duration: 0.5 }
            );
        } else {
            // Stacked panels animasi keluar
            gsap.to([panelMain.current, panelBg1.current, panelBg2.current], {
                x: dirFrom,
                duration: 0.6,
                ease: "power4.in",
                stagger: 0.1,
            });
        }
    }, [isOpen, position]);

    return (
        <>
            <div 
                ref={panelBg2} 
                className={`${styles["sm-panel"]} ${styles["sm-panel-bg2"]}`} 
                data-position={position} 
            />
            <div 
                ref={panelBg1} 
                className={`${styles["sm-panel"]} ${styles["sm-panel-bg1"]}`} 
                data-position={position} 
            />
            <div 
                ref={panelMain} 
                className={`${styles["sm-panel"]} ${styles["sm-panel-main"]}`} 
                data-position={position}
            >
                <div className={styles["sm-panel-inner"]}>
                    <ul className={styles["sm-panel-list"]}>
                        {items.map((item, i) => {
                            // Stable ref setter for each item
                            const setItemRef = (el: HTMLLIElement | null) => {
                                itemRefs.current[i] = el;
                            };
                            return (
                                <MenuItem
                                    key={i}
                                    item={item}
                                    gsapRef={setItemRef}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default StaggeredMenu;