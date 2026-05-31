"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./SearchForm.module.css";

export const SearchForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // URL末尾の「?q=...」を取得。

    // 現在のURLに検索クエリがあれば「初期値」として入れる。
    const [keyword, setKeyword] = useState(searchParams.get("q") || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!keyword.trim()) {
            router.push("/"); // 空入力なら一覧に戻る。
            return;
        }
        router.push(`/?q=${encodeURIComponent(keyword)}`); // URL を /?q=キーワード に更新
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="記事を検索..."
                    className={styles.input}
                />
                <button type="submit" className={styles.button} aria-label="検索">
                    <Search size={20} />
                </button>
            </div>
        </form>
    );
};