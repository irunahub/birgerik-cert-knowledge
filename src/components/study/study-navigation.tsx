'use client'

import { Button } from '@/components/shared/ui/button'
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw } from 'lucide-react'

interface StudyNavigationProps {
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isAnswerSubmitted: boolean
  hasSelectedChoices: boolean
  onPrevious: () => void
  onSubmit: () => void
  onNext: () => void
  onReset: () => void
  onFinish: () => void
}

export function StudyNavigation({
  isFirstQuestion,
  isLastQuestion,
  isAnswerSubmitted,
  hasSelectedChoices,
  onPrevious,
  onSubmit,
  onNext,
  onReset,
  onFinish,
}: StudyNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* 左側: 前へボタン */}
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="flex-shrink-0"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        前へ
      </Button>
      
      {/* 中央: アクションボタン */}
      <div className="flex-1 flex items-center justify-center gap-3">
        {!isAnswerSubmitted ? (
          // 回答提出前
          <>
            <Button
              onClick={onSubmit}
              disabled={!hasSelectedChoices}
              size="lg"
              className="min-w-[120px]"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              回答する
            </Button>
            {hasSelectedChoices && (
              <Button
                variant="ghost"
                onClick={onReset}
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                リセット
              </Button>
            )}
          </>
        ) : (
          // 回答提出後
          <>
            {isLastQuestion ? (
              <Button
                onClick={onFinish}
                size="lg"
                className="min-w-[120px]"
              >
                結果を見る
              </Button>
            ) : (
              <Button
                onClick={onNext}
                size="lg"
                className="min-w-[120px]"
              >
                次へ
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </>
        )}
      </div>
      
      {/* 右側: 次へボタン（未提出時は非表示） */}
      <div className="flex-shrink-0 w-[88px]">
        {/* スペース確保用 */}
      </div>
    </div>
  )
}