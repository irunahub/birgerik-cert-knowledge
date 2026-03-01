import { z } from 'zod'

export const userCreateSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
  role: z.enum(['admin', 'user'], { message: 'ロールを選択してください' }),
})

export const userUpdateSchema = z.object({
  id: z.string().uuid('無効なIDです'),
  email: z.string().email('有効なメールアドレスを入力してください').optional(),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください').optional(),
  role: z.enum(['admin', 'user']).optional(),
})

export type UserCreateInput = z.infer<typeof userCreateSchema>
export type UserUpdateInput = z.infer<typeof userUpdateSchema>
