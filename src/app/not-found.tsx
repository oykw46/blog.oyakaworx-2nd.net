// src/app/not-found.tsx
import Link from 'next/link';
import styles from './page.module.css'; // 既存の共通スタイルを使用

export default function NotFound() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '60vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
        お探しのページは見つかりませんでした。
      </p>
      <Link href="/" style={{ 
        color: '#0070f3', 
        textDecoration: 'underline',
        fontSize: '1rem' 
      }}>
        ブログトップへ戻る
      </Link>
    </main>
  );
}