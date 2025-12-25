import { NextResponse } from 'next/server'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api/response'
import { getQuestionSetDetail } from '@/lib/database/study'
import { unstable_cache } from 'next/cache'

/**
 * GET /api/v1/study/question-sets/[id]
 * 学習用：問題集の詳細を取得（問題数を含む）
 * 認証不要・CORS オープン
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const getCachedQuestionSetDetail = unstable_cache(
      async (setId: string) => {
        return await getQuestionSetDetail(setId)
      },
      [`study-question-set-${id}`],
      {
        revalidate: 60,
        tags: [`question-set-${id}`, 'question-sets']
      }
    )

    const result = await getCachedQuestionSetDetail(id)

    if (result.error) {
      if (result.error.includes('見つかりません')) {
        return notFoundResponse(result.error)
      }
      return errorResponse(result.error, 500)
    }

    const response = successResponse({ question_set: result.data })

    // CORSヘッダーを追加（すべてのオリジンを許可）
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')

    return response
  } catch (error) {
    console.error('Get question set detail error:', error)
    return errorResponse('問題集の取得に失敗しました', 500)
  }
}

/**
 * OPTIONS /api/v1/study/question-sets/[id]
 * CORS Preflightリクエスト対応
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}
