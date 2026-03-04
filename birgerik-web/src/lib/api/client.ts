import type {
  GetCertificationsResponse,
  GetQuestionSetResponse,
  GetQuestionsResponse,
  GetExamConfigResponse,
} from '@birgerik/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export async function getCertifications(): Promise<GetCertificationsResponse> {
  return apiFetch('/study/certifications')
}

export async function getQuestionSetDetail(id: string): Promise<GetQuestionSetResponse> {
  return apiFetch(`/study/question-sets/${id}`)
}

export async function getQuestions(questionSetId: string): Promise<GetQuestionsResponse> {
  return apiFetch(`/study/questions/${questionSetId}`)
}

export async function getExamConfig(questionSetId: string): Promise<GetExamConfigResponse> {
  return apiFetch(`/study/exams/${questionSetId}`)
}
