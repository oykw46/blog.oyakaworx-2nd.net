"use client"

import React from "react"

type Props = {
    targetId: string;
    children: React.ReactNode;
    className?: string;
}

export default function SmoothLink({ targetId, children, className } : Props) {
    const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // aタグの代わりにbuttonを使用。URLが変わらないような設計。

        // 移動先の要素（id="section1"など）をページ内から探す処理
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start", // 要素の先頭が一番上に来るように指定。
            });
        }
    };

    return (
        <button onClick={handleScroll} className={className} style={{ border: 'none', cursor: 'pointer'}}>
            {children}
        </button>
    )
}