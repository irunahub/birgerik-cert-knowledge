'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { Trophy, RotateCcw, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/shared/ui/button'
import { useStudyStore } from '@/store/study-store'
import { motion } from 'framer-motion'

export default function ResultPage() {
  const router = useRouter()
  const params = useParams()
  const certificationId = params.certificationId as string
  const questionSetId = params.questionSetId as string
  
  const { 
    isSessionActive, 
    getScore, 
    endSession,
    startSession,
    questions,
    mode,
  } = useStudyStore()
  
  // セッションがない場合はリダイレクト
  useEffect(() => {
    if (!isSessionActive) {
      router.push(`/study/${certificationId}/${questionSetId}/mode-select`)
    }
  }, [isSessionActive, router, certificationId, questionSetId])
  
  if (!isSessionActive) {
    return null
  }
  
  const score = getScore()
  const percentage = score.percentage
  
  // パフォーマンス評価
  const getPerformanceMessage = () => {
    if (percentage === 100) return '完璧です！'
    if (percentage >= 80) return '素晴らしい結果です！'
    if (percentage >= 60) return 'よくできました！'
    if (percentage >= 40) return 'もう少し復習しましょう'
    return '基礎からやり直しましょう'
  }
  
  const getPerformanceColor = () => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-blue-600'
    return 'text-yellow-600'
  }
  
  const handleRetry = () => {
    // 同じモードで再挑戦
    router.push(`/study/${certificationId}/${questionSetId}/practice?mode=${mode}`)
  }
  
  const handleFinish = () => {
    endSession()
    router.push('/study')
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* トロフィーアイコン */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center"
          >
            <Trophy className="w-12 h-12 text-yellow-600" />
          </motion.div>
        </div>
        
        {/* タイトル */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          学習完了！
        </h1>
        <p className={`text-2xl font-semibold mb-8 ${getPerformanceColor()}`}>
          {getPerformanceMessage()}
        </p>
        
        {/* スコア表示 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {percentage}%
            </div>
            <p className="text-gray-600">
              {score.correct} / {score.total} 問正解
            </p>
          </div>
          
          {/* プログレスリング風の表示 */}
          <div className="relative w-48 h-48 mx-auto">
            <svg className="transform -rotate-90" viewBox="0 0 200 200">
              {/* 背景の円 */}
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="#e5e7eb"
                strokeWidth="20"
                fill="none"
              />
              {/* スコアの円 */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                stroke={percentage >= 80 ? '#10b981' : percentage >= 60 ? '#3b82f6' : '#f59e0b'}
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 502' }}
                animate={{ strokeDasharray: `${502 * (percentage / 100)} 502` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </div>
        </div>
        
        {/* Phase 3.3実装予定の機能 */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Phase 3.3で追加予定
          </h2>
          <ul className="text-sm text-gray-700 space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>詳細な成績分析（正答率グラフ）</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>間違えた問題の一覧表示</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>復習機能（間違えた問題のみ再挑戦）</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>学習記録の保存</span>
            </li>
          </ul>
        </div>
        
        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetry}
            size="lg"
            className="w-full sm:w-auto"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            もう一度挑戦
          </Button>
          <Button
            variant="outline"
            onClick={handleFinish}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Home className="h-5 w-5 mr-2" />
            学習モードトップへ
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          Phase 3.2完了 - 学習画面実装完了！
        </div>
      </motion.div>
    </div>
  )
}