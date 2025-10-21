'use client'

import { useState } from 'react'
import { BookOpen, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/shared/ui/button'
import { Input } from '@/components/shared/ui/input'
import { Textarea } from '@/components/shared/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/shared/ui/card'
import { Modal, ModalFooter } from '@/components/shared/ui/modal'
import { EmptyState } from '@/components/shared/ui/empty-state'
import { Badge } from '@/components/shared/ui/badge'
import { Spinner } from '@/components/shared/loading/spinner'
import { ErrorMessage } from '@/components/shared/error/error-message'
import { toast } from '@/lib/utils/toast'

export default function DemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToastTest = () => {
    toast.success('成功しました！', '操作が正常に完了しました')
  }

  const handleErrorToast = () => {
    toast.error('エラーが発生しました', '操作を完了できませんでした')
  }

  const handleLoadingTest = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('読み込み完了')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            コンポーネントデモ
          </h1>
          <p className="text-gray-600">
            Phase 0で作成した共通コンポーネントの動作確認
          </p>
        </div>

        <div className="space-y-8">
          {/* ボタン */}
          <Card>
            <CardHeader>
              <CardTitle>ボタン</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="primary" isLoading>
                  Loading
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Toast */}
          <Card>
            <CardHeader>
              <CardTitle>Toast通知</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleToastTest}>成功Toast</Button>
                <Button variant="danger" onClick={handleErrorToast}>
                  エラーToast
                </Button>
                <Button variant="secondary" onClick={handleLoadingTest}>
                  ローディングテスト
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 入力フォーム */}
          <Card>
            <CardHeader>
              <CardTitle>入力フォーム</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-md">
                <Input label="名前" placeholder="山田太郎" />
                <Input
                  label="メールアドレス"
                  type="email"
                  placeholder="email@example.com"
                  error="有効なメールアドレスを入力してください"
                />
                <Textarea
                  label="説明"
                  placeholder="詳細を入力してください"
                />
              </div>
            </CardContent>
          </Card>

          {/* モーダル */}
          <Card>
            <CardHeader>
              <CardTitle>モーダル</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsModalOpen(true)}>
                モーダルを開く
              </Button>
            </CardContent>
          </Card>

          {/* バッジ */}
          <Card>
            <CardHeader>
              <CardTitle>バッジ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </CardContent>
          </Card>

          {/* スピナー */}
          <Card>
            <CardHeader>
              <CardTitle>ローディングスピナー</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <Spinner size="sm" />
                  <p className="text-xs text-gray-600 mt-2">Small</p>
                </div>
                <div className="text-center">
                  <Spinner size="md" />
                  <p className="text-xs text-gray-600 mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <Spinner size="lg" />
                  <p className="text-xs text-gray-600 mt-2">Large</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* エラーメッセージ */}
          <Card>
            <CardHeader>
              <CardTitle>エラーメッセージ</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorMessage
                title="エラーが発生しました"
                message="データの読み込みに失敗しました。もう一度お試しください。"
              />
            </CardContent>
          </Card>

          {/* 空状態 */}
          <Card>
            <CardHeader>
              <CardTitle>空状態</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={<BookOpen className="h-8 w-8 text-gray-400" />}
                title="データがありません"
                description="まだデータが登録されていません。新しいデータを追加してください。"
                action={
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    データを追加
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="サンプルモーダル"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            これはモーダルのサンプルです。ESCキーまたはオーバーレイをクリックして閉じることができます。
          </p>
          <Input label="サンプル入力" placeholder="何か入力してください" />
        </div>
        
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            キャンセル
          </Button>
          <Button onClick={() => {
            toast.success('保存しました')
            setIsModalOpen(false)
          }}>
            保存
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}