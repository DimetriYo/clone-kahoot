import { useEffect, useState } from "react"
import { axiosInstance } from "./constants"

const LS_USER_ID_KEY = "userId"

const getUserData = async (creds: { name: string; password: string }) => {
  return await axiosInstance
    .post<{
      id: string
      name: string
    }>("/users/auth", creds)
    .catch((e) => {
      if (e.status === 404) {
        return
      }
    })
}

const isUserExist = async (userId: string) => {
  try {
    await axiosInstance.get(`/users/${userId}`)
    return true
  } catch (e: any) {
    if (e.status === 404) return false
  }
}

const createNewUser = async (rawUser: { name: string; password: string }) => {
  const newUser = await axiosInstance.post<{ id: string; name: string }>(
    "/users",
    rawUser
  )

  return newUser
}

const checkIsAdminUser = async (userId: string) =>
  await axiosInstance.get(`/users/auth/${userId}`)

export const useUserAuthorize = () => {
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem(LS_USER_ID_KEY)
  )
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    const authUser = async () => {
      const isExist = Boolean(userId) && (await isUserExist(userId!))
      if (!isExist) {
        localStorage.removeItem(LS_USER_ID_KEY)
        return
      }

      const isAdminData = await checkIsAdminUser(userId!)

      setIsAdmin(isAdminData.data)
    }

    authUser()
  }, [])

  const updateUserCredentials = async (creds: {
    name: string
    password: string
  }) => {
    let userData = await getUserData(creds)

    if (!userData) {
      userData = await createNewUser(creds)
      console.log(userData)
    }

    const isAdminData = await checkIsAdminUser(userData.data.id)

    localStorage.setItem(LS_USER_ID_KEY, userData.data.id)

    setUserId(userData.data.id)
    setIsAdmin(isAdminData.data)
  }

  return { updateUserCredentials, isAdmin, userId }
}
