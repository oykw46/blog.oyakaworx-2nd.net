"use client";
import { Link } from "lucide-react";

import styles from "./Nav.module.css";

export const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <a href="/" className={styles.navLink}>Blog</a>
                </li>
                <li className={styles.item}>
                    <a href="/about" className={styles.navLink}>About</a>
                </li>
            </ul>
        </nav>
    );
};