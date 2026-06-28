import { getDetail, getList, getCategories, getAdjacentBlogs } from "@/lib/client";
import styles from "./page.module.css";
import HeaderTitle from "@/components/HeaderTitle";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export const dynamicParams = true;

// 全記事の ID を事前に取得してビルドを高速化する（静的生成の設定）
export async function generateStaticParams() { // Next.js における「静的サイト生成（SSG）」を爆速化させる非同期関数。
    const { contents } = await getList(); // client.ts 内の「getList」を実行。
    return contents.map((blog) => ({ // API のエンドポイント「blog」データをマッピング = 配列の各要素に対して処理を実行する。
        id: blog.id, // 各記事の id を取得。
    }));
}

// SEO・OGP・Canonical 設定
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const blog = await getDetail(id);

    if (!blog) return {};

    // 本文からHTMLタグを消して、冒頭100文字を抽出。meta description として設定する。
    const plainText = blog.content ? blog.content.replace(/<[^>]*>/g, "") : "";
    const description = plainText.substring(0, 100) + "...";

    // 公開URL（本番環境のドメインに合わせて記載）
    const siteUrl = `https://blog.oyakaworx-2nd.net/blog/${id}`;
    const ogImageUrl = blog.eyecatch?.url || "https://blog.oyakaworx-2nd.net/ogp.webp";

    return {
        title: `${blog.title} | OyakaWorX BLOG`,    // ページタイトル
        description: description,   // メタディスクリプション
        alternates: {
            canonical: siteUrl, // canonical設定
        },
        openGraph: {
            title: blog.title,
            description: description,
            url: siteUrl,
            siteName: "OyakaWorX BLOG",
            images: [{ url: ogImageUrl }],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",    // Xで画像を大きく見せる設定
            title: blog.title,
            description: description,
            images: [ogImageUrl],
        },
    }
}

// Next.js 15 では、params は非同期処理なので、await してから id を取り出す。
export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) { // ブログ詳細コンポーネント。params: Promise<{ id: string }> と書くことで、TypeScript に「後から ID が届くよ」と教えます。
    
    const { id } = await params; // params を await して ID を取り出す。
    const { contents: recentBlogs } = await getList({ limit: 4 }); // 最近の投稿（最新4件）を取得
    const categories = await getCategories(); // すべてのカテゴリータグを取得
    const blog = await getDetail(id); // URL の [id] 部分を受け取ってデータを取得

    if (!blog) {
        notFound();
    }

    // 今開いている記事の公開日時から、前後の記事のデータを取得する。
    const { nextBlog, prevBlog } = await getAdjacentBlogs(blog.publishedAt);

    // publishedAt から「年」「月」「日」を切り分けて出力する。
    const yearStr = blog.publishedAt ? blog.publishedAt.substring(0, 4) : "";   // 2026
    const monthStr = blog.publishedAt ? blog.publishedAt.substring(5, 7) : "";  // 05
    const dayStr = blog.publishedAt ? blog.publishedAt.substring(8, 10) : "";   // 24
    // 検索エンジン用の 2026-05-24 形式の文字列も作っておく。
    const dateString = `${yearStr}-${monthStr}-${dayStr}`;

    return (
        <>
            <HeaderTitle title="Blog" />
            <div className={styles.container}>
                <article className={styles.main}>
                    <div className={styles.flex}>
                        <time className={styles.date} dateTime={dateString}>
                            <span className={styles.yearMonth}>
                                {yearStr}<br />{monthStr}
                            </span>
                            <span className={styles.day}>
                                {dayStr}
                            </span>
                        </time>
                        <div className={styles.postData}>
                            {/* blog タグが存在する場合、map を実行。 */}
                            {blog.category && (
                                <a href={`/?category=${blog.category.id}`} className={styles.category}>
                                    {blog.category.name}
                                </a>
                            )}
                            <h1 className={styles.title}>{blog.title || "タイトルなし"}</h1>
                        </div>
                    </div>
                    <div className={styles.flex}>
                        <div className={styles.null}></div>
                        <div className={styles.content}>
                            {blog.eyecatch && (
                                <Image
                                    src={blog.eyecatch.url}
                                    alt=""
                                    width={745}
                                    height={419}
                                    className={styles.image}
                                    priority
                                />
                            )}
                            {/* HTMLをそのまま表示 (dangerouslySetInnerHTML) */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${blog.content || ""}`, // 文字列のみ受け取る
                                }}
                            />

                            <div className={styles.navigation}>
                                {prevBlog ? (
                                    <div className={styles.prevLink}>
                                        <a href={`/blog/${prevBlog.id}`}>
                                            <span className={styles.jp}>前の記事を見る</span>
                                            <span className={styles.en}>view more PREV</span>
                                        </a>
                                    </div>
                                ) : (
                                    <div className={styles.enpty}></div>
                                )}
                                {nextBlog ? (
                                    <div className={styles.nextLink}>
                                        <a href={`/blog/${nextBlog.id}`}>
                                            <span className={styles.jp}>次の記事を見る</span>
                                            <span className={styles.en}>view more NEXT</span>
                                        </a>
                                    </div>
                                ) : (
                                    <div className={styles.enpty}></div>
                                )}
                                <div className={styles.backLink}>
                                    <a href="/">
                                        <span className={styles.jp}>ブログ一覧へ戻る</span>
                                        <span className={styles.en}>back to TOP</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <Sidebar recentBlogs={recentBlogs} categories={categories} />
            </div>
        </>
    )
}
