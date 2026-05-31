"use client"; // クライアントコンポーネントとして宣言。

import React, { createContext, useContext, useEffect, useState } from "react";

// まずは、型を定義する。
type Theme = "light" | "dark";
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void; // void を使用すると、引数を受け取らず、戻り値も返さない事ができる。
};

// createContext を用いる事で、親コンポーネントの props を明示的に受け取らずとも、配下のツリー内で任意的に情報を受け取る事ができる。
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => { // 子要素の種類を React コンポーネントを設定。
    const [theme, setTheme] = useState<Theme>("light"); // 変数 theme の初期値を "light" モードに設定。
    const [isMounted, setIsMounted] = useState(false); // マウント（DOM読み込み完了時）の引数は(false)

    // マウント時に localStorage から設定を読み込む
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null; // getItem メソッドを用いて localStrage からデータを取得する。何もない場合は「null」を返す。
        if (savedTheme) {
            setTheme(savedTheme); // もし保存されたテーマがあれば、そちら（"light" | "dark"）適用する。
            document.documentElement.setAttribute("data-theme", savedTheme); // <html> に data-theme をセット。
        }
        setIsMounted(true); // マウント完了フラグ
    }, []);

    // テーマを切り替える関数を作成。
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"; // newTheme に "light" ? "dark" どちらかを渡す。初期値は "light"
        setTheme(newTheme); // テーマがトグルされたら state を更新。
        localStorage.setItem("theme", newTheme); // localStrage のデータに newTheme の情報を引き渡す。
        document.documentElement.setAttribute("data-theme", newTheme); // <html> に data-theme をセット。
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}> {/* Providerとは、コンポーネントツリー全体に「供給（Provide）」するコンポーネント。 */}
            {children}
        </ThemeContext.Provider>
    );
}

// 他のコンポーネントで簡単に使うためのカスタムフック
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};