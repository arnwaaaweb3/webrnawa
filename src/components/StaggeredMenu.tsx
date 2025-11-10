import React, { useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import styles from "../styles/StaggeredMenu.module.css"; 
import RealTimeClock from "./RealTimeClock";

interface MenuItemData {
    text: string;
    url: string;
}

interface MenuItemProps {
    item: MenuItemData;
    gsapRef: React.Ref<HTMLLIElement | null>; 
}

const MenuItem: React.FC<MenuItemProps> = ({ item, gsapRef }) => {
    
    const itemRef = useCallback(
        (node: HTMLLIElement | null) => {
            if (typeof gsapRef === 'function') {
                gsapRef(node);
            } else if (gsapRef) {
                (gsapRef as React.MutableRefObject<HTMLLIElement | null>).current = node; 
            }
        },
        [gsapRef]
    );
    
    return (
        <li
            ref={itemRef}
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
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]); 
    const footerRef = useRef<HTMLDivElement>(null); 

    useLayoutEffect(() => {
        const dirFrom = position === "left" ? "-100%" : "100%";
        const dirTo = "0%";

        itemRefs.current.forEach(el => {
             if(el) gsap.set(el, { x: -20 });
        });
        
        if(footerRef.current) gsap.set(footerRef.current, { y: 20, opacity: 0 }); 


        if (isOpen) {
            gsap.to([panelBg2.current, panelBg1.current, panelMain.current], {
                x: dirTo,
                duration: 0.6,
                ease: "power4.out",
                stagger: 0.1,
            });

            gsap.to(
                itemRefs.current,
                { x: 0, stagger: 0.1, delay: 0.4, duration: 0.5 } 
            );
            
            gsap.to(
                footerRef.current,
                { y: 0, opacity: 1, delay: 0.7, duration: 0.5, ease: "power2.out" }
            );

        } else {
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
                    
                    <div 
                        ref={footerRef} 
                        className={styles["sm-tribute-footer"]}
                    >
                        {/* [Morta] Wrapper baru untuk jam dan logo agar sejajar */}
                        <div className={styles["sm-footer-content-flex"]}>
                            
                            {/* [Morta] Letakkan Jam Real-time di sebelah kiri */}
                            <RealTimeClock />

                            {/* [Morta] Wrapper untuk teks tribute dan logo stack di sebelah kanan */}
                            <div className={styles["sm-logo-stack-wrapper"]}>
                                <p className={styles["sm-tribute-text"]}>In Assistance of</p>
                                
                                <div className={styles["sm-logo-stack"]}>
                                    <img 
                                        src="/gemini.png"
                                        alt="Gemini AI Logo" 
                                        className={styles["sm-tribute-logo"]}
                                    />

                                    <img 
                                        src="/openai.png"
                                        alt="OpenAI Logo" 
                                        className={styles["sm-tribute-logo"]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaggeredMenu;