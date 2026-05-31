import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle"
import { SearchForm } from "@/components/SearchForm";
import { Nav } from "@/components/Nav";
import styles from "./layout.module.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
	default: "OyakaWorX BLOG",
	template: "%s | OyakaWorX BLOG",
  },
  description: "Web業界歴10年、Webデベロッパー 親川 将輝のブログサイトです。Next.js のハンズオン学習、日記の習慣化（思考を言語化する練習）を目的として更新していきます！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	// ページ読み込み時に即実行させる。
	const setInitialTheme = `
		(function() {
			try {
				var theme = localStrage.getItem('theme');
				if (theme) {
					document.documentElement.setAttribute('data-theme', theme);
				}
			} catch (e) {}
		})());
	`

	return (
		<html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}><head>
                {/* 
                  dangerouslySetInnerHTML を使い、
                  他の JS より先にテーマを適用させる
                */}
                <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
            </head>
			<body suppressHydrationWarning>
				<ThemeProvider>
					<header className={styles.header}>
						<p className={styles.siteTitle}>
							<a href="/">
								<Image
									src="/img_logo.webp"
									alt="OyakaWorX BLOG"
									width={150}
									height={72}
									className={styles.logo}
									priority
								/>
							</a>
						</p>
						<div className={styles.fixed}>
							<Nav />
							<Suspense fallback={<div>Loading sidebar...</div>}>
								<SearchForm />
							</Suspense>
							<ThemeToggle />
						</div>
					</header>
					{children}
					<footer className={styles.footer}>
						<a href="/">
							<Image
								src="/img_logo-white.webp"
								alt="OyakaWorX BLOG"
								width={150}
								height={72}
								className={styles.logo}
								priority
							/>
						</a>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
