"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className={styles.button} aria-label="テーマ切り替え">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};