/**
 * マークダウンプレビューコンポーネント
 *
 * @uiw/react-markdown-previewを使用してマークダウンをHTMLにレンダリングします。
 * @uiw/react-md-editorのプレビューと完全に同じスタイルを使用します。
 * 学習モードでの問題文・解説文の表示に使用します。
 */

'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import '@uiw/react-markdown-preview/markdown.css'

// MarkdownPreviewはクライアントサイドでのみ動作するため、SSRを無効化
const MarkdownPreviewLib = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
)

interface MarkdownPreviewProps {
  content: string
  className?: string
  showLineNumbers?: boolean // コードブロックに行番号を表示するかどうか
}

export function MarkdownPreview({
  content,
  className = '',
  showLineNumbers = false
}: MarkdownPreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>読み込み中...</div>
  }

  // 行番号付きコードブロックのカスタムコンポーネント
  const components = showLineNumbers
    ? {
        code: ({ children, className, ...props }: any) => {
          const isInline = !className

          if (isInline) {
            return <code className={className} {...props}>{children}</code>
          }

          // childrenを文字列に変換
          const codeContent = typeof children === 'string'
            ? children
            : Array.isArray(children)
            ? children.join('')
            : String(children)

          const codeString = codeContent.replace(/\n$/, '')
          const lines = codeString.split('\n')

          return (
            <code className={className} {...props}>
              <div style={{ display: 'table', width: '100%' }}>
                {lines.map((line, index) => (
                  <div key={index} style={{ display: 'table-row' }}>
                    <span
                      style={{
                        display: 'table-cell',
                        width: '2.5rem',
                        textAlign: 'right',
                        paddingRight: '1rem',
                        color: '#6b7280',
                        userSelect: 'none',
                      }}
                    >
                      {index + 1}
                    </span>
                    <span style={{ display: 'table-cell', whiteSpace: 'pre' }}>
                      {line || ' '}
                    </span>
                  </div>
                ))}
              </div>
            </code>
          )
        },
      }
    : undefined

  return (
    <div className={`wmde-markdown wmde-markdown-color ${className}`} data-color-mode="light">
      <MarkdownPreviewLib
        source={content}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={components}
        wrapperElement={{
          'data-color-mode': 'light',
        }}
      />
    </div>
  )
}
