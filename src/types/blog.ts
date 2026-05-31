// microCMS からブログデータを取得した際、
// データの型を定義するための TypeScript インターフェースを作成します。

// カテゴリの型定義
export type Category = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
};

// ブログ記事の型定義
export type Blog = {
    id: string;  // ブログ記事の一意な識別子
    createdAt: string;  // ブログ記事の作成日時
    updatedAt: string;  // ブログ記事の更新日時
    publishedAt: string;  // ブログ記事の公開日時
    revisedAt: string;  // ブログ記事の改訂日時
    title: string;  // ブログ記事のタイトル
    content: string;  // ブログ記事の内容（HTML形式）
    eyecatch?: {
        url: string;  // アイキャッチ画像のURL
        width: number;  // アイキャッチ画像の幅
        height: number;  // アイキャッチ画像の高さ
    };
    category?: Category;  // ブログに関連づけられたカテゴリ
}