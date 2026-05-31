import { Category } from "@/lib/client";
import { Blog } from "@/types/blog";
import CategoryList from "./CategoryList";
import styles from "./Sidebar.module.css";
import Image from "next/image";

type Props = {
    recentBlogs: Blog[];
    categories: Category[];
};

export default function Sidebar({ recentBlogs, categories }: Props) {
    return (
        <aside className={styles.sidebar}>
            {/* プロフィールセクション */}
            <section className={styles.section}>
                <div className={styles.profileBox}>
                    <Image
                        src="/img_profile.webp"
                        alt="親川 将輝"
                        width={250}
                        height={167}
                        className={styles.avater}
                        priority
                    />
                    <p className={styles.profileName}>
                        親川 将輝
                    </p>
                    <p className={styles.profileDesc}>
                        Web業界歴10年のデベロッパーです！南国の地で黒糖飴を舐めながら日々コーディング！<br />今後は、Webアプリケーション領域でも「価値」を届けられるエンジニアを目指して勉強しています✍️
                    </p>
                    <div className="button">
                        <a href="/about/">view more <span>About</span></a>
                    </div>
                </div>
            </section>

            {/* 最近の投稿（最新7件） */}
            <section className={styles.section}>
                <h3 className="sectionTitle">
                    New Entry
                </h3>
                <ul className={styles.recentList}>
                    {recentBlogs.map((blog) => {
                        const dateString = blog.publishedAt ? blog.publishedAt.substring(0, 10) : "";
                        const displayDate = blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "";

                        return (
                            <li key={blog.id} className={styles.recentItem}>
                                <a href={`/blog/${blog.id}`} className={styles.recentLink}>
                                    {blog.eyecatch ? (
                                        <Image
                                            src={blog.eyecatch.url}
                                            alt={blog.title}
                                            width={100}
                                            height={100}
                                            className={styles.recentImage}
                                        />
                                    ) : (
                                        <Image
                                            src="/img_logo.webp"
                                            alt="No Image"
                                            width={100}
                                            height={100}
                                            className={styles.recentNoImage}
                                        />
                                    )}
                                    <div className={styles.recentTextContainer}>
                                        <span className={styles.recentTitle}>
                                            {blog.title}
                                        </span>
                                        <time className={styles.recentDate} dateTime={dateString}>
                                            {displayDate}
                                        </time>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* カテゴリータグ */}
            <section className={styles.section}>
                <h3 className="sectionTitle">
                    Blog Categories
                </h3>
                <CategoryList categories={categories} />
            </section>
        </aside>
    )
}