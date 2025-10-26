import { z } from 'zod'

/**
 * フォーム用のバリデーションスキーマ（変換なし）
 */
export const certificationFormSchema = z.object({
  name: z
    .string()
    .min(1, '資格名は必須です')
    .max(100, '資格名は100文字以内で入力してください')
    .trim(),
  description: z
    .string()
    .max(500, '説明は500文字以内で入力してください')
    .trim(),
})

/**
 * サーバーアクション用のスキーマ（空文字をnullに変換）
 */
export const certificationSchema = z.object({
  name: z
    .string()
    .min(1, '資格名は必須です')
    .max(100, '資格名は100文字以内で入力してください')
    .trim(),
  description: z
    .string()
    .max(500, '説明は500文字以内で入力してください')
    .transform(val => {
      const trimmed = val.trim()
      return trimmed === '' ? null : trimmed
    }),
})

/**
 * フォーム用の型
 */
export type CertificationFormInput = z.infer<typeof certificationFormSchema>

/**
 * サーバーアクション用の型
 */
export type CertificationFormData = z.infer<typeof certificationSchema>

/**
 * 資格更新用のスキーマ（IDを含む）
 */
export const updateCertificationSchema = certificationSchema.extend({
  id: z.string().uuid('無効なIDです'),
})

export type UpdateCertificationData = z.infer<typeof updateCertificationSchema>