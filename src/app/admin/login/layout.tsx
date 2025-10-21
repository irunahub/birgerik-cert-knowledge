import { ReactNode } from 'react'

/**
 * ログインページ専用レイアウト
 * 親の admin/layout.tsx を上書きして、シンプルなレイアウトを提供
 */
export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}