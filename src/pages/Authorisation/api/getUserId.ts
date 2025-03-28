import { USERS } from '@/db/users'

export const getUserId = ({
  name: userName,
  password: userPassword,
}: {
  name: string
  password: string
}) => {
  const user = USERS.find(
    ({ name, password }) => userName === name && userPassword === password
  )

  if (!user) {
    throw new Error('No user with such a name and password')
  }

  return user.id
}
