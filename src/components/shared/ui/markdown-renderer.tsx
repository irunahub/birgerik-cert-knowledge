/**
 * マークダウンレンダラーコンポーネント
 *
 * 学習モードでの問題文・解説文の表示に使用します。
 * react-markdownベースのプレビューを使用し、コードブロックに行番号を表示します。
 */

import { MarkdownPreview } from './markdown-preview'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return <MarkdownPreview content={content} className={className} showLineNumbers={true} />
}
