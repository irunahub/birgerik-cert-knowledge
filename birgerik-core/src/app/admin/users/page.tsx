import { UserList } from './user-list'
import { getUsers } from '@/lib/actions/users'
import { ErrorMessage } from '@/components/shared/error/error-message'

export const metadata = {
  title: 'ユーザー管理 - Birgerik Core',
}

export default async function UsersPage() {
  let users
  let error = null

  try {
    users = await getUsers()
  } catch (e) {
    console.error('Failed to fetch users:', e)
    error = 'データの読み込みに失敗しました'
  }

  return (
    <>
      {error && <ErrorMessage title="エラーが発生しました" message={error} />}
      {!error && users && (
        <UserList
          initialUsers={users as Parameters<typeof UserList>[0]['initialUsers']}
        />
      )}
    </>
  )
}
