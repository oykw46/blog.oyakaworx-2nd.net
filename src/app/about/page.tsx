import styles from "./page.module.css";
import { Suspense } from "react";
import HeaderTitle from "@/components/HeaderTitle";
import SmoothLink from "@/components/SmoothLink";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About | OyakaWorX BLOG",
    description: "OyakaWorX BLOGの運営者、親川 将輝のプロフィールページです。技術スタックやブログ開設の経緯等を紹介します。",
    alternates: {
        canonical: "https://blog.oyakaworx-2nd.net/about",
    },
    openGraph: {
        title: "About | OyakaWorX BLOG",
        description: "OyakaWorX BLOGの運営者、親川 将輝のプロフィールページです。技術スタックやブログ開設の経緯等を紹介します。",
        url: "https://blog.oyakaworx-2nd.net/about",
        images: [{ url: "https://blog.oyakaworx-2nd.net/ogp.webp" }]
    },
}

function AboutContent() { // ブログ詳細コンポーネント。params: Promise<{ id: string }> と書くことで、TypeScript に「後から ID が届くよ」と教えます。
    return (
        <>
            <HeaderTitle title="About" />
            <main className={styles.content}>
                <section className={styles.section}>
                    <ul className={styles.anchorlink}>
                        <li>
                            <SmoothLink targetId="profile">
                                <span>私について</span>
                            </SmoothLink>
                        </li>
                        <li>
                            <SmoothLink targetId="site">
                                <span>当サイトについて</span>
                            </SmoothLink>
                        </li>
                    </ul>
                </section>

                <section id="profile" className={styles.section}>
                    <div className={styles.flex}>
                        <div className={styles.flex_img}>
                            <Image
                                src="/img_profile.webp"
                                alt="親川 将輝"
                                width={570}
                                height={428}
                                className={styles.avater}
                                priority
                            />
                        </div>
                        <div className={styles.flex_text}>
                            <h2 className={styles.title}>初めまして！</h2>
                            <p>
                                ブログを開いてくださり<wbr />ありがとうございます！<br />
                                Webデベロッパーの<wbr />親川 将輝と申します。
                            </p>
                            <p>
                                このサイトは、<wbr />日常の出来事を<wbr />ゆったりと書いたり、<br />
                                エンジニア学習の<wbr />振り返りに<wbr />使ったりしています。
                            </p>
                            <p>
                                これまでの制作物は、<wbr />下記ポートフォリオにまとめていますので、<wbr />
                                ぜひご覧いただけると嬉しいです！
                            </p>
                            <div className="button">
                                <a href="https://oyakaworx-2nd.net/" target="_blank" rel="noopener">view more <span>Portfolio</span></a>
                            </div>
                            <div className="button">
                                <a href="https://github.com/oykw46/oyakaworx-2nd.net" target="_blank" rel="noopener">view more <span>GitHub</span></a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.subSection}>
                        <h3 className={styles.title_medium}>プロフィール</h3>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <th>生年月日</th>
                                    <td>1996年4月6日</td>
                                    <th>血液型</th>
                                    <td>A型</td>
                                </tr>
                                <tr>
                                    <th>MBTI</th>
                                    <td>INFJ<wbr />（2026年5月現在）</td>
                                    <th>尊敬する人物</th>
                                    <td>中田敦彦さん、<wbr />西村博之さん</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.subSection}>
                        <h3 className={styles.title_medium}>技術スタック</h3>
                        <h4 className={styles.title_small}>使用言語</h4>
                        <ul className={styles.list}>
                            <li><span>HTML</span></li>
                            <li><span>CSS（Sass）</span></li>
                            <li><span>JavaScript</span></li>
                            <li><span>TypeScript</span></li>
                            <li><span>Liquid</span></li>
                            <li><span>PHP</span></li>
                        </ul>

                        <h4 className={styles.title_small}>フレームワーク・ライブラリ</h4>
                        <ul className={styles.list}>
                            <li><span>React</span></li>
                            <li><span>Next.js</span></li>
                            <li><span>jQuery</span></li>
                            <li><span>Tailwind CSS</span></li>
                        </ul>

                        <h4 className={styles.title_small}>CMS</h4>
                        <ul className={styles.list}>
                            <li><span>microCMS</span></li>
                            <li><span>Shopify</span></li>
                            <li><span>MakeShop</span></li>
                            <li><span>WordPress</span></li>
                        </ul>
                    </div>
                </section>

                <section id="site" className={styles.section}>
                    <h2 className={styles.title}>当サイトについて</h2>
                    <p>
                        Next.js のハンズオン学習、<wbr />日記の習慣化（思考を言語化する練習）を<wbr />目的として作り始めました。<br />
                        microCMS に登録したブログデータを<wbr /> Rest fetch で API 取得しております。
                    </p>
                    <p>
                        フリーワード検索機能を実装する際、<wbr /> どんなロジックを書けば良いのか<wbr />「そもそも分からない」というのが大きな壁でした。<br />
                        AI（Gemini）に壁打ちをしながら、<wbr />関数の意味を解説してもらい、<wbr />少しずつ理解を深めていきました。
                    </p>
                    <p>
                        完成された知識を発信するというよりも、<wbr />「学びながら作る過程」を共有する場として、<wbr />誰かの学習のヒントになれば幸いです。
                    </p>
                    <div className="button">
                        <a href="https://github.com/oykw46/blog.oyakaworx-2nd.net">view more <span>GitHub</span></a>
                    </div>
                </section>
            </main>
        </>
    )
}

export default function About() {
    return (
        <>
            <Suspense fallback={<main className={styles.main}>読み込み中...</main>}>
               <AboutContent />
            </Suspense>
        </>
    )
}