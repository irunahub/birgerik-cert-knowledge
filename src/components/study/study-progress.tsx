'use client'

import { motion } from 'framer-motion'

interface StudyProgressProps {
  current: number
  total: number
  percentage: number
}

export function StudyProgress({ current, total, percentage }: StudyProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">
          進捗: {current} / {total}
        </span>
        <span className="font-semibold text-blue-600">{percentage}%</span>
      </div>
      
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
        />
      </div>
    </div>
  )
}