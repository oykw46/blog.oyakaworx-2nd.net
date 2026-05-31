import { createClient } from "microcms-js-sdk";

// -------------------------------------------------------------------------------
// Next.js では「.env.***」で定義された環境変数は、
// ビルド時に「process.env」に設定されるため、クライアントサイドでアクセスできるようになる仕様。

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
    // throw は、ユーザー定義外の（例外：エラー）を発生させる構文。
    // ここでは、MICROCMS_SERVICE_DOMAIN 環境変数が定義されていない場合にエラーを発生させるために使用されている。
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
    // ここでは、MICROCMS_API_KEY 環境変数が定義されていない場合にエラーを発生させるために使用されている。
}

export const client = createClient({
    // createClient は、microcms-js-sdk ライブラリからインポートされた関数で、クライアントインスタンスを作成するために使用される。
    // ここでは、createClient 関数を呼び出して、serviceDomain と apiKey を指定してクライアントインスタンスを作成している。

    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    // process.env.MICROCMS_SERVICE_DOMAIN は、MICROCMS_SERVICE_DOMAIN 環境変数の値を参照している。

    apiKey: process.env.MICROCMS_API_KEY,
    // process.env.MICROCMS_API_KEY は、MICROCMS_API_KEY 環境変数の値を参照している。
})

// -------------------------------------------------------------------------------

import { Blog } from "@/types/blog";

// 引数の型を定義
type GetListQueries = {
    q?: string;         // フリーワード検索用
    filters?: string;   // カテゴリ絞り込み用
    limit?: number;     // 1ページあたりの取得件数
    offset?: number;    // データの取得開始位置
}

export const getList = async (queries?: GetListQueries) => { // getList 関数は、API からブログのリストを取得するための非同期関数。
    const data = await client.get({ // クライアントインスタンスの get メソッドを呼び出して、API からデータを取得するために使用。
        endpoint: "blogs", // microCMS の API　エンドポイント名。
        queries: {
            q: queries?.q,
            filters: queries?.filters,
            limit: queries?.limit,      // limit: 15, offset: 15 になると
            offset: queries?.offset,    // 次は「16 〜 30」件目までを取得する。
        }, // 検索ワード（q）の絞り込み（filters）をまとめて送る。
    });
    return {
        contents: data.contents as Blog[],      // API から取得したデータの contents プロパティを Blog 型の配列として返す。
        totalCount: data.totalCount as number,    // 全体件数を取得
    }
}

// 特定IDの記事を取得する関数
export const getDetail = async (contentId: string) => { // getDetail 関数は、API から特定コンテンツの詳細を取得するための非同期関数。
    const detail = await client.get<Blog>({ // クライアントインスタンスの get メソッドを呼び出して、API からデータを取得するために使用。
        endpoint: 'blogs', // microCMS の API エンドポイント名。
        contentId, // getDetail 関数と組み合わせて使用。contentId = 対象コンテンツの識別。
    });
    return detail;
}

// カテゴリータグの型定義
export type Category = {
    id: string,
    name: string
}

// すべてのカテゴリータグを取得する関数
export const getCategories = async () => {
    const data = await client.get({
        endpoint: 'categories', // microCMSのカテゴリータグ用のエンドポイント
        queries: {
            limit: 100, //すべてのカテゴリータグを取得できるよう多めに設定
        }
    });
    return data.contents as Category[];
};

// 前後の記事IDを取得する関数
export const getAdjacentBlogs = async (currentPublishedAt: string) => {
    // 1. 今開いている記事よりも「未来」の記事の中から、一番古いものを1件取得。
    const nextData = await client.get({
        endpoint: "blogs",
        queries: {
            limit: 1,
            orders: "publishedAt",  // 昇順（古い順）
            filters: `publishedAt[greater_than]${currentPublishedAt}`,  // 今開いている記事よりも「未来」を指定。
            fields: "id",
        },
    });

    // 2. 今開いている記事よりも「過去」の記事の中から、一番新しいものを1件取得。
    const prevData = await client.get({
        endpoint: "blogs",
        queries: {
            limit: 1,
            orders: "-publishedAt", // 降順（新しい順）
            filters: `publishedAt[less_than]${currentPublishedAt}`, // 今開いている記事よりも「過去」を指定。
            fields: "id",
        },
    });

    return {
        nextBlog: nextData.contents[0] as { id: string } | undefined,
        prevBlog: prevData.contents[0] as { id: string } | undefined,
    };
};