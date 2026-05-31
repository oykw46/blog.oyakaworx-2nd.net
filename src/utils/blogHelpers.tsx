import styles from "@/app/page.module.css"; // スタイルを適用するためにインポート

// 文字列の中のキーワードを検索して <mark> タグに置き換えるヘルパー関数
export function highlightText(text: string, keyword: string | undefined) {
    if (!keyword || !text) return text;
    // 大文字と小文字を区別せず、キーワードを分割する正規表現を使用。
    const parts = text.split(new RegExp(`(${keyword})`, "gi")); // RegExp は、文字列の抽出、パターンを定義するルール。

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === keyword.toLowerCase() ? ( // part.toLowerCase() は、文字列の一部（part）を小文字に変換するメソッド。
                    <mark key={index} className={styles.highlight} /* 該当ワードがあれば、ハイライトを付けてマークアップ */ >
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>		
    );
}

// 本文から適切な文字数を抽出するヘルパー関数
export function extractExcerpt(content: string, keyword: string | undefined) {
    if (!content) return ""; // コンテンツがない場合は、何も返さない。
    const plainText = content.replace(/<[^>]*>/g, ""); // microCMS のリッチエディタ等に含まれるTMLタグをプレーンテキストに変換。（正規表現に完全一致）

    if (!keyword) {
        if (plainText.length <= 70) return plainText; // 検索キーワードがない場合（通常時）は、冒頭70文字を返す。
        return plainText.substring(0, 70) + "..."; // substring関数は、文字列の指定した開始位置 〜 終了位置までを切り出すために使用。
    }
    
    const index = plainText.toLowerCase().indexOf(keyword.toLowerCase()); // 検索キーワードが含まれる位置を探す（大文字と小文字は区別しない）

    if (index === -1) { // キーワードが本文になかった場合、冒頭70文字を返す（タイトルだけにヒットした場合など）
        if (plainText.length <= 70) return plainText;
        return plainText.substring(0, 70) + "...";
    }

    const start =  Math.max(0, index - 20);		// キーワードの前の文章をどこから切り取るか（最大20文字。マイナスにならないように0で丸める。）
    const end = index + keyword.length + 40;	// キーワードの後の文字をどこまで切り取るか（キーワードの長さ + 後ろ40文字を抜粋。）
    let excerpt = plainText.substring(start, end);

    // 三点リーダー（...）で、前後に省略があることを示す。
    if (start > 0) excerpt = "..." + excerpt;
    if (end < plainText.length) excerpt = excerpt + "...";

    return excerpt;
}