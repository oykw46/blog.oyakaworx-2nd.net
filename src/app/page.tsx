import { getList } from "@/lib/client";
import styles from "./page.module.css";
import { highlightText, extractExcerpt } from "@/utils/blogHelpers";
import HeaderTitle from "@/components/HeaderTitle";
import Image from "next/image";

export const revalidate = 60; // ISR（Incremental Static Regeneration）を有効にして、60秒ごとにページを再生成する設定。これにより、最新のブログ記事が反映されるようになる。

type Props = {
	searchParams: Promise<{
		q?: string;
		category?: string;
		page?: string;
	}>;
};

export default async function Home({ searchParams } : Props) { // ブログのリストを表示するための非同期関数コンポーネント。
	const { q, category, page } = await searchParams; // 指定したクエリパラメータを解析

	// 1. ページネーションの計算（1ページあたり 15件）
	const limit = 15;
	const currentPage = page ? parseInt(page, 10) : 1; // parseInt 関数は、文字列を解析して「整数型 number」に変換してくれる。
	const offset = (currentPage - 1) * limit;

	// 2. microCMS 用のフィルター文字列を作成
	const filterArray: string[] = [];
	// カテゴリ絞り込み
	if (category) {
		filterArray.push(`category[equals]${category}`);
	}
	const filters = filterArray.length > 0 ? filterArray.join('[and]'): undefined;

	// 3. microCMS からデータを取得（limit と offset を渡してページネーションを有効化）
	const { contents, totalCount } = await getList({
		q: q,
		filters: filters,
		limit: limit,
		offset: offset,
	});

	// 4. [UX体験の向上] 次ページがあるかどうかの簡易判定
	const maxPage = Math.ceil(totalCount / limit) || 1; // 最大ページ数の計算（例：16件 ÷ 15件 = 1.06 ... 切り上げて 2ページ）
	const hasNextPage = contents && contents.length === limit;

	return (
		<>
			<HeaderTitle title="Blog" />
			<main className={styles.main}>
				{/* 現在の検索・絞り込み状態を表示するエリア */}
				{(q || category) && (
					<div className={styles.searchStatus}>
						<h1 className={styles.title}>
							{q ? `「${q}」の検索結果` : `「${category}」の絞り込み結果`}
						</h1>
						<p className={styles.count}>
							現在のページ表示件数：{contents ? contents.length : 0} 件
						</p>
						<a href="/" className={styles.clearButton}>
							条件をリセットして記事一覧に戻る。
						</a>
					</div>
				)}
				{/* 該当記事が 0 件の場合 */}
				{!contents || contents.length === 0 ? (
					<div className={styles.noResult}>
						<p>ごめんなさい。お探しの記事は見つかりませんでした。<br />別のキーワードを試してみてください！</p>
						{currentPage > 1 && (
							<a href="/" className={styles.clearButton}>
								最初のページに戻る。
							</a>
						)}
					</div>
				) : (
					<>
						<ul className={styles.list}>
							{contents.map((blog) => {
								const excerptString = extractExcerpt(blog.content, q);
								const dateString = blog.publishedAt ? blog.publishedAt.substring(0, 10) : "";
								const displayDate = blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("ja-JP") : "";

								return (
									<li key={blog.id} className={styles.item}>
										<a href={`/blog/${blog.id}`} className={styles.link}>
											<div className={styles.imageWrapper}>
												{blog.eyecatch ? (
													<Image
														src={blog.eyecatch.url}
														alt={blog.title}
														width={329}
														height={185}
														className={styles.image}
														priority
													/>
												) : (
													<Image
														src="/img_logo.webp"
														alt="No Image"
														width={164}
														height={78}
														className={styles.noImage}
														priority
													/>
												)}
											</div>
											<h2 className={styles.postTitle}>
												{highlightText(blog.title, q) /*該当ワードがあれば、ハイライトを付けてマークアップ  */}
											</h2>
											<p className={styles.excerpt}>
												{highlightText(excerptString, q)}
											</p>
											<div className={styles.postData}>
												{blog.category && (
													<p className={styles.category}>
														{blog.category.name}
													</p>
												)}
												<time className={styles.date} dateTime={dateString}>
													{displayDate}
												</time>
											</div>
										</a>
									</li>
								);
							})}
						</ul>

						{/* 5. ページネーションコントロールのUI（URLの切り替えで移動） */}
						<div className={styles.pagination}>
							{currentPage > 1 && (
								<div className={styles.prevLink}>
									<a
										href={`/?page=${currentPage - 1}${q ?`&q=${q}` : ""}${category ? `&category=${category}` : ""}`}
									>
										<span>Prev</span>
									</a>
								</div>
							)}
							<span className={styles.pageNumber}>Page <em>{currentPage} / {maxPage}</em></span>
							{hasNextPage && (
								<div className={styles.nextLink}>
									<a
										href={`/?page=${currentPage + 1}${q ? `&q=${q}` : ""}${category?`&category=${category}` : ""}`}
									>
										<span>Next</span>
									</a>
								</div>
							)}
						</div>
					</>
				)}
			</main>
		</>
	);
}
