import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "../styles/StaggeredMenu.module.css";
import RealTimeClock from "./RealTimeClock";

interface MenuItemData {
    text: string;
    url: string;
}

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
    const footerRef = useRef<HTMLDivElement>(null);

    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    const setItemRef = (el: HTMLLIElement | null, index: number) => {
        itemRefs.current[index] = el;
    };

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.5 },
        });

        const fromDir = position === "left" ? "-100%" : "100%";

        // RESET
        gsap.set(itemRefs.current, { x: -20, opacity: 0 });
        gsap.set(footerRef.current, { y: 20, opacity: 0 });

        if (isOpen) {
            tl.to(panelBg2.current, { x: "0%" })
                .to(panelBg1.current, { x: "0%" }, "-=0.3")
                .to(panelMain.current, { x: "0%" }, "-=0.3")
                .to(itemRefs.current, { x: 0, opacity: 1, stagger: 0.1 }, "-=0.1")
                .to(footerRef.current, { y: 0, opacity: 1 }, "-=0.3");
        } else {
            tl.to(panelMain.current, { x: fromDir })
                .to(panelBg1.current, { x: fromDir }, "-=0.2")
                .to(panelBg2.current, { x: fromDir }, "-=0.2");
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
                        {items.map((item, i) => (
                            <li
                                key={i}
                                ref={(el) => setItemRef(el, i)}
                                className={styles["sm-panel-item"]}
                            >
                                <a href={item.url}>{item.text}</a>
                            </li>
                        ))}
                    </ul>
                    <RealTimeClock />

                    <div ref={footerRef} className={styles["sm-tribute-footer"]}>
                        <div className={styles["sm-footer-content-flex"]}>

                            <div className={styles["sm-logo-stack-wrapper"]}>
                                <p className={styles["sm-tribute-text"]}>
                                    In Assistance of
                                </p>

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
